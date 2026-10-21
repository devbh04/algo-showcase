"use client";

import { useEffect, useRef, useState, useId } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  const uniqueId = useId().replace(/:/g, "_");

  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          themeVariables: {
            primaryColor: "#ffffff",
            primaryBorderColor: "#191c1f",
            primaryTextColor: "#191c1f",
            lineColor: "#191c1f",
            secondaryColor: "#f4f4f4",
            tertiaryColor: "#ffffff",
            fontFamily: "Inter, -apple-system, sans-serif",
            fontSize: "13px",
          },
          securityLevel: "loose",
        });

        const id = `mermaid_${uniqueId}_${Date.now()}`;
        const { svg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvgContent(svg);
          setHasError(false);
        }
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, uniqueId]);

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(2.5, Math.round((z + 0.2) * 10) / 10));
  const handleZoomOut = () => setZoom((z) => Math.max(0.4, Math.round((z - 0.2) * 10) / 10));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  if (hasError) {
    return (
      <div className="p-6 rounded-[16px] bg-[#f4f4f4] border border-[#e2e2e7] font-mono text-xs text-[#505a63] overflow-x-auto">
        <pre>{chart}</pre>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] bg-[#f4f4f4] border border-[#e2e2e7] overflow-hidden flex flex-col">
      {/* Interactive Toolbar */}
      <div className="px-5 py-3 border-b border-[#e2e2e7] bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#505a63]">
          <span className="w-2 h-2 rounded-full bg-[#494fdf]" />
          <span className="font-medium text-[#191c1f]">Interactive Flowchart</span>
          <span className="text-[#8d969e] hidden sm:inline">• Drag to pan / use zoom controls</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-[#f4f4f4] p-1 rounded-full border border-[#e2e2e7]">
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-full bg-white hover:bg-[#e8e8ed] text-[#191c1f] flex items-center justify-center font-bold text-sm shadow-sm transition"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="px-2.5 font-mono text-xs text-[#191c1f] min-w-[50px] text-center font-medium">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-full bg-white hover:bg-[#e8e8ed] text-[#191c1f] flex items-center justify-center font-bold text-sm shadow-sm transition"
            title="Zoom In"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#e8e8ed] text-[#191c1f] text-xs font-medium shadow-sm transition ml-1"
            title="Reset View"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Fixed Height Viewport with Drag & Zoom */}
      <div
        className={`relative h-[480px] w-full overflow-hidden select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {svgContent ? (
          <div
            className="w-full h-full flex items-start justify-center pt-8 transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "top center",
            }}
          >
            <div
              className="max-w-none pointer-events-none [&_svg]:max-w-none [&_svg]:h-auto flex justify-center"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs font-mono text-[#505a63] gap-2">
            <span className="w-2 h-2 rounded-full bg-[#494fdf] animate-pulse" />
            Rendering architecture flowchart…
          </div>
        )}
      </div>
    </div>
  );
}
