export interface TechStackItem {
  category: string;
  name: string;
  purpose: string;
  tag: string;
}

export type SpecType = "target" | "risk" | "indicator" | "market" | "execution";

export interface SpecItem {
  label: string;
  value: string;
  category: string;
  type: SpecType;
  highlight?: boolean;
}

export interface StrategyPoint {
  step: string;
  title: string;
  tag: string;
  tagType: "blue" | "green" | "red" | "amber" | "neutral";
  lead: string;
  highlight: string;
  trailing: string;
}

export interface StrategyItem {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  timeframe: string;
  assetClass: string;
  bannerUrl: string;
  shortDescription: string;
  whatItActuallyIsPoints: StrategyPoint[];
  mermaidChart: string;
  whatIsUsedForIt: TechStackItem[];
  specs: SpecItem[];
  githubUrl: string;
  liveUrl: string;
}

export const STRATEGIES: StrategyItem[] = [
  {
    id: "ema-options-engine",
    title: "Dual 9/15 EMA Intraday Engine with Options Overlay",
    shortTitle: "Dual 9/15 EMA & Options",
    subtitle: "High-frequency EMA pullbacks with real-time Black-Scholes derivative execution & Shoonya WebSocket live paper trading",
    badge: "Live Paper Trade Engine",
    timeframe: "Intraday 5-Min",
    assetClass: "NSE Equities (Top 10) + Index Options (NIFTY / BANKNIFTY CE/PE)",
    bannerUrl: "/strategies/ema-options-banner.svg",
    shortDescription: "Precision intraday trend-pullback engine on 9 & 15 EMA. Evaluates candle body-to-wick ratios and breakout thresholds, simultaneously streaming live tick data for 10 NSE large-caps and executing ATM/OTM options with Black-Scholes Greeks tracking.",
    whatItActuallyIsPoints: [
      {
        step: "01",
        title: "Trend-Pullback Detection",
        tag: "Indicator Touch",
        tagType: "blue",
        lead: "Monitors liquid large-cap stocks in 5-minute intervals, continuously scanning for when price pulls back to physically touch either the ",
        highlight: "fast 9 EMA or slow 15 EMA",
        trailing: " dynamic trendlines during active market hours.",
      },
      {
        step: "02",
        title: "Candle Wick Geometry Confirmation",
        tag: "Rejection Filter",
        tagType: "green",
        lead: "Validates candle structure to confirm institutional absorption, strictly requiring ",
        highlight: "lower-wick rejection for long setups",
        trailing: " (buying under-pressure) and upper-wick rejection for short setups, eliminating indecision dojis.",
      },
      {
        step: "03",
        title: "Breakout & Slippage Control",
        tag: "Trigger Control",
        tagType: "amber",
        lead: "Sets an entry trigger at the signal candle's extreme high/low while enforcing a strict ",
        highlight: "0.50-point breakout gap threshold",
        trailing: "; if the open price gaps beyond this tolerance, entry is suspended until a pullback touches the threshold.",
      },
      {
        step: "04",
        title: "Black-Scholes Options Routing",
        tag: "Derivative Overlay",
        tagType: "blue",
        lead: "Upon equity signal confirmation, the pricing engine runs Black-Scholes Greeks to dynamically purchase ",
        highlight: "ATM/OTM Call or Put contracts",
        trailing: ", tracking Delta, Gamma, Theta, and Vega exposure in real time.",
      },
      {
        step: "05",
        title: "Option Mutex Concurrency Guard",
        tag: "Risk Lock",
        tagType: "red",
        lead: "Implements an asynchronous mutex that strictly guarantees ",
        highlight: "only one active option contract",
        trailing: " is open simultaneously across all monitored equity slots to limit portfolio drawdown.",
      },
      {
        step: "06",
        title: "Dynamic Trailing Stop Milestones",
        tag: "Profit & Exit",
        tagType: "green",
        lead: "Protects gains via automated profit milestones: moves stop loss to ",
        highlight: "lock +0.5R profit at 1.5R, and locks +1.0R at 2.0R",
        trailing: ", squaring off automatically at the 1:2.0 target or 15:20 IST market close.",
      },
    ],
    mermaidChart: `flowchart TD
  A["Market Open (09:16 IST)"] --> B["Shoonya WebSocket Live Tick Stream"]
  B --> C["5-Min Dynamic Candle Aggregator"]
  C --> D{"High/Low Touches 9 or 15 EMA?"}
  D -- "No" --> C
  D -- "Yes" --> E{"Candle Wick Shape Valid?"}
  E -- "Invalid Shape / Doji" --> C
  E -- "Valid Rejection" --> F["Set Breakout Trigger @ Signal Extremum"]
  F --> G{"Breakout Gap <= 0.50 pts?"}
  G -- "Gap Exceeded" --> H{"Retrace to Trigger + 0.50?"}
  H -- "No Retrace" --> I["Signal Skipped & Logged"]
  H -- "Retrace Met" --> J["Execute Trade Entry"]
  G -- "Yes" --> J
  J --> K{"Option Mutex Available?"}
  K -- "Busy (Option Active)" --> L["Execute Equity Position Only"]
  K -- "Free" --> M["Buy ATM CE / PE via Black-Scholes"]
  J --> N["Trailing Stop: Lock +0.5R @ 1.5R, +1.0R @ 2.0R"]
  N --> O["Exit: Target Hit / Trailing Stop / EOD (15:20)"]`,
    whatIsUsedForIt: [
      {
        category: "Execution Runtime",
        name: "Python 3.12 (Asyncio)",
        purpose: "Multi-instrument event loop tracking parallel feeds",
        tag: "Async Core",
      },
      {
        category: "Market Data Stream",
        name: "Shoonya WebSocket API",
        purpose: "Sub-50ms live tick data for 10 stocks + 2 option slots",
        tag: "<50ms Stream",
      },
      {
        category: "Derivatives Valuation",
        name: "Scipy Black-Scholes",
        purpose: "Real-time Delta, Gamma, Theta, and premium calculation",
        tag: "Greeks Engine",
      },
      {
        category: "State Persistence",
        name: "SQLite (WAL Mode)",
        purpose: "Zero-latency active state, trailing stop, and trade logs",
        tag: "WAL DB",
      },
      {
        category: "Dashboard UI",
        name: "Next.js 16 & React 19",
        purpose: "Lightweight institutional dashboard and showcase client",
        tag: "Modern UI",
      },
    ],
    specs: [
      { label: "Target Payoff", value: "1:2.0 Payoff Ratio (+2.0R Target)", category: "Payoff & Risk", type: "target", highlight: true },
      { label: "Capital Protection", value: "Trailing SL (+0.5R @ 1.5R, +1.0R @ 2.0R)", category: "Risk Management", type: "risk", highlight: true },
      { label: "Moving Averages", value: "Fast: 9 EMA | Slow: 15 EMA", category: "Technical Indicators", type: "indicator", highlight: true },
      { label: "Candle Filter", value: "Wick Absorption (Lower >= Upper Wick)", category: "Validation", type: "indicator" },
      { label: "Gap Entry Tolerance", value: "0.50 Points (Requires retrace if exceeded)", category: "Execution", type: "execution" },
      { label: "Option Mutex", value: "1 Active Option Limit across all slots", category: "Risk Sizing", type: "risk" },
      { label: "Market Coverage", value: "Top 10 Liquid NSE Equities + Index Options", category: "Universe", type: "market" },
      { label: "Trading Window", value: "5-Min Intraday (09:16 to 15:20 IST)", category: "Timeframe", type: "execution" },
    ],
    githubUrl: "https://github.com/devbh04/ema-strat-ayush",
    liveUrl: "http://localhost:3000/live",
  },
  {
    id: "fno-mean-reversion",
    title: "NSE F&O Intraday Mean Reversion Engine",
    shortTitle: "Intraday F&O Mean Reversion",
    subtitle: "Counter-trend momentum exhaustion model with 200 SMA macro filtering, 2-day RSI, and asymmetric 2:1 RR",
    badge: "Backtest Engine",
    timeframe: "Daily Close Screen → Market Open",
    assetClass: "NSE F&O Universe (100+ Liquid Stocks)",
    bannerUrl: "/strategies/mean-reversion-banner.svg",
    shortDescription: "Statistical mean-reversion algorithm scanning 100+ liquid NSE F&O equities. Exploits short-term overreaction following aggressive 3%+ single-day moves above the 200 SMA, entering counter-trend at the opening bell with an asymmetric 4% target and 2% stop.",
    whatItActuallyIsPoints: [
      {
        step: "01",
        title: "Macro Secular Bull Filter",
        tag: "Macro Trend",
        tagType: "blue",
        lead: "Screens 100+ liquid NSE F&O equities at daily close, strictly requiring ",
        highlight: "Daily Close > 200 Simple Moving Average (SMA)",
        trailing: " to ensure trades only execute on fundamentally strong assets in secular uptrends.",
      },
      {
        step: "02",
        title: "Short-Term Momentum Overbought Gate",
        tag: "Velocity Gate",
        tagType: "blue",
        lead: "Calculates Wilder's 2-period Relative Strength Index, enforcing ",
        highlight: "RSI(2) > 50",
        trailing: " to confirm intense short-term upward velocity and statistical overextension before mean reversion.",
      },
      {
        step: "03",
        title: "3%+ Single-Day Surge Qualifier",
        tag: "Impulse Screen",
        tagType: "amber",
        lead: "Filters for extreme expansion moves by demanding ",
        highlight: "Close > 1.03 × Close 2 days ago (+3% Single-Day Breakout)",
        trailing: ", screening exclusively for overreaction events prone to profit-taking.",
      },
      {
        step: "04",
        title: "Counter-Trend Directional Polarity",
        tag: "Polarity Bias",
        tagType: "green",
        lead: "Assigns directional bias opposite to the impulse candle: initiates ",
        highlight: "SHORT at Day-0 Open if Day-1 was Green",
        trailing: " (fading the prior day's rally), or LONG if Day-1 was Red.",
      },
      {
        step: "05",
        title: "Asymmetric 2:1 Payoff Profile",
        tag: "Asymmetric Edge",
        tagType: "green",
        lead: "Executes at market open (09:15 IST) with an asymmetric ",
        highlight: "+4.0% profit target and a -2.0% stop loss",
        trailing: ", guaranteeing a mathematical 2:1 risk-reward expectancy.",
      },
      {
        step: "06",
        title: "Conservative Intra-Day Resolution",
        tag: "Risk Rule",
        tagType: "red",
        lead: "In the backtest resolution, if both target and stop loss price levels are breached on the same day, ",
        highlight: "Stop Loss is conservatively assumed hit first",
        trailing: "; all remaining open positions automatically close at 15:20 IST.",
      },
    ],
    mermaidChart: `flowchart TD
  A["Daily Market Close Scanner"] --> B["Ingest 100+ Liquid NSE F&O Tickers"]
  B --> C{"Filter 1: Close > 200 SMA?"}
  C -- "No (Downtrend)" --> X["Discard Symbol"]
  C -- "Yes (Bullish Macro)" --> D{"Filter 2: RSI(2) > 50?"}
  D -- "No (Low Velocity)" --> X
  D -- "Yes (Overbought)" --> E{"Filter 3: Surge > 3% from Close[-2]?"}
  E -- "No" --> X
  E -- "Yes" --> F{"Filter 4: Price Rs 50 to 5,000?"}
  F -- "No" --> X
  F -- "Yes (Qualified)" --> G["Assign Counter-Trend Bias"]
  G --> H{"Day-1 Candle Close vs Open"}
  H -- "Bullish (Close > Open)" --> I["Enter SHORT on Day-0 Open (09:15)"]
  H -- "Bearish (Close < Open)" --> J["Enter LONG on Day-0 Open (09:15)"]
  I --> K["Fixed Sizing: Rs 5,000 per Stock"]
  J --> K
  K --> L["Asymmetric 2:1 Payoff: +4.0% Target / -2.0% Stop Loss"]
  L --> M{"Intraday Price Action"}
  M -- "Both Target & SL Hit" --> N["Conservative Assumption: Stop Loss First"]
  M -- "Target Hit" --> O["Exit @ Full +4.0% Target"]
  M -- "Neither Hit" --> P["Automated Square-Off @ Market Close (15:20)"]`,
    whatIsUsedForIt: [
      {
        category: "Backtest Engine",
        name: "Python 3.12 (Vectorized Walk-Forward)",
        purpose: "High-throughput historical simulation iterating across all NSE dates",
        tag: "Vector Walk-Forward",
      },
      {
        category: "Data Processing",
        name: "Pandas & NumPy",
        purpose: "Rolling 200 SMA, Wilder's 2-period RSI, and multi-symbol candle matrices",
        tag: "Matrix Math",
      },
      {
        category: "Market Data Source",
        name: "yfinance API & OpenChart",
        purpose: "Split-adjusted daily OHLCV series for 100+ NSE F&O symbols",
        tag: "OHLCV Series",
      },
      {
        category: "Audit & Telemetry",
        name: "Python Logging & CSV Exporter",
        purpose: "trade_log.csv, daily_summary.csv, and metrics.json filter audits",
        tag: "Audit Logs",
      },
      {
        category: "Dashboard UI",
        name: "Next.js 16 & React 19",
        purpose: "Lightweight institutional dashboard and showcase client",
        tag: "Modern UI",
      },
    ],
    specs: [
      { label: "Target Payoff", value: "+4.0% Profit Target (2:1 Asymmetric Edge)", category: "Payoff & Risk", type: "target", highlight: true },
      { label: "Capital Protection", value: "-2.0% Strict Stop Loss", category: "Risk Management", type: "risk", highlight: true },
      { label: "Macro Trend Filter", value: "Daily Close > 200 Simple Moving Average (SMA)", category: "Technical Indicators", type: "indicator", highlight: true },
      { label: "Momentum Gate", value: "2-Period RSI > 50 (Wilder's RSI)", category: "Momentum", type: "indicator" },
      { label: "Impulse Threshold", value: "Close > 1.03 × Close[-2] (+3% Single-Day Breakout)", category: "Screening Rule", type: "indicator", highlight: true },
      { label: "Direction Bias", value: "Day-1 Green → SHORT / Day-1 Red → LONG", category: "Trade Assignment", type: "execution" },
      { label: "Market Universe", value: "100+ Liquid NSE F&O Segment Equities", category: "Universe", type: "market" },
      { label: "Resolution & Exit", value: "Conservative (SL First on Dual Touch) & 15:20 EOD", category: "Risk Protocol", type: "risk" },
    ],
    githubUrl: "https://github.com/devbh04/ema-strat-ayush",
    liveUrl: "http://localhost:3000/backtest",
  },
];
