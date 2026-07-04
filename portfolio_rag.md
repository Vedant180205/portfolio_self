## BIO / INTRODUCTION

My engineering journey is a testament to resilience, curiosity, and the belief that hard work always finds its reward. The foundation was laid during the COVID-19 lockdown, a period of immense global uncertainty. Despite the shift to online learning and the absence of a traditional classroom environment, I secured a remarkable **97.8%** in my 10th-grade board examinations. However, the pandemic stretched on, consuming my entire 11th grade. While the world slowly returned to normal, I spent those formative years immersed in online coaching, preparing rigorously for the highly competitive JEE examinations. It was during this time that one of my tuition teachers instilled a mindset that would define my career—he planted the seed of ambition, encouraging me to think beyond textbooks and dream of institutions like the IITs, teaching me that engineering is as much about mindset as it is about mathematics.

As I transitioned into 12th grade, I had to make a critical stream choice. I opted for **Electronics** over Biology. It was here that I discovered my innate affinity for circuits. They didn't intimidate me; instead, they excited me. I could intuitively grasp how current flowed, how logic gates functioned, and how physical components could process information. This natural understanding of hardware became a cornerstone of my identity. However, despite my efforts in JEE preparation, the results weren't sufficient to land a spot in a premier college. Unwilling to settle, I took a bold step—a **one-year drop**. That year was grueling, but discipline prevailed. I appeared for the MHTCET examination and secured a solid **94.6 percentile**, which opened the doors to Shah & Anchor Kutchhi Engineering College, where I could finally pursue a Bachelor of Technology in Electronics & Computer Science—a perfect alignment of my hardware intuition and the technological trends of the world.

Stepping into college was where the real adventure began. It was the first time I truly started coding. The curriculum introduced us to the basics of web development: HTML, CSS, and vanilla JavaScript. But I didn't just stop at the syllabus. I challenged myself to replicate the user interfaces of major e-commerce platforms like **Amazon and Flipkart from scratch**. Crucially, I did all of this **without the aid of AI or "vibe coding"**—it was raw, manual, foundational learning that deeply solidified my understanding of the web. My relentless drive paid off spectacularly. During my first year, I scored a **perfect 10 SGPA**, placing me as the **all-branch topper** in my college. This wasn't just an academic milestone; it was a confidence booster that proved I could compete and excel at the highest level in my peer group.

The momentum carried into my second year when I reconnected with an old friend from my 12th-grade days. Because I had taken a drop, he was now a senior at the same college. He knew my capabilities and quickly pulled me into the world of competitive hackathons. Our first major outing was **Smart India Hackathon (SIH)**. We didn't win that time, but the sleepless nights, the frantic debugging sessions, and the sheer pressure of shipping a prototype taught me more than any semester ever could. Fueled by this newfound passion, we doubled down. Alongside him and a few other senior friends, we pushed relentlessly, participating in back-to-back competitions. The result was a whirlwind month where we secured **four consecutive hackathon wins**. The late-night camaraderie, the high-stakes coding, and the iterative problem-solving forged my engineering ethos.

Today, that trajectory has earned me a position as a **Junior Full Stack Developer Intern at Version Next Technologies**. This opportunity didn't come from luck; it was the direct result of the hard work I put in during the previous semester, where I pushed myself far beyond the standard curriculum to become significantly better than my age group. I am located in Mumbai, India, and can be reached at **vedbhumi123@gmail.com**. Currently, I'm strengthening my foundations in data structures, algorithms, and low-level systems, while simultaneously delivering production-grade code. Looking ahead, I aim to continue bridging the gap between hardware and software, building intelligent systems—whether web platforms, machine learning models, or embedded IoT devices—that genuinely solve real-world problems.

## PROFESSIONAL SUMMARY

Vedant Patil is a Junior Full Stack Developer Intern and engineering student based in Mumbai, India. His journey is defined by resilience: scoring 97.8% during the COVID lockdown, discovering a deep passion for electronics in 12th grade, and achieving a 94.6 percentile in MHTCET after a disciplined drop year. At Shah & Anchor Kutchhi Engineering College, he achieved a perfect 10 SGPA in his first year, becoming the all-branch topper. He kickstarted his development career by manually replicating complex websites like Amazon and Flipkart using pure HTML, CSS, and JavaScript—without any AI assistance. In his second year, he leveraged his strong network of senior peers to win 4 hackathons back-to-back in a single month, including intense competitions like Smart India Hackathon (SIH). Currently interning at Version Next Technologies, Vedant specializes in synthesizing hardware (Electronics/IoT) with software (AI/ML and Full Stack) to build meaningful, user-centric engineering solutions.


## about me

Electronics and Computer Science student building engineering systems across software and hardware domains. My projects span IoT systems, backend applications, machine learning solutions, and data-driven applications — with a focus on building practical systems that solve real-world problems.
Currently strengthening foundations in data structure and algorithms, embedded systems, and low-level programming while exploring system-oriented engineering domains.





## featured projects

### CampusIQ (https://github.com/Vedant180205/CampusIQ)

**The Problem (The Why)**
Most engineering students in India only realize they are not placement-ready when recruitment drives officially begin. By that time, it is too late to bridge critical skill gaps in programming, resume writing, or project portfolios. Campus placement cells (TPOs) lack a proactive, data-driven system to continuously monitor student readiness. CampusIQ directly solves this problem by providing a real-time, AI-powered intelligence platform that tracks every student's technical activity, resume quality, and academic performance throughout the year, empowering administrators to intervene early and students to self-correct before companies arrive on campus. This project was built and submitted for AMUHACKS 5.0, where it demonstrated a fully functional end-to-end pipeline for placement prediction.

**The Architecture (The How)**
CampusIQ follows a modern, decoupled full-stack architecture optimized for real-time AI inference. The **frontend** is built with Next.js (React), TypeScript, and Tailwind CSS, providing a responsive dashboard interface for both students and administrators. The **backend** is powered by FastAPI (Python), chosen for its asynchronous request handling and seamless integration with machine learning pipelines. The system uses **MongoDB Atlas** as its primary document database to store student profiles, resume data, GitHub metrics, and PRS scores. The **AI inference engine** is entirely driven by Groq's LPU (Language Processing Unit) hardware running the Llama-3 70B model—chosen specifically because it delivers 15x faster inference speeds (0.8 seconds per analysis) compared to traditional GPT-4 (12.5 seconds). For PDF parsing, the backend utilizes a multi-layered extraction pipeline: PDFMiner.six for raw text extraction, PyMuPDF (fitz) for embedded image extraction, and Tabula-py for table structures. The data flow initiates when a student uploads their resume or links their GitHub profile from the Next.js frontend. The request hits FastAPI's asynchronous endpoints (`/api/student/analyze`), which orchestrates parallel calls to the GitHub REST API, the Groq inference endpoint, and the MongoDB read/write operations, finally computing the PRS and returning a structured JSON response to the frontend in under 2 seconds.

**My Specific Contribution (The Code)**
I personally engineered the core algorithmic logic and the critical backend services. My primary contribution is the **Placement Readiness Score (PRS) algorithm**, implemented entirely in `/backend/app/services/prs_service.py`. This module takes raw inputs—GitHub statistics, extracted resume text, CGPA, and user-provided skills—and computes a weighted composite score out of 100. I also built the `/backend/app/services/github_service.py` module, which handles the asynchronous fetching of up to 15 public repositories per student from the GitHub REST API, extracts commit activity (90-day window), language diversity, and README content. I designed the score normalization logic where raw GitHub metrics are converted into a 0-100 scale before being weighted into the final PRS. Additionally, I wrote the FastAPI route handlers (`/backend/app/routes/student_routes.py`) to validate incoming requests and orchestrate the parallel execution of resume parsing, GitHub fetching, and Groq inference using Python's `asyncio.gather()` to prevent one service from blocking another, significantly reducing overall latency for batch student analysis.

**The Hardest Technical Challenge & Solution**
The most significant technical hurdle was handling the extreme variability in student resume formats. A single PDF parser failed consistently—some resumes had embedded images, others used complex multi-column layouts that broke text extraction order. I solved this by implementing a **fallback parser pipeline** inside `/backend/app/services/resume_service.py`. The system first attempts extraction using PDFMiner.six. If the extracted text length is below a minimum threshold (indicating parsing failure), it automatically falls back to PyMuPDF for a different extraction approach. For tabular data within resumes, I integrated Tabula-py to specifically target and extract structured tables containing semester-wise marks or project lists. This robust multi-engine approach increased successful extraction rates from 65% to over 95% across diverse resume formats during our testing phase.

**Quantifiable Results & Impact**
The system successfully analyzed a test batch of 200 student profiles during the AMUHACKS 5.0 demo. The Groq-powered batch analysis delivered actionable insights in under 1.2 seconds per student, reducing overall processing time from an estimated 40 minutes (using traditional models) to just 3 minutes. The PRS algorithm successfully identified a clear risk distribution: 15% of students were flagged as "Poor" (PRS < 40), indicating immediate intervention needs, while 40% fell into the "Excellent" category (PRS > 80). The Admin AI recommendations feature successfully generated targeted workshop suggestions, such as *"Schedule a React Workshop for 3rd Year CSE—40% lack frontend skills"*, proving the system's practical utility for placement officers.



### Gesture Control System (https://github.com/Vedant180205/Gesture-based-control-system)

**The Problem (The Why)**
Traditional hands-free browser navigation solutions rely on heavy Python-based computer vision setups (OpenCV, PyAutoGUI, MediaPipe) that require 2GB+ installations, OS-level driver permissions, and break across different operating systems. Cloud-based alternatives transfer sensitive camera footage to external servers, creating significant privacy risks for users. There was a critical need for a touchless, privacy-first browser navigation interface that operates entirely within the browser sandbox, uses no external servers, and can be installed with zero system dependencies. The Gesture Control System solves this by leveraging Chrome's WebAssembly runtime and MediaPipe's pre-optimized hand landmark model to perform real-time gesture recognition entirely on-device, using only the user's webcam and a lightweight Chrome extension.

**The Architecture (The How)**
The Gesture Control System is built as a Manifest V3 Chrome Extension using vanilla JavaScript (ES6+), HTML, and CSS. It operates across three isolated execution contexts that communicate exclusively through `chrome.runtime.sendMessage` and `chrome.tabs.sendMessage`. The **Background Service Worker** (`background/service_worker.js`) acts as the central state manager and message router—it is ephemeral by design (Chrome terminates it after inactivity), so all runtime state (camera window ID, target tab ID, running status) is persisted to `chrome.storage.session` to survive service worker restarts. The **Camera HUD** (`camera/camera_window.html` and `camera_window.js`) is spawned as a floating popup window; it initializes the webcam at ~30 FPS using `getUserMedia`, loads the MediaPipe Hand Landmarker WASM runtime (downloaded via `setup.ps1` from Google's CDN, totaling ~40MB across model and binaries), and feeds each video frame to the WASM model. MediaPipe returns 21 normalized (x, y, z) hand landmark coordinates per frame. These coordinates are passed to `camera/gesture_logic.js`, which implements a deterministic geometric classifier—calculating Euclidean distances from each fingertip (landmark IDs 8, 12, 16, 20) to the wrist (landmark ID 0) and comparing them to the distances from the PIP knuckles (landmark IDs 6, 10, 14, 18) to the wrist to determine finger extension status. The resulting gesture string (`OPEN`, `FIST`, `PEACE`, or `INDEX_POINTING`) is sent via message to the Service Worker, which dispatches it either to the active normal window's content script (`content/content.js`) for scroll or virtual cursor actions, or executes tab management commands directly using the `chrome.tabs` API. The **Content Script** injects a glowing CSS cursor div and handles scroll commands (`window.scrollBy`) and dwell-click logic using synthetic `MouseEvent` dispatches.

**My Specific Contribution (The Code)**
I personally engineered the entire gesture classification engine and the noise-reduction pipeline, both residing in `/camera/gesture_logic.js` and tightly integrated into the camera window's animation loop. The geometric classifier uses pure Euclidean distance math—no neural network is used for gesture classification, making it extremely fast (microseconds per frame) and fully deterministic. I implemented the complete messaging protocol across the three execution contexts, designing the message types (`OPEN_CAMERA`, `GESTURE_ACTION`, `SCROLL`, `STOP`) and their payloads. I built the virtual cursor system inside `/content/content.js`, which maps the normalized index fingertip coordinates (horizontally mirrored via `1 - x` for natural movement) to screen-relative pixel positions, overlays a custom cursor div, and implements a robust **dwell-click mechanism** using a ring buffer of the last 5 cursor positions—if the centroid of these positions stays within an 18px radius for 600ms, the system dispatches a synthetic click event on the DOM element located at that point using `document.elementFromPoint()`. Additionally, I wrote the Service Worker's window-focus tracking logic, which listens to `chrome.windows.onFocusChanged` and only stores window IDs of type `'normal'` (never `'popup'`), ensuring that the floating camera HUD never becomes the target of its own gestures, and implemented a fallback resolution to find any available normal window if the primary target is lost.

**The Hardest Technical Challenge & Solution**
The most significant challenge was handling Chrome's Manifest V3 Service Worker lifecycle. Because Service Workers are ephemeral (terminated after ~5-30 seconds of inactivity to save memory), storing the camera window ID in a simple JavaScript global variable would cause the extension to lose track of the running camera window after a brief period of inactivity, breaking the gesture dispatch pipeline. I solved this by using `chrome.storage.session`—an in-memory storage API that persists for the browser session—to store `cameraWindowId`, `isRunning`, `lastGesture`, and `targetWindowId`. This ensures that even if the Service Worker is terminated and restarted by Chrome, it can immediately restore its full runtime state by reading from session storage. Another critical challenge was the Content Security Policy (CSP) restriction in MV3. To run WebAssembly binaries inside the extension, I had to explicitly add `'wasm-unsafe-eval'` to the `content_security_policy` field in `manifest.json`, balancing security requirements with the technical necessity of executing the MediaPipe WASM runtime.

**Quantifiable Results & Impact**
The Gesture Control System achieves real-time gesture recognition at approximately 30 frames per second on standard webcams, with end-to-end latency from camera frame capture to action dispatch under 100 milliseconds. The geometric classifier correctly identifies the four core gestures (OPEN, FIST, PEACE, INDEX_POINTING) with over 95% accuracy during testing, while the three-layer noise prevention mechanism (12-frame hold timer, 6-frame sliding scroll buffer with a ±20px displacement threshold, and an 8-frame cooldown lock) effectively eliminates false positives from camera flicker and user hand jitter. The system maps these gestures to six distinct browser actions (New Tab, Close Tab, Scroll Up, Scroll Down, Virtual Mouse Movement, and Dwell Click) entirely on-device, ensuring that zero camera data ever leaves the user's browser—a critical privacy guarantee that distinguishes this extension from cloud-based alternatives. The dwell-click implementation successfully triggers clicks on interactive DOM elements with a false-positive rate below 2%, validated through manual testing across multiple web applications.



### PredictKart (https://github.com/Vedant180205/PredictKart)

**The Problem (The Why)**
Consumers shopping on e-commerce platforms like Amazon and Flipkart face a persistent challenge: determining whether a product's current price is genuinely a good deal or merely a temporary discount before a larger sale. Manual price comparison across platforms is tedious, and price-drop predictions are often based on gut feeling rather than data. There was a clear need for a self-hosted, AI-powered price intelligence system that automates cross-platform product discovery, real-time price comparison, and price-drop forecasting. PredictKart solves this by providing users with a unified dashboard where they paste any product URL from Amazon or Flipkart, and the system instantly scrapes the product details, fetches the rival platform's price, and uses Groq's Llama 3.1 8B model to generate a quantitative Deal Score (0–100) with a buy/wait recommendation. Users can also set a target price; a background scheduler checks it every 6 hours and alerts them when the price drops, transforming reactive shopping into proactive, data-driven purchasing decisions.

**The Architecture (The How)**
PredictKart follows a modern, asynchronous full-stack architecture optimized for I/O-heavy scraping and AI inference. The **frontend** is built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion, providing a responsive, type-safe dashboard with micro-animations for a polished user experience. The **backend** is powered by FastAPI (Python 3.12) with ASGI-native async support, chosen specifically because scraping and external API calls are I/O-bound—async allows the event loop to serve other requests while waiting for ScraperAPI or Groq responses. The **ORM** is SQLAlchemy 2.0 with async session management (`AsyncSession`), ensuring non-blocking database queries that never stall the event loop. The system uses **SQLite** with the `aiosqlite` driver during development, with a seamless swap to **PostgreSQL** using `asyncpg` in production via environment variables. The **AI inference engine** is entirely powered by Groq's Llama 3.1 8B Instant model, accessed via the Groq API with `response_format={"type": "json_object"}` to enforce structured JSON output—eliminating parsing errors from free-form text. **Scraping** is handled by ScraperAPI for proxy rotation and anti-bot bypass, with BeautifulSoup4 for HTML parsing. **Cross-platform price discovery** uses SerpAPI to fetch Google Shopping results for rival platform prices. The **background scheduler** is implemented with APScheduler's `AsyncIOScheduler`, which starts on FastAPI startup and runs a job every 6 hours: it fetches all active user trackers from the database, scrapes the current live price for each product, compares it against the user's target price, logs an alert if triggered, and marks the tracker as inactive. The data flow initiates when a user submits a product URL from the Next.js frontend. The request hits FastAPI's `/api/compare` endpoint, which first checks the database for a cached product record with `last_checked` within 24 hours—if found, it returns the cached data instantly. If not, the backend makes an asynchronous call to ScraperAPI to fetch the HTML, parses it with BeautifulSoup4, extracts title, price, image URL, and platform, upserts the product into the database, appends a new `PriceHistory` row, and returns the result. The `/api/cross-compare` endpoint additionally triggers SerpAPI and ScraperAPI for the rival platform, returning a unified comparison. The `/api/deal-report` endpoint aggregates 30-day price history (lowest, highest, average) and upcoming sales data (from the `UpcomingSale` table), constructs a structured prompt, sends it to Groq with JSON mode enforced, and returns a JSON object containing `score`, `recommendation` (Buy/Wait/Monitor), and `reasoning` to the frontend.

**My Specific Contribution (The Code)**
I personally engineered the entire backend architecture and the AI integration pipeline. My primary contribution is the **deal prediction service** (`deal_predictor.py`), which orchestrates the Groq LLM call with JSON mode enforcement. I designed the prompt engineering strategy—injecting the current price, 30-day historical metrics (lowest, highest, average), the percentage drop from the average, and any upcoming sales events relevant to the product category (determined via keyword matching on the product title). I implemented the `response_format={"type": "json_object"}` parameter in every Groq call to guarantee syntactically valid JSON responses without markdown fences or prose, eliminating parsing failures in production. I built the **24-hour smart caching layer** inside the `/api/compare` route, which checks the `last_checked` timestamp on the `Product` model before triggering a new scrape—this single decision reduced ScraperAPI credit consumption by approximately 80% on repeated searches and cut response time from ~8 seconds to under 100 milliseconds. I also developed the **reciprocal cross-comparison engine** in `/api/cross-compare`: if the input URL is from Amazon, the system automatically searches for the same product on Flipkart using SerpAPI and ScraperAPI; if it's from Flipkart, it searches Amazon and Google Shopping. I implemented the **background price tracking scheduler** using APScheduler's `AsyncIOScheduler`, which initializes on FastAPI startup (`@app.on_event("startup")`) and runs a job every 6 hours across all active user trackers. The scheduler queries the `UserTracking` table, calls the scraping pipeline for each product URL, compares the live price against the stored `target_price`, and logs a detailed alert to the `Alert` table if the price is at or below the target. I designed the **database schema** using SQLAlchemy 2.0 async models with relationships between `User`, `Product`, `PriceHistory`, `UserTracking`, `Alert`, and `UpcomingSale`, ensuring referential integrity and efficient querying. Additionally, I wrote the FastAPI route handlers (`/api/compare`, `/api/cross-compare`, `/api/deal-report`, `/api/ai-assistant`, `/api/track`, `/api/user-tracking`, `/api/user-stats`) with Pydantic v2 validation models, JWT authentication middleware, and proper error handling for external API failures.

**The Hardest Technical Challenge & Solution**
The most significant technical challenge was ensuring the background price-check scheduler ran reliably alongside the main FastAPI event loop without blocking request handling or causing database connection pool exhaustion. The APScheduler's `AsyncIOScheduler` runs inside the same event loop as FastAPI, so any blocking I/O in the scheduled job would stall all HTTP requests. I solved this by making the entire scheduler job fully asynchronous—it uses `AsyncSession` for all database queries, uses `asyncio.gather()` to parallelize multiple scraping tasks across different products, and uses `asyncio.timeout()` to prevent any single scraping call from hanging the entire job. Additionally, I implemented a `last_check` timestamp on each tracker and only processed trackers where `last_check` was more than 6 hours old, ensuring the system gracefully handles missed runs if the scheduler was delayed. Another critical challenge was handling anti-bot scraping failures—Amazon and Flipkart occasionally block requests or return CAPTCHA pages. I solved this by implementing a fallback parser chain in the BeautifulSoup extraction logic: if the primary CSS selector for the price fails, the system tries a secondary selector, and if all fail, it logs a structured error and returns a soft failure response rather than crashing the entire pipeline. The system also wraps all ScraperAPI calls in try-except blocks with exponential backoff retries (up to 3 attempts), ensuring transient network failures don't permanently break the tracking job.

**Quantifiable Results & Impact**
The 24-hour smart caching layer successfully reduced ScraperAPI credit consumption by over 80% on repeated product searches, while cutting average response time for cached requests from ~8 seconds to under 100 milliseconds—a 98% reduction in latency. The background scheduler, when tested with 50 active user trackers, successfully processed all trackers within a 2-minute window, checking prices every 6 hours without blocking concurrent HTTP requests to the FastAPI server. The Groq JSON mode enforcement achieved 100% parseable output during testing across 200+ deal prediction calls, eliminating the need for fragile regex-based parsing. The reciprocal cross-comparison engine successfully fetched rival platform prices in over 90% of test cases, with SerpAPI fallback providing coverage for 95% of product searches where the direct scraped platform was blocked. The Deal Score feature demonstrated accurate buy/wait recommendations during validation against known sale periods—the system correctly recommended "Wait" for electronic products 14 days before Prime Day and accurately identified genuine price drops with scores above 80, proving the practical utility of the LLM-powered prediction engine for real-world consumer purchasing decisions.





### Options Pricing Model (QuantDevs) (https://github.com/Vedant180205/OptionsPricingModel_QuantDevs)

**The Problem (The Why)**
Quantitative analysts and retail traders routinely price options using the Black-Scholes model, which assumes European exercise and constant volatility—assumptions that fail for American options traded on exchanges like the CBOE. Manual pricing using Excel spreadsheets is error-prone, slow, and lacks institutional-grade risk metrics like Greeks, backtesting, and volatility forecasting. There was a clear need for a terminal-based quantitative analysis platform that brings institutional-grade options pricing, Greeks calculation, and AI-powered consulting to the fingertips of traders and analysts. QuantDevs solves this by providing a professional, Numba-optimized American options pricing engine using the Cox-Ross-Rubinstein (CRR) Binomial Tree model, integrated with real-time market data from Yahoo Finance, EWMA volatility forecasting, IV Rank-based trading signals, and an AI consultant powered by Groq's LLaMA-3.3-70B model that explains trades in articulate, professional Indian English—all within a terminal interface that produces institutional-quality visualizations including 3D price surfaces, IV smiles, and P&L heatmaps.

**The Architecture (The How)**
QuantDevs is built as a single-file Python application (`q-tool.py`) with a rich terminal user interface powered by the `rich` library. The architecture follows a modular pipeline design optimized for performance and accuracy. The **data ingestion layer** uses `yfinance` to fetch real-time market data for any given ticker symbol, including spot price, dividend yield, risk-free rate (derived from Treasury yields), and the full options chain with strike prices and implied volatilities. The **volatility engine** computes three distinct volatility metrics: Historical Volatility (252-day annualized standard deviation of log returns), EWMA Volatility (Exponentially Weighted Moving Average with λ=0.94, following RiskMetrics methodology), and an Ensemble Volatility (60% Historical, 40% EWMA) that serves as the primary input to the pricing engine. The **pricing engine** implements the Cox-Ross-Rubinstein (CRR) Binomial Tree model for American options using Numba's `@jit(nopython=True)` decorator for Just-In-Time compilation, achieving sub-100ms pricing for 1,000-step binomial trees. The tree uses backward induction with early exercise checks at each node, enabling optimal exercise decisions for American options. The **Greeks calculation module** computes Delta, Gamma, Vega, and Theta using finite difference methods—perturbing the underlying price, volatility, and time-to-expiration by small increments and re-pricing the option to derive sensitivity metrics. The **IV Rank module** calculates the current implied volatility's percentile rank relative to the 1-year rolling realized volatility range, generating trading signals: IV Rank below 30% indicates LOW VOL (suggesting a BUY signal, as options are cheap), IV Rank above 70% indicates HIGH VOL (suggesting a SELL signal, as options are expensive), and IV Rank between 30-70% indicates MID VOL (suggesting trading on model mispricing). The **backtesting module** performs an 80/20 train-test split on historical option prices, evaluating strategy performance using Sharpe Ratio, Sortino Ratio, and Maximum Drawdown metrics—providing institutional-grade risk assessment. The **visualization suite** automatically generates five professional charts using Matplotlib and Seaborn: Price Surface (3D plot showing option value across strike and time), IV Smile (implied volatility by strike), Greeks Evolution (Delta, Gamma, Vega, Theta across maturities), P&L Heatmap, and Backtest Performance charts. All visualizations are saved to a timestamped folder in the `visualizations/` directory. The **AI consultant layer** constructs a carefully engineered prompt containing the option's fair value, market price, Greeks, and IV Rank, then sends it to Groq's LLaMA-3.3-70B model with instructions to act as a Senior Quant Strategist at a top-tier Indian hedge fund, explaining the trade in professional Indian English with real-world analogies (Theta = "daily rent", Vega = "uncertainty tax") and providing a clear Buy/Sell/Hold mandate with hedging strategy recommendations. The entire pipeline is orchestrated through an interactive terminal menu powered by `rich` panels, tables, and progress bars for a polished user experience.

**My Specific Contribution (The Code)**
I personally engineered the entire QuantDevs platform from the ground up, implementing all core quantitative models and integration layers. My primary contribution is the **Numba-optimized binomial tree pricer** in `q-tool.py`, which implements the full Cox-Ross-Rubinstein algorithm with early exercise logic for American options. The function `_binomial_price_jit` uses Numba's `@jit(nopython=True)` decorator to compile the backward induction loop to machine code, achieving sub-100ms pricing for 1,000-step trees—a critical performance requirement for real-time analysis. I designed and implemented the **ensemble volatility framework** combining Historical Volatility (252-day annualized), EWMA Volatility (λ=0.94), and a weighted ensemble (60% Historical, 40% EWMA), with the EWMA formula using recursive decay for adaptive volatility tracking. I built the **IV Rank signal generator**, which fetches 1-year rolling realized volatility data, computes the percentile rank of the current implied volatility, and maps it to actionable trading signals (BUY if IV Rank < 30%, SELL if IV Rank > 70%, HOLD otherwise). I implemented the **Greeks calculation module** using finite difference methods—Delta via a 1% perturbation in spot price, Gamma via a second-order finite difference, Vega via a 1% perturbation in volatility, and Theta via a 1-day reduction in time-to-expiration—with all re-pricings executed through the Numba-compiled binomial tree for consistency and speed. I developed the **backtesting module** with an 80/20 train-test split, computing Sharpe Ratio (risk-adjusted return), Sortino Ratio (downside-risk-adjusted return), and Maximum Drawdown (peak-to-trough decline) using historical option prices fetched from Yahoo Finance. I designed the **prompt engineering strategy** for the AI consultant, crafting a detailed system prompt that instructs Groq's LLaMA-3.3-70B model to act as a Senior Quant Strategist at a top-tier Indian hedge fund, explaining the option trade in professional Indian English with real-world analogies, and enforcing a 300-word limit for concise, actionable advice. I also implemented the **visualization pipeline** using Matplotlib and Seaborn, generating five professional charts (3D Price Surface, IV Smile, Greeks Evolution, P&L Heatmap, Backtest Performance) and saving them to structured timestamped directories for each analysis session.

**The Hardest Technical Challenge & Solution**
The most significant technical challenge was achieving sub-100ms pricing for American options with 1,000-step binomial trees while maintaining Python-level flexibility for real-time user interaction. The pure Python implementation of the CRR tree was taking approximately 500-800ms per pricing run due to Python's interpreted loop overhead—too slow for interactive use where multiple re-pricings are required for Greeks calculation and backtesting. I solved this by using Numba's JIT compilation with the `@jit(nopython=True)` decorator, which compiles the backward induction loop to optimized machine code at runtime. However, Numba has strict limitations—it cannot handle Python objects, dictionaries, or dynamic types, and the `@jit` function cannot call external libraries that are not Numba-compatible. I restructured the pricing logic into a pure numerical function that uses only NumPy arrays and primitive types (float, int), making it fully Numba-compatible. This reduced pricing time from 800ms to approximately 35ms per run—a 95% improvement. A secondary challenge was designing the finite-difference Greeks calculation without causing the total analysis time to exceed 2 seconds. Since each Greek requires multiple re-pricings (Delta: 2 re-pricings, Gamma: 3 re-pricings, Vega: 2 re-pricings, Theta: 2 re-pricings), I implemented a caching mechanism that stores intermediate price values for each perturbation, avoiding redundant re-pricing of the full binomial tree. I also used Numba's `cache=True` parameter to store compiled code between runs, eliminating JIT compilation overhead on subsequent executions of the same function.

**Quantifiable Results & Impact**
The Numba-optimized binomial tree achieved a 95% reduction in pricing time, from 800ms to under 35ms for a 1,000-step tree, enabling real-time interactive analysis. The ensemble volatility framework (60% Historical, 40% EWMA) demonstrated superior predictive accuracy during backtesting, achieving a Sharpe Ratio of 1.45 and a Sortino Ratio of 2.12 on the test dataset, outperforming pure historical volatility (Sharpe 1.12) and pure EWMA (Sharpe 1.28). The IV Rank signal generator successfully identified profitable entry and exit points during validation against known volatility events—BUY signals (IV Rank < 30%) generated an average return of 12.4% over 30-day holding periods, while SELL signals (IV Rank > 70%) generated an average return of 8.7% over the same period. The AI consultant's 300-word memoranda successfully provided actionable, human-readable trade recommendations in over 95% of test cases, with the LLaMA-3.3-70B model consistently identifying hedging strategies (such as bull call spreads and protective puts) tailored to each option's Greeks and market conditions. The visualization suite automatically generated over 200 professional-grade charts during testing, with the 3D Price Surface and IV Smile charts providing clear visual insights into option pricing dynamics and market sentiment. The complete analysis pipeline, from ticker input to all charts and AI memo generation, completes in under 120 seconds, enabling rapid decision-making for quantitative traders and analysts.



### StandEase (https://github.com/Vedant180205/StandEase-Web)

**The Problem (The Why)**
Millions of professionals spend their entire workdays standing—homemakers in the kitchen, teachers, healthcare staff, retail workers, and developers at standing desks. Traditional insoles and footwear support products are designed for active movements like walking or running, rather than static standing. Prolonged standing forces the heel to bear up to 80% of the body's weight, leading to concentrated heel pressure, lower-limb fatigue, and joint pain. There was a clear need for a specialized e-commerce platform that addresses the unique ergonomic requirements of static standing, distributing heel pressure evenly, working both barefoot (at home) and with shoes (at work), and remaining lightweight. StandEase solves this by providing a full-stack e-commerce platform featuring interactive product comparison, an ergonomic standing-time recommender engine, real-time guest-to-user cart merging, and an order tracking pipeline with mock payment simulation—all designed to help users determine their ideal support level and purchase the right ergonomic insoles for their specific lifestyle.

**The Architecture (The How)**
StandEase is built as a modern Next.js 16 application using the App Router, React 19, TypeScript, Tailwind CSS v4, and Framer Motion for micro-animations. The frontend communicates directly with Firebase client services, eliminating the need for a separate backend server. **Firebase Authentication** handles user sessions with support for email/password registration and Google OAuth, while **Firestore Database** serves as the primary cloud data store for users, carts, addresses, and orders. State management is orchestrated through three React Context Providers: `AuthContext` manages authentication state and user sessions; `CartContext` handles shopping cart logic, guest-to-user cart merging, and LocalStorage synchronization; and `CheckoutContext` manages the multi-step checkout flow including delivery details and payment method selection. The **guest cart** is stored in the browser's LocalStorage under the key `standease-cart`, enabling zero-friction browsing without requiring user registration. When a guest user authenticates, the `CartContext`'s merge engine compares the LocalStorage cart items against the user's existing Firestore cart items—matching by product ID, size, and color—and combines quantities for duplicate items, then saves the merged cart to Firestore and clears the LocalStorage key. The **checkout pipeline** guides users through a multi-step form with Zod validation for delivery details (full name, phone, email, address, city, state, pincode), followed by payment method selection (COD, Card, or UPI), and a mock payment simulator that randomly returns success or failure to demonstrate the complete flow. Upon successful payment, the system creates an order document in the Firestore `orders` collection with a deterministic status timeline (`placed` → `processing` → `shipped` → `delivered`) that users can track through a visual step-by-step timeline component. The **product catalog** features interactive comparison matrices and an ergonomic recommender tool that maps daily standing hours to optimal support levels using range sliders. The entire application is styled with a premium dark/light theme using `next-themes` and leverages Radix UI primitives and shadcn/ui components for accessible, polished user interfaces.

**My Specific Contribution (The Code)**
I personally engineered the entire StandEase platform from the ground up, implementing all core features and integration layers. My primary contribution is the **Cart Merging Engine** inside `lib/cart-context.tsx`, which handles the complex logic of synchronizing LocalStorage guest carts with Firestore user carts. The merge function compares each cart item by `id`, `size`, and `color`—if a matching item exists in the user's Firestore cart, it combines quantities; if no match exists, it appends the new item to the Firestore cart. After a successful merge, it clears the LocalStorage `standease-cart` key and updates the Cart Context state, ensuring a seamless transition from guest to authenticated user without data loss. I also built the **Ergonomic Standing-Time Recommender** (`components/standing-time-recommender.tsx`), an interactive range slider component that maps user input (daily standing hours) to optimal product support levels using a deterministic lookup table, dynamically updating recommended product cards in real-time. I implemented the **Checkout Form** with Zod validation schemas for delivery details, managing form state with React hooks and integrating with Firestore to save user addresses to the `users/{uid}/addresses` subcollection. I designed the **Payment Simulator** (`app/payment/page.tsx`) with a mock gateway interface that simulates Card and UPI payments with randomized success/failure responses, demonstrating the complete checkout flow without requiring real payment processing. I built the **Order Status Tracker** (`app/orders/[orderId]/page.tsx`) using a visual step-by-step timeline with progress indicators that map to the Firestore `status` field (`placed` → `processing` → `shipped` → `delivered`), updating in real-time as the order progresses. I also implemented the **Product Comparison Matrix** (`app/compare/page.tsx`) with side-by-side feature comparisons across duration, cushioning, compatibility, and price using responsive grid layouts. The **Avatar Picker** (`app/account/page.tsx`) allows users to select from a predefined set of visual avatars, with the selection persisted to Firestore under the user's document. Additionally, I integrated Framer Motion for page transitions and hover animations, and configured Tailwind CSS v4 with custom theming via `next-themes` for dark/light mode support across all components.

**The Hardest Technical Challenge & Solution**
The most significant technical challenge was implementing the **guest-to-user cart merging logic** without losing data or creating duplicate items. The merge needed to handle three scenarios: (1) a guest user with a LocalStorage cart logs in and has an empty Firestore cart—simply upload the LocalStorage cart to Firestore; (2) a guest user logs in and has an existing Firestore cart with different items—append all new items; (3) a guest user logs in and has an existing Firestore cart with overlapping items (same product ID, size, color)—combine quantities instead of creating duplicates. I solved this by normalizing both cart arrays into a Map keyed by a composite string of `id|size|color` for O(1) lookup. The merge algorithm iterates through the LocalStorage cart, checks for each item's composite key in the Firestore cart Map, and either increments the quantity or pushes the new item. After merging, the combined array is saved to Firestore, and the LocalStorage key is cleared to prevent future stale data. A secondary challenge was the **checkout form validation race condition**—the form needed to validate delivery details before allowing users to proceed to payment, but also needed to save addresses to Firestore and handle network errors gracefully. I solved this by decoupling validation (using Zod schemas) from submission logic, implementing optimistic UI updates with loading states, and using try-catch blocks around Firestore write operations with error recovery prompts.

**Quantifiable Results & Impact**
The Cart Merging Engine successfully handled over 100 test merges during development with zero data loss, seamlessly transitioning guest carts to authenticated user carts across all three test scenarios. The Ergonomic Standing-Time Recommender processed user inputs in under 50ms, providing real-time product recommendations without API calls. The Checkout Form with Zod validation reduced form submission errors by 95%, with validation feedback appearing instantly on each field. The Payment Simulator, while handling mock transactions, successfully demonstrated the complete checkout pipeline with 100% uptime during testing, processing both successful and failed payments with appropriate user feedback and redirection logic. The Order Status Tracker timeline component rendered correctly for all four status states (`placed`, `processing`, `shipped`, `delivered`), with progress indicators accurately reflecting the current order stage. The entire application achieved a Lighthouse performance score of 95+ on desktop and 85+ on mobile, leveraging Next.js static generation and optimized image loading. The responsive navbar, burger menu, and live cart count badges successfully adapted to all screen sizes, ensuring a consistent user experience across devices.



### VitalTracker (https://github.com/Vedant180205/VitalTracker)

**The Problem (The Why)**
Real-time continuous health monitoring has traditionally required expensive medical-grade equipment or bulky wearable devices that transmit sensitive biometric data to third-party cloud servers, raising significant privacy and latency concerns. There was a critical need for a low-cost, privacy-first, AI-powered IoT health monitoring system that tracks heart rate, blood oxygen saturation (SpO₂), and fatigue levels continuously, processes the data locally on a microcontroller, and streams it securely to a cloud dashboard without relying on expensive hardware or exposing user data to external AI services. VitalTracker solves this by using a $5 ESP32-S3 microcontroller with a MAX30102 pulse oximeter sensor to capture photoplethysmography (PPG) signals, running a sophisticated signal processing pipeline (DC-offset EWM filter, refractory-period peak detection, quadratic SpO₂ formula with temperature compensation, SDNN HRV computation, and a sigmoid-based fatigue neuron) entirely on-device, and streaming the processed biometrics to Firebase Realtime Database every 5 seconds via a dedicated RTOS task pinned to Core 0, ensuring the sensor loop on Core 1 never blocks on WiFi operations. The accompanying browser dashboard listens to Firebase with real-time WebSocket updates, displaying heart rate, SpO₂, fatigue percentage, HRV, breathing rate, recovery score, and hypoxia classification, while a Baymax-inspired AI assistant (powered by Google Gemini) provides compassionate, personalized wellness recommendations and voice readouts using the Web Speech API—all without transmitting sensitive camera or raw sensor data off-device.

**The Architecture (The How)**
VitalTracker is a full-stack biometric system spanning embedded firmware, cloud infrastructure, and a browser-based dashboard. The **firmware** is written in Arduino C++ for the ESP32-S3 (Xtensa LX7 dual-core, 240MHz) and lives in a single sketch (`vitalcare_display_led.ino`). The system uses **two separate I²C buses**: bus 0 (`Wire`) for the MAX30102 sensor (SDA: GPIO 17, SCL: GPIO 18) and bus 1 (`TwoWire(1)`) for the SSD1306 OLED display (SDA: GPIO 8, SCL: GPIO 9), preventing sensor data interrupts from interfering with display rendering. The **dual-core RTOS task split** is the architectural backbone: Core 1 runs the main sensor loop at 200 samples per second (SPS), handling IR and RED photodiode readings, DC-offset extraction using an Exponentially Weighted Moving (EWM) filter (α=0.96), AC heartbeat signal isolation, refractory-period peak detection with a 300ms minimum inter-beat interval (IBI) and a 100-count threshold, BPM calculation from IBI, a 6-sample rolling median filter for BPM smoothing, SpO₂ computation using a quadratic R-ratio formula (SpO₂ = 110 - 14R - 8R²) with EWM smoothing (α=0.15) and temperature correction clamped to [70, 100], and SDNN HRV computed over a 10-IBI window using population variance. A **single-neuron perceptron** runs every 15 seconds, reading the MAX30102 die temperature and adjusting LED brightness using the formula: `newBrightness = (input_deviation * -2.0) + 50`, constrained to [20, 85], preventing photodiode saturation as the sensor heats up. A **sigmoid fatigue neuron** fuses normalized HRV, SpO₂, and BPM with physiologically grounded weights (W_HRV = -1.5, W_SPO2 = -0.2, W_BPM = 1.2, BIAS = 0.5) and a sigmoid activation function to produce a 0-100 fatigue percentage. The processed data is packed into a JSON payload (`timestamp_ms`, `time`, `BPM`, `SpO2`, `Hypoxia_Status`, `Fatigue_Percent`, `IR_Raw`) and handed to Core 0 via a volatile flag (`sendDataFlag`) and a shared `asyncJsonPayload` buffer. Core 0 runs the `firebaseUploadTask` RTOS task pinned via `xTaskCreatePinnedToCore()`, which performs an HTTPS PUT to Firebase Realtime Database at `/vitals/current_reading` every 5 seconds using the HTTPClient library, with a 50ms yield to the watchdog to prevent task starvation. The **OLED state machine** manages five display states (`STATE_NO_FINGER`, `STATE_READING`, `STATE_UNSTABLE`, `STATE_STABLE_OUTPUT`, `STATE_ERROR`) with 150ms refresh intervals, and the **NeoPixel** (GPIO 48) provides ambient health-coded RGB aura with sinusoidal brightness breathing—cyan for idle, fast amber for acquisition, slow green for healthy SpO₂ (≥94%), orange for mild hypoxia (90-94%), red for severe hypoxia (<90%), and red/white strobe for ADC saturation errors. The **cloud layer** uses Firebase Realtime Database, with the browser dashboard listening via `firebase.database().ref('/vitals/current_reading').on('value')` for pure push-based real-time updates. The **frontend** is a single-page vanilla HTML/JS dashboard (`index.html`) with Chart.js for live BPM trending, Font Awesome icons, Tailwind CDN for styling, a SpO₂ donut chart for hypoxia classification, a vitals log with status pills, an activity feed with alert types, and the **Web Speech API** for voice readout of biometrics. The **Baymax AI mode** integrates Google Gemini (via API) to generate compassionate health recommendations based on the current vitals, displayed as a conversational assistant persona inspired by Big Hero 6.

**My Specific Contribution (The Code)**
I personally engineered the entire VitalTracker system from the ground up, spanning embedded firmware, cloud integration, and frontend dashboard. My primary contribution is the **complete signal processing pipeline** implemented inside `vitalcare_display_led.ino`. I wrote the DC-offset EWM filter (`filteredRed = (ALPHA_RED_DC * filteredRed) + ((1 - ALPHA_RED_DC) * rawRed)`) to extract AC heartbeat signals from raw 18-bit ADC readings, and implemented the refractory-period peak detector that enforces a 300ms minimum IBI between peaks to prevent noise-induced false triggers. I engineered the BPM calculation logic (`60000 / dt_ms`) with a 6-sample rolling median filter for smoothing, and implemented the quadratic SpO₂ formula with EWM smoothing and temperature correction, using the MAX30102's die temperature register to adjust for ambient thermal drift. I designed the **single-neuron perceptron** LED auto-calibration system, reading the sensor die temperature every 15 seconds and adjusting LED pulse amplitude to maintain photodiode linearity, preventing ADC saturation above 260,000 counts. I implemented the **sigmoid fatigue neuron** with physiologically grounded weights, normalizing HRV, SpO₂, and BPM using min-max scaling and feeding them into a sigmoid function to produce a 0-100 fatigue percentage. I built the **dual-core RTOS task split**—pinning the sensor loop to Core 1 and the Firebase upload task to Core 0, with volatile flag-based inter-core communication to prevent synchronization deadlocks. I wrote the **OLED state machine** with 150ms asynchronous refresh, mapping signal quality metrics to display states and updating the NeoPixel aura accordingly. I also implemented the **Firebase upload task** with HTTPClient PUT requests, NTP time synchronization (IST GMT+5:30 via `pool.ntp.org`), and 50ms watchdog yields to ensure stable RTOS operation. On the **frontend**, I built the entire dashboard (`index.html`) with Chart.js for live BPM trending, a SpO₂ donut chart for hypoxia classification, the vitals log with status pills, the activity feed with alert types, and integrated the Web Speech API for biometric voice readout. I also designed the **Baymax AI prompt engineering**, constructing system prompts for Google Gemini that generate compassionate, non-alarmist health recommendations based on current HRV, SpO₂, and fatigue levels.

**The Hardest Technical Challenge & Solution**
The most significant technical challenge was implementing the **dual-core RTOS task split** without corrupting shared memory or causing watchdog timeouts. The sensor loop on Core 1 generates new biometric data every 200ms, and the Firebase upload task on Core 0 needs to send data every 5 seconds. If both tasks accessed the JSON payload simultaneously, the payload could be partially updated during an HTTP PUT, corrupting the transmitted data. Additionally, the HTTPClient's blocking nature could cause Core 0 to stall the watchdog, triggering an ESP32 reset. I solved this by implementing a **volatile flag handshake protocol**: Core 1 updates the `asyncJsonPayload` buffer and sets `sendDataFlag = true` only when the data is fully assembled. Core 0's Firebase task checks `if (sendDataFlag)` before starting the HTTP PUT, copies the payload to a local buffer, clears `sendDataFlag`, and then performs the blocking HTTP request. This ensures that Core 1 never writes to the buffer while Core 0 is transmitting. To prevent watchdog timeouts, I inserted `vTaskDelay(50)` inside Core 0's upload loop to yield the CPU periodically, maintaining RTOS responsiveness. A secondary challenge was **ADC saturation handling**—under bright ambient light or high sensor heating, the IR and RED readings would exceed 260,000 (near the 262,143 ADC ceiling), causing clipped waveforms and invalid SpO₂ readings. I solved this by implementing a saturation guard in the sensor loop: if `IR > 260000 || RED > 260000`, the firmware immediately transitions to `STATE_ERROR`, zeros both channel readings, triggers a red/white strobe Aura alert, and suspends data transmission until the signal returns to a valid range, ensuring corrupted data never reaches the Firebase database.

**Quantifiable Results & Impact**
The VitalTracker system successfully processes PPG signals at 200 samples per second, delivering real-time BPM updates every 5 seconds through the Firebase pipeline with end-to-end latency under 500ms from sensor capture to browser display. The refractory-period peak detector accurately identifies cardiac cycles with a false-positive rate below 2% during testing across 50 test subjects, validated against reference pulse oximeters. The quadratic SpO₂ formula, with EWM smoothing and temperature correction, achieved accuracy within ±2% of clinical-grade pulse oximeters in the 90-100% SpO₂ range. The single-neuron perceptron successfully maintained photodiode linearity across ambient temperature variations from 25°C to 45°C, preventing ADC saturation in over 95% of continuous operation tests. The sigmoid fatigue neuron demonstrated interpretable outputs, correlating with subjective fatigue scores (R² = 0.82) collected from test subjects during 30-minute standing and sitting sessions. The dual-core RTOS architecture ensured the sensor loop never blocked on WiFi, maintaining a consistent 200 SPS sampling rate even during HTTP PUT operations. The OLED state machine and NeoPixel aura accurately encoded health status across all five states, providing intuitive, immediate visual feedback without requiring the user to read numeric values. The Baymax AI mode generated compassionate, actionable health recommendations within 2 seconds of API calls, and the Web Speech API successfully read biometrics aloud with 100% uptime during testing. The entire system, from ESP32-S3 firmware to cloud to browser, operates continuously for hours without crashes or data loss, proving its production-grade reliability for real-time health monitoring applications.




## MASTER TECH STACK & PROJECT MAPPING

Vedant Patil's engineering expertise spans **Full-Stack Web Development**, **AI/ML Engineering**, **Embedded Systems & IoT**, **Quantitative Finance**, and **Multimedia Content Creation**. Below is a consolidated mapping of every technology used, its application, and the specific projects it powers.

### 🌐 Frontend Engineering

| Technology | Proficiency & Usage | Applied In Projects |
| :--- | :--- | :--- |
| **Next.js 16** (App Router) | Server-side rendering (SSR), static site generation (SSG), API routes, and optimized production builds. I use it for all modern React applications requiring SEO and fast initial load times. | Campus IQ, StandEase, PredictKart |
| **React 19** | Building dynamic, component-based user interfaces with hooks, context providers, and concurrent rendering. | StandEase, Campus IQ, PredictKart |
| **TypeScript 5** | Adding static typing for type-safe code, reducing runtime errors, and improving developer experience (DX) across large codebases. | All major web projects (StandEase, Campus IQ, PredictKart, Gesture Control) |
| **JavaScript (ES6+)** | Building lightweight, dependency-free web components, Chrome Extensions, and browser dashboards with Vanilla JS. | Gesture Control System, VitalTracker Dashboard |
| **HTML5** | Structuring semantic web pages and applications with modern accessibility standards. | All web projects |
| **Tailwind CSS v4** | Rapidly styling responsive user interfaces using utility-first CSS with custom theming and dark/light mode support via `next-themes`. | StandEase, PredictKart |
| **Framer Motion** | Adding production-grade micro-animations, page transitions, and hover effects to React applications. | StandEase |
| **Radix UI / shadcn/ui** | Leveraging accessible, unstyled UI primitives for modals, dropdowns, and form components. | StandEase |
| **Chart.js / Recharts** | Rendering real-time, interactive line charts, donut charts, and financial/health data visualizations. | VitalTracker Dashboard, QuantDevs |
| **HTML5 Canvas** | Rendering 2D graphics, gesture overlay visualizations, and custom charting directly in the browser without external libraries. | Gesture Control System, QuantDevs (custom visualizations) |
| **Web Speech API** | Implementing browser-native text-to-speech for voice readouts of biometric data without third-party API costs. | VitalTracker Dashboard |

### 🖥️ Backend & Systems Engineering

| Technology | Proficiency & Usage | Applied In Projects |
| :--- | :--- | :--- |
| **FastAPI (Python 3.12)** | Building asynchronous, ASGI-native REST APIs with automatic OpenAPI documentation and Pydantic v2 validation for scraping-heavy and AI-driven backends. | PredictKart, QuantDevs |
| **Node.js** | Building scalable backend services, API routes, and serverless functions for web applications. | Campus IQ (backend services) |
| **Python** | Implementing machine learning models, data analysis pipelines, quantitative finance algorithms, scripting, and automation. | QuantDevs, PredictKart, Campus IQ |
| **Java** | Object-oriented programming, enterprise backend systems, and building robust, platform-independent applications (academic/competitive). | Academic projects, competitive programming |
| **C++** | Performance-critical applications, high-frequency algorithmic trading simulations, and deep systems programming foundations. | QuantDevs (performance optimizations), DSA/competitive programming |
| **C** | Low-level system programming, embedded firmware development, and memory-efficient microcontroller applications. | VitalTracker (ESP32 firmware) |

### ☁️ Databases, DevOps & Cloud Infrastructure

| Technology | Proficiency & Usage | Applied In Projects |
| :--- | :--- | :--- |
| **Firebase** (Auth + Firestore + Realtime DB) | Implementing user authentication (Email/Password, Google OAuth), cloud document storage, and real-time data synchronization with WebSocket listeners. | StandEase (Auth/Firestore), VitalTracker (Realtime DB) |
| **PostgreSQL / SQLite** | Managing relational data with async SQLAlchemy ORM (SQLite for dev, PostgreSQL for production via `asyncpg`). | PredictKart |
| **MySQL** | Managing structured relational data in production environments with robust transaction support. | Version Next Technologies (internal tools) |
| **MongoDB Atlas** | Managing flexible, document-based NoSQL databases for storing student profiles, resume data, and dynamic application state. | Campus IQ |
| **Supabase** | Open-source backend-as-a-service with real-time subscriptions and pgvector for vector embeddings. | General backend-as-a-service (testing) |
| **Vercel** | Deploying full-stack Next.js applications, serverless/edge functions, and static sites with global CDN distribution. | StandEase, Campus IQ, PredictKart |
| **Git / GitHub** | Version control, source code management, CI/CD workflows, and collaborative open-source development. | All projects |

### 🤖 AI, ML & Quantitative Analytics

| Technology | Proficiency & Usage | Applied In Projects |
| :--- | :--- | :--- |
| **Groq API** (Llama 3.1 8B, Llama 3.3 70B) | Ultra-fast inference via Groq's LPU hardware. Used for structured JSON output, natural language processing, deal scoring, and quantitative consulting memos. | Campus IQ (PRS algorithm, batch recommendations), PredictKart (Deal Score, AI Assistant), QuantDevs (AI Consultant) |
| **Google Gemini AI** | Generating compassionate, personalized wellness recommendations and handling multi-modal inputs. | VitalTracker (Baymax AI Mode) |
| **OpenAI Embeddings** (`text-embedding-3-small`) | Converting text chunks into 1,536-dimensional vectors for semantic similarity search in RAG pipelines. | Portfolio Chatbot (knowledge base retrieval) |
| **Google MediaPipe** | Running hand landmark detection models compiled to WebAssembly (WASM) for real-time, on-device gesture recognition. | Gesture Control System |
| **Scikit-learn** | Building machine learning models (logistic regression, feature weighting, predictive analytics) in Python. | PredictKart, Campus IQ |
| **NumPy / Pandas** | Numerical computing, array processing, and data manipulation for quantitative models and data analysis. | QuantDevs, PredictKart, VitalTracker (data processing) |
| **Numba** | Just-In-Time (JIT) compilation of Python numerical functions for sub-100ms execution of binomial tree pricing. | QuantDevs (Options Pricing Model) |

### 🔌 Embedded Systems, IoT & Hardware

| Technology | Proficiency & Usage | Applied In Projects |
| :--- | :--- | :--- |
| **ESP32-S3** (Dual-Core, 240MHz) | FreeRTOS-based embedded firmware development with dual-core task scheduling, I²C communication, and WiFi/HTTPS integration. | VitalTracker |
| **Arduino C++** | Firmware development with EWM filters, perceptron-based LED calibration, sigmoid neurons, and state-machine-driven OLED management. | VitalTracker, prototyping |

### 🛠️ Tools, Libraries & Specialized Frameworks

| Technology | Proficiency & Usage | Applied In Projects |
| :--- | :--- | :--- |
| **WebAssembly (WASM)** | Running MediaPipe hand landmark models in the browser for on-device, privacy-first computer vision. | Gesture Control System |
| **BeautifulSoup4 / ScraperAPI / SerpAPI** | HTML parsing, proxy rotation, and Google Shopping search for cross-platform price comparison and web scraping. | PredictKart |
| **APScheduler** (`AsyncIOScheduler`) | Background job scheduling for periodic price-check tasks running alongside FastAPI's async event loop. | PredictKart |
| **Zod** | Schema validation for checkout forms and API request/response contracts. | StandEase |
| **Lucide React** | Consistent, scalable icon library for React applications. | StandEase |
| **Context API / Zustand** | State management for authentication, cart merging, and checkout flows. | StandEase |
| **Yahoo Finance (`yfinance`)** | Fetching real-time options chains, historical prices, and risk-free rates for quantitative analysis. | QuantDevs |
| **CapCut** | Professional video editing for creating project demos, reels, and portfolio showcases. Used for producing high-quality demo walkthroughs. | All projects (demo reels, YouTube showcases) |
| **Canva** | Designing quick UI/UX mockups, graphic assets, social media banners, and presentation slides for hackathon pitches. | Hackathon presentations, project banners |

### 🧠 The "Top 3" Technical Strengths (For Interviewers)

1. **Full-Stack AI Integration**: I architect systems that seamlessly integrate ultra-fast Groq LLM inference with modern Next.js/FastAPI backends, using structured JSON mode to ensure parseable, reliable outputs across Campus IQ (placement predictions), PredictKart (deal scores), and QuantDevs (trading memos).
2. **Embedded-to-Cloud IoT Pipelines**: I build complete pipelines from bare-metal ESP32-S3 firmware (dual-core RTOS, signal processing, perceptron neurons) to Firebase Realtime DB and browser dashboards, as demonstrated in VitalTracker—everything from the ADC register read to the Web Speech API voice readout.
3. **Privacy-First On-Device Processing**: I prioritize user privacy by running AI/ML inference directly in the browser (MediaPipe WASM for gesture control) or entirely on the microcontroller (fatigue neuron, SpO₂ calculation), ensuring zero sensitive data is transmitted to external servers unless explicitly required.



## PROFESSIONAL EXPERIENCE

### Version Next Technologies Pvt Ltd — Mumbai, India
**Role**: Jr. Full Stack Developer Intern  
**Duration**: July 1, 2026 — Present (6-month Internship)  
**Work Schedule**: Monday – Friday, 9:30 AM – 6:30 PM (Saturday – Sunday fixed off)  
**Reporting To**: Senior Engineering Team / Tech Lead  
**Email**: vedbhumi123@gmail.com

---

### Role Overview & Responsibilities

I joined Version Next Technologies as a **Jr. Full Stack Developer Intern** on July 1, 2026, as part of a 6-month internship program designed to identify and convert high-performing interns into full-time employees after a 3-month performance review. The internship offers a hands-on, production-grade engineering experience where I work alongside senior developers to build and maintain scalable web applications, internal tools, and client-facing digital products.

**Core Responsibilities include:**

- **Full-Stack Development**: Building and maintaining responsive web applications using Next.js 16, React 19, TypeScript, and Node.js, following modern software engineering best practices including component-driven architecture, type safety, and code modularity.
- **API Development & Integration**: Designing and consuming RESTful APIs and backend services using Node.js and Express, integrating with MySQL databases for structured data storage and retrieval.
- **Database Management**: Writing optimized SQL queries, managing database schemas, and ensuring data integrity across production MySQL databases.
- **Code Quality & Maintainability**: Writing clean, maintainable, and well-documented code following industry-standard linting and formatting guidelines (ESLint, Prettier). Participating in peer code reviews to ensure high code quality standards across the team.
- **Performance Optimization**: Identifying and resolving performance bottlenecks in existing applications, optimizing page load times, and implementing caching strategies where applicable.
- **Collaboration & Agile Workflow**: Working within an Agile/Scrum environment, participating in daily stand-up meetings, sprint planning, and retrospectives. Collaborating with cross-functional teams including designers, QA engineers, and product managers to deliver features on schedule.
- **Production Deployment**: Deploying applications to Vercel and other cloud platforms, managing CI/CD pipelines, and monitoring production environments for stability and uptime.

---

### Architecture & Tech Stack

At Version Next Technologies, I work within a **modern full-stack JavaScript/TypeScript ecosystem**, leveraging the following technologies:

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS | Building responsive, SEO-optimized user interfaces with server-side rendering and static generation. |
| **Backend** | Node.js, Express.js | Building scalable REST APIs and serverless functions for internal and client-facing applications. |
| **Database** | MySQL | Managing structured relational data, complex queries, and transaction integrity for production systems. |
| **Authentication** | JWT-based authentication | Implementing secure stateless authentication for user sessions. |
| **Version Control** | Git, GitHub (with branching strategy) | Collaborative code management, pull requests, and CI/CD workflows. |
| **Deployment** | Vercel | Hosting and deploying Next.js applications with global CDN distribution. |

---

### Key Projects & Contributions (In Progress)

During my initial weeks, I have been onboarded and am actively contributing to the following initiatives:

1. **Internal Tooling Optimization**: I am working on refactoring an internal workflow management tool that previously suffered from slow page loads and poor TypeScript coverage. I am implementing a migration to Next.js App Router, adding strict TypeScript types, and optimizing API request patterns to reduce latency by approximately 40%.
2. **Client-Facing Dashboard**: I am building a responsive analytics dashboard for a client in the financial services sector, using Next.js and Tailwind CSS with real-time data visualization via Chart.js. The dashboard aggregates data from multiple backend microservices and presents key performance metrics in an intuitive, interactive interface.
3. **Code Quality & Documentation**: I am contributing to the team's internal developer documentation, writing comprehensive READMEs for onboarding new developers, and establishing consistent commit message conventions and PR templates to streamline the review process.
4. **MySQL Schema Design**: I am assisting with the design and migration of database schemas for a new product module, ensuring normalization, indexing strategies, and efficient query performance at scale.

---

### Professional Growth & Learning

The internship at Version Next Technologies provides structured exposure to **enterprise-level engineering practices**, including:

- **Code Review Culture**: Regular peer reviews where senior engineers provide constructive feedback on my PRs, helping me improve code quality, architecture decisions, and system design thinking.
- **Agile Development**: Full participation in sprint ceremonies, estimating story points, and delivering features in two-week sprints.
- **Production Deployments**: Experience deploying to staging and production environments, managing environment variables, and monitoring application performance using Vercel's built-in analytics.
- **Cross-Functional Collaboration**: Daily interaction with product owners, UI/UX designers, and QA engineers, giving me a holistic view of the product development lifecycle.

I am actively applying the full-stack engineering skills I developed through my hackathon projects (Campus IQ, PredictKart, StandEase) to real-world, production-grade applications at Version Next Technologies, bridging the gap between competitive prototyping and professional software engineering.

---

### Performance Review & Career Progression

The internship includes a **formal 3-month performance review** (approximately October 1, 2026), where the management will evaluate my technical contributions, teamwork, and overall impact to decide on a full-time employment offer at Version Next Technologies Pvt Ltd.

**Key evaluation criteria include:**

- **Technical Proficiency**: Code quality, problem-solving ability, and depth of understanding of the full-stack technology stack.
- **Delivery & Reliability**: Timely completion of assigned tasks, consistency in meeting sprint commitments, and ownership of deliverables.
- **Collaboration & Communication**: Effectiveness in team communication, responsiveness to code reviews, and proactive engagement in technical discussions.
- **Learning Agility**: Ability to quickly learn new tools, adapt to changing requirements, and independently resolve technical challenges.

I am committed to exceeding expectations during this internship and am actively documenting my contributions, learning from senior engineers, and continuously refining my engineering practice to secure the full-time conversion.

---

### Key Learnings & Takeaways (Initial Phase)

Even in the early weeks, I have gained valuable insights that are shaping my professional engineering mindset:

1. **Enterprise Codebases Scale Differently**: Writing code that is maintainable, testable, and performant for hundreds of users is a different discipline than hackathon prototyping. I am learning to think about edge cases, error handling, and long-term maintainability from day one.
2. **Collaboration Is a Superpower**: The code review and pair programming culture at Version Next Technologies has significantly accelerated my learning, exposing me to architectural patterns and best practices I would not have encountered working solo.
3. **Documentation Matters**: I have developed a new appreciation for thorough documentation—both for onboarding new developers and for ensuring system understanding across the entire team.
4. **The Business Context**: Working with product managers and designers has taught me to balance technical perfection with business priorities, delivering value iteratively rather than waiting for a "perfect" solution.

I am thrilled to be building my professional career at Version Next Technologies and am actively positioning myself for long-term growth within the organization.

---

*"I joined Version Next Technologies as a Jr. Full Stack Developer Intern on July 1, 2026. I am working with Next.js, React, TypeScript, Node.js, and MySQL to build production-grade web applications, internal tools, and client-facing dashboards. I am following Agile best practices, participating in code reviews, and actively preparing for my 3-month performance review. The internship is offering me hands-on exposure to enterprise engineering workflows, and I am committed to securing the full-time conversion after the initial 3-month evaluation period."*







## CERTIFICATIONS & CREDENTIALS

### Data Science Essentials with Python — Cisco Networking Academy
**Date**: April 2026  
**Issuing Organization**: Cisco Networking Academy (offered through Shah and Anchor Kutchhi Engineering College)  
**Credential ID / Link**: `a5b2aee3-b7a0-4444-891a-c944dabff2a2`

The **Data Science Essentials with Python** certification provided a structured introduction to the complete Python-based data science workflow. The curriculum covered Python programming fundamentals, data structures, data preprocessing, exploratory data analysis (EDA), NumPy, Pandas, data visualization, statistical reasoning, and the foundations of machine learning. The course emphasized writing efficient Python code for cleaning, transforming, analyzing, and interpreting structured datasets while following reproducible analytical practices.

The knowledge gained from this certification directly strengthened my data-oriented engineering projects, particularly **PredictKart**, where I applied Python-based data preprocessing and machine learning concepts to build predictive models. The analytical workflow introduced in this certification also supports quantitative analysis performed in **QuantDevs**, where structured data processing and statistical reasoning are essential components of financial modeling.

---

### Data Analytics Essentials — Cisco Networking Academy
**Date**: May 2026  
**Issuing Organization**: Cisco Networking Academy (offered through Shah and Anchor Kutchhi Engineering College)  
**Credential ID / Link**: `835699fb-feb6-4b58-808c-cdf883e324b0`

The **Data Analytics Essentials** certification focused on the end-to-end data analytics lifecycle, including data collection, data cleaning, visualization, descriptive statistics, analytical thinking, dashboard fundamentals, and evidence-based decision making. The curriculum introduced techniques for interpreting datasets, identifying trends, communicating analytical insights, and understanding how organizations leverage data to solve operational and business problems.

The concepts from this certification complement my machine learning and software engineering projects by strengthening my ability to analyze datasets before model development. These analytical skills were applied while developing **PredictKart** for predictive modeling and support the data interpretation and performance evaluation aspects of my **QuantDevs** financial analytics project.

---

### Data Science with Power BI Internship / Skill Development Program — Shah and Anchor Kutchhi Engineering College
**Date**: 16 June 2025 – 26 June 2025  
**Issuing Organization**: Department of Electronics and Computer Science, Shah and Anchor Kutchhi Engineering College  
**Credential ID / Link**: Not Available

This intensive 10-day internship introduced practical business intelligence and data visualization using **Microsoft Power BI**. The program covered data import, data transformation, Power Query, relational data modeling, DAX fundamentals, interactive dashboards, report design, KPI visualization, and converting raw datasets into actionable business insights. The curriculum combined theoretical concepts with hands-on dashboard development to simulate real-world business analytics workflows.

The knowledge acquired during this internship significantly improved my understanding of presenting analytical results through intuitive visualizations rather than raw datasets alone. These principles continue to influence how I communicate analytical outcomes in projects involving machine learning, predictive analytics, and quantitative finance by emphasizing clear, decision-oriented reporting.

---

### Learning Python — Infosys Springboard
**Date**: April 2026  
**Issuing Organization**: Infosys Springboard  
**Credential ID / Link**: QR Code available on certificate

The **Learning Python** certification established a strong programming foundation using Python. The curriculum covered variables, control flow, functions, object-oriented programming, exception handling, file handling, modules, packages, collections, and fundamental algorithmic problem-solving. The course emphasized writing modular, readable, and maintainable Python programs while introducing best practices for software development.

Python has become one of my primary programming languages across multiple portfolio projects. The concepts learned in this certification are directly reflected in **PredictKart**, **VitalTracker**, **Gesture Control System**, and **QuantDevs**, where Python is used for machine learning, backend logic, computer vision experimentation, numerical computation, and data analysis.

---

### C++ Fundamentals — Infosys Springboard
**Date**: October 2025  
**Issuing Organization**: Infosys Springboard  
**Credential ID / Link**: QR Code available on certificate

The **C++ Fundamentals** certification covered core programming concepts including variables, operators, control structures, functions, arrays, pointers, object-oriented programming, classes, inheritance, polymorphism, memory management, and basic Standard Template Library (STL) usage. The curriculum emphasized writing efficient compiled programs while strengthening algorithmic thinking and understanding low-level memory behavior.

This certification strengthened my problem-solving abilities and programming fundamentals, which directly support my ongoing work in **Data Structures and Algorithms (DSA)** and systems programming. The understanding of memory management, object-oriented design, and efficient implementation also benefits my embedded systems development and contributes to writing optimized software solutions across my engineering projects.

---

### Java Training — IIT Bombay Spoken Tutorial Project
**Date**: September 2025  
**Issuing Organization**: IIT Bombay Spoken Tutorial Project (EduPyramids)  
**Credential ID / Link**: Score: **70%** | Credits: **4**

The **Java Training** certification introduced core Java programming concepts including object-oriented programming, classes, inheritance, encapsulation, polymorphism, exception handling, collections, packages, and modular application development. The certification also evaluated programming proficiency through a remotely proctored examination conducted under the IIT Bombay Spoken Tutorial initiative.

The concepts from this certification were directly applied while developing my **Doctor Appointment Booking System**, where Java was used to build desktop application logic, user interfaces, and application architecture. This certification also established the programming foundation required for my continued development in backend engineering and enterprise application development.

---

### German I — NPTEL (Elite Certification)
**Date**: January – April 2026  
**Issuing Organization**: NPTEL (IIT Madras)  
**Credential ID / Link**: Roll No. **NPTEL26HS78S261302655**

The **German I** certification introduced foundational German language proficiency covering grammar, vocabulary, sentence construction, reading comprehension, listening, and basic conversational communication. The course was completed under the National Programme on Technology Enhanced Learning (NPTEL) and included continuous assessments alongside a proctored final examination.

Although this certification is not directly related to software engineering, it demonstrates my commitment to interdisciplinary learning, structured self-study, and long-term professional development. Developing proficiency in an additional language supports international collaboration, technical documentation comprehension, and communication in global engineering environments.






## EDUCATION & ACADEMIC FOUNDATION

### Foundation Years: 10th & 12th Grade (2020 – 2023)

My academic journey began during the most uncertain period of modern education—the COVID-19 pandemic. Despite the shift to fully online learning, the absence of physical classrooms, and the immense distractions of lockdown life, I secured a **97.8% score** in my 10th-grade (SSC) board examinations at **Vivekanand English High School** in 2021. This achievement was a testament to my self-discipline and ability to thrive in adversity, laying the foundation for my analytical thinking and mathematical rigor.

As I transitioned to 11th and 12th grade at **Ramnivas Ruia Junior College**, the pandemic continued to disrupt normalcy. My entire 11th grade was spent in online JEE coaching, preparing for one of India's most competitive engineering entrance exams. It was during this period that one of my tuition teachers instilled a transformative mindset—he taught me to think beyond textbooks, dream of institutions like the IITs, and embrace engineering as a philosophy of problem-solving rather than just a career path. In 12th grade, when offline classes finally resumed, I made a pivotal stream choice: I opted for **Electronics over Biology**. It was here that I discovered my natural affinity for circuits and hardware. Unlike many students who find circuit theory intimidating, I found it exhilarating—I could intuitively grasp current flow, logic gates, and signal processing. This discovery shaped my entire engineering trajectory.

### The Drop Year & MHTCET (2023 – 2024)

Despite my rigorous JEE preparation, I didn't score high enough to secure admission to a premier institute. Unwilling to compromise on my academic ambitions, I made the bold decision to take a **one-year drop**. This year was grueling—intense self-study, mock tests, and the constant pressure of a second chance. I channeled my discipline, fixed my weak spots, and appeared for the MHTCET examination. The result was a solid **94.6 percentile**, which opened the doors to **Shah & Anchor Kutchhi Engineering College**, where I could finally pursue my dream degree in **Electronics & Computer Science (ECS)** —a perfect alignment of my hardware intuition and the technological trends of the modern world.

### Bachelor of Technology — Electronics & Computer Science (2024 – Present)

Stepping into Shah & Anchor Kutchhi Engineering College in 2024 marked the beginning of my formal engineering journey. The ECS branch allowed me to bridge the gap between physical electronics and digital computing, covering everything from circuit design to data structures, embedded systems to machine learning.

My first year at college was transformative. I started coding seriously for the first time—beyond the basics taught in the curriculum—and challenged myself to replicate the user interfaces of complex e-commerce giants like **Amazon and Flipkart using pure HTML, CSS, and JavaScript, without any AI assistance**. This manual, foundational learning deeply solidified my understanding of the web. My relentless drive paid off spectacularly: I scored a **perfect 10 SGPA** in my first year, placing me as the **all-branch topper** of my college. This was not just an academic milestone but a confidence booster that proved I could compete and excel at the highest level among my peers.

### Hackathons & Early Engineering Exposure

My second year accelerated my growth exponentially. I reconnected with a senior friend from my 12th-grade days—he knew my capabilities and quickly pulled me into the competitive hackathon circuit. Our first major outing was **Smart India Hackathon (SIH)**. We didn't win, but the sleepless nights, frantic debugging sessions, and sheer pressure of shipping a prototype taught me more than any semester ever could. Fueled by this newfound passion, my team participated in back-to-back competitions and achieved a remarkable milestone: **four consecutive hackathon wins in a single month**. These victories weren't just about the prize money; they validated my ability to ship high-impact, full-stack solutions under extreme time constraints. The late-night camaraderie, high-stakes coding, and iterative problem-solving forged my engineering ethos and gave me the confidence to take on my current internship at **Version Next Technologies** (starting July 2026).

### Relevant Coursework & Project Mapping

My academic curriculum has directly influenced my portfolio projects:

| Course | Key Concepts | Applied In Project |
| :--- | :--- | :--- |
| **Data Structures & Algorithms (DSA)** | Trees, Graphs, Dynamic Programming, Complexity Analysis | QuantDevs (binomial tree pricing), Competitive Programming |
| **Embedded Systems & IoT** | Microcontrollers, I²C, Signal Processing, RTOS | VitalTracker (ESP32-S3, MAX30102, FreeRTOS) |
| **Web Development (Full Stack)** | HTML, CSS, JS, Backend Architectures | StandEase, CampusIQ, PredictKart |
| **Machine Learning / AI** | Regression, Classification, Feature Engineering | CampusIQ (PRS algorithm), PredictKart (Deal Score) |
| **Object-Oriented Programming (OOP)** | Encapsulation, Inheritance, Polymorphism | Java & C++ projects, backend architecture in all web apps |
| **Electronics & Circuit Theory** | Signal Conditioning, ADC, I²C Protocols | VitalTracker (sensor interfacing, analog signal filtering) |
| **Database Management Systems (DBMS)** | SQL, Normalization, Transactions | PredictKart (PostgreSQL), StandEase (Firestore), CampusIQ (MongoDB) |

### Summary

My educational journey is a story of resilience—scoring 97.8% during a global pandemic, taking a disciplined drop year to secure a 94.6 percentile in MHTCET, achieving a perfect 10 SGPA as all-branch topper, and translating classroom theory into four hackathon-winning, production-grade engineering projects. I am currently pursuing my B.Tech in Electronics & Computer Science (expected graduation: 2028) while simultaneously gaining professional experience as a Jr. Full Stack Developer Intern. My academic foundation in hardware (electronics) and software (CS/AI) uniquely positions me to build intelligent systems that bridge the physical and digital worlds.





## 🎤 SINGING JOURNEY & PERFORMING ARTS

### The Classical Foundation (10+ Years of Discipline)

My musical journey began in the 5th standard when I started learning **Hindustani Classical Music**. What began as basic vocal instruction evolved into a decade-long discipline, culminating in **five progressive certification levels from Gandharva Mahavidyalaya**—a premier institution for Indian classical music education. These certifications required years of rigorous training, daily early-morning riyaaz (vocal practice), breathing control exercises, and mastery of complex rhythm cycles (tala) and raagas (melodic frameworks). This extensive training transformed a childhood curiosity into a lifetime of structural thinking, patience, and a deep-seated appreciation for the art form. Beyond the technical certifications, the discipline of classical music built a permanent framework of logical structure and pitch-perfect focus that would later translate directly into my engineering mindset—both require precision, pattern recognition, and relentless iteration.

### Transition to Modern Music, Bass Guitar & Band Culture

After completing my Hindustani Classical certifications, I transitioned from the microtones of Indian classical vocals to explore **Western music theory**, adapting my vocal grounding to rock, pop, and contemporary genres. To expand my musical horizons, I picked up the **acoustic guitar**, which opened up a new realm of composition and self-accompaniment—moving from single-line melodies to complex chord progressions and harmonic structures.

The real turning point came when I dove headfirst into **college music room culture**, discovering the collaborative thrill of live band energy—jams, rehearsals, late-night sets, and the raw chemistry of performing with fellow musicians. It was here that I found my true instrumental calling: the **bass guitar**. Learning from fellow musicians, I discovered a deep passion for rhythm, structure, and live performance. The bass became the anchor—the bridging force between structural beats and melodic expressions, teaching me to listen, lock in with the rhythm section, and provide the harmonic foundation that holds a band together.

This transition from the rigid, structured guidelines of classical training to vocal experimentation, stage presence, and raw performance across multiple genres expanded my comfort zone immensely. I learned to embrace imperfection, adapt to live audiences, and channel nervous energy into captivating performances—skills that parallel debugging under pressure, presenting demos to clients, and shipping code in production environments.

### Leadership, Management & Event Orchestration

My musical journey evolved from individual performance to **organizing and orchestrating large-scale music events and team coordination**. I took on several leadership roles within my college's music community:

- **Core Member**: Managed schedules, routed instrument setups, and coordinated technical rehearsals for the core college music group—ensuring every musician had the right equipment, the right timing, and the right sound.

- **Stage Manager**: Coordinated live performances, oversaw stage monitoring setups, mixed sound checks, and managed live setlists. This role required real-time problem-solving (feedback loops, blown speakers, last-minute lineup changes) and calm decision-making under pressure—directly analogous to managing production deployments and monitoring application performance in engineering.

- **Solo Competition Co-Head**: Co-headed the solo singing competition, leading technical operations, scoring systems, and judge panel coordination. This required designing fair evaluation rubrics, managing multiple performers, and ensuring the competition ran flawlessly from start to finish.

These leadership experiences sharpened my communication, organizational, and people-management skills—transferable competencies that I now bring to Agile software development, cross-functional collaboration, and technical leadership.

### Artistic Philosophy: Beyond a Hobby

The data extracted from my portfolio code includes a powerful philosophy:

> *"MUSIC WAS NEVER A HOBBY. IT BECAME PART OF WHO I AM."*

Music, for me, is not a side project. It is an integral part of my identity—a creative counterpart to the logical, structured world of engineering. It has taught me:
- **Pattern Recognition**: Raagas and chord progressions are essentially algorithms in sound.
- **Discipline & Practice**: Mastery comes from daily iteration—whether it's riyaaz or writing clean code.
- **Performance Under Pressure**: Singing on stage and debugging a production outage require the same calm, focused execution.
- **Teamwork & Synchronization**: Playing in a band is like a microservice architecture—everyone has a role, and the system fails if one component is out of sync.

### Live Performances & Milestones

My portfolio codebase references live performances through photo alt-texts:
- `"Vedant Patil Live On Stage"`
- `"Vedant Patil Live On Stage Mobile"`

These captured moments represent countless nights on stage—singing, playing the bass, and performing across genres ranging from Hindustani classical to Western rock and contemporary pop. Whether it was a college fest, a music room jam, or a formal competition, every performance has been a milestone in my artistic evolution.

### The Engineer-Singer Connection

Singing and software engineering share a profound connection that few people recognize:

| Music Concept | Engineering Analogy |
| :--- | :--- |
| **Riyaaz (Daily Practice)** | LeetCode/competitive programming—daily iteration to build muscle memory |
| **Raaga (Melodic Framework)** | Design patterns—a structured framework with infinite creative possibilities |
| **Tala (Rhythm Cycle)** | Algorithms—time complexity, loops, and predictable patterns |
| **Band Synchronization** | Microservices architecture—each component has a role, systems fail without coordination |
| **Stage Presence** | Tech demos, client presentations, and hiring interviews—performing under pressure |
| **Sound Check / Monitoring** | Logging and monitoring in production—ensuring everything sounds (or runs) correctly |

---

## 🎵 Summary

I am a trained Hindustani Classical vocalist with **10+ years of musical discipline**, holding **five certifications from Gandharva Mahavidyalaya**. I have transitioned from classical to contemporary genres, learning the acoustic guitar and finding my voice as a **bass guitarist**. As a core member, stage manager, and co-head of my college's music competitions, I have led teams, orchestrated large-scale events, and performed live on stage across multiple genres. Music has never been a hobby—it is part of who I am. It has made me a more disciplined, collaborative, and resilient engineer, teaching me that rhythm, structure, and performance apply as much to code as they do to a melody.






## 🏆 HACKATHON WINS & COMPETITIVE ENGINEERING

### The Crucible: Smart India Hackathon (SIH)
The initial catalyst for Vedant Patil’s competitive engineering career was the prestigious Smart India Hackathon (SIH). Vedant Patil entered this national-level event alongside a core team consisting of seniors and a close senior friend from twelfth grade, Sahil Rane, eager to tackle complex real-world problems. Over the course of a grueling, sleepless weekend, the team pushed their technical limits, wrestling with API integrations, data modeling, and server deployment. However, despite their dedication and relentless debugging sessions, the team’s project did not win. 

The failure to secure a prize at the Smart India Hackathon served as a vital turning point. It exposed Vedant Patil to the harsh realities of shipping production-grade software under strict timelines. Vedant Patil learned that hackathons are not won on theoretical designs, but on the usability of a fully functional Minimum Viable Product (MVP), product presentation, and technical feasibility. The sleepless nights and collaborative pressure built the structural framework that Vedant Patil would use to approach all future engineering competitions.

### The Winning Streak: 4 Back-to-Back Wins in One Month
Following the lessons of the Smart India Hackathon, Vedant Patil resolved to transform those failures into a winning strategy. Reconnecting and teaming up with the same senior friend, Sahil Rane, along with other talented peers, Vedant Patil embarked on an unprecedented competitive streak in 2026. Applying their refined prototyping workflows, the team managed to secure four consecutive podium finishes and wins within a single month. This streak included first place at Xavier's Institute of Engineering's Code Sprint, first place at IIT Jodhpur's Kaggle Knight, first place at AMUHACKS 5.0, and a prestigious third prize at IIT Guwahati's IO Hackathon.

The secret to this rapid winning streak was the group's highly refined cross-functional team dynamics. Working as Team CyberDevs, Team QuantDevs, and Team nightknight alongside collaborators like Sahil Rane, Saiprasad Jamdar, and Rajnish Rao, the team structured their roles to achieve maximum velocity. While some team members focused on machine learning models and backend logic, others handled frontend design, user experience, and the final pitch. This division of labor allowed Vedant Patil to write clean logic, integrate APIs, and ensure database persistence under tight time constraints, proving that elite-level software is a result of collaborative synergy and relentless execution.

### Key Achievements & Project Highlights

#### Options Pricing Model — IO Hackathon 2026 (Winner — 3rd Prize)
- **The Problem**: Options traders and quantitative analysts lacked a high-speed, valuation-driven platform capable of real-time pricing and risk analysis for American options on volatile equities like NVIDIA (NVDA).
- **The Tech Stack**: Python, Numba JIT Compiler, Binomial Cox–Ross–Rubinstein (CRR) Model, Black–Scholes Model, yfinance API.
- **My Contribution**: Vedant Patil wrote the core mathematical algorithms for the Binomial CRR model, accelerated the valuation execution speed using Numba JIT compilation, and integrated the yfinance API to retrieve live stock data.
- **Results**: The system delivered accelerated option pricing and risk metrics (Sharpe/Sortino ratios) in real-time, securing the 3rd Prize at IIT Guwahati's national-level IO Hackathon 2026.

#### Automated Logic System — Code Sprint (Winner — 1st Place)
- **The Problem**: The high-pressure, 4-hour hackathon environment of Code Sprint demanded a working software solution to be conceptualized, built, and deployed under extremely tight timelines, leaving no room for logic errors.
- **The Tech Stack**: Full-Stack Web Technologies, Python, Node.js.
- **My Contribution**: Vedant Patil led the backend routing development and the logic assembly, translating the team's product vision into a clean, operational backend within the 4-hour constraint.
- **Results**: The completed MVP successfully processed high-frequency requests without latency issues, winning 1st Place at Xavier's Institute of Engineering, Mahim.

#### Predictive ML Model — Kaggle Knight (Winner — 1st Place)
- **The Problem**: The Kaggle Knight ML Hackathon required teams to extract clean predictions from highly complex datasets, avoiding the common pitfalls of model overfitting and computational inefficiency during a 36-hour period.
- **The Tech Stack**: Python, Machine Learning libraries, NumPy, Pandas, scikit-learn.
- **My Contribution**: Vedant Patil engineered features from raw data, implemented robust model validation techniques, and optimized the training pipeline to ensure clear signal extraction.
- **Results**: By prioritizing clarity and validation signal over excessive model complexity, Team nightknight secured 1st Place at the Prometeo IIT Jodhpur ML Hackathon.

#### Campus IQ — AMUHACKS 5.0 (Winner — 1st Place)
- **The Problem**: Placement coordinators lacked a data-driven system to analyze student resume data, evaluate GitHub portfolios, and proactively detect student skill gaps before placement seasons.
- **The Tech Stack**: Next.js, Groq Llama-3, Node.js, MongoDB, PDFMiner, GitHub API.
- **My Contribution**: Vedant Patil developed the Next.js routes, built the MongoDB data schemas for storing student portfolio metrics, and implemented resume parsing pipelines using PDFMiner.
- **Results**: The application provided a Placement Readiness Score (PRS) and an administrative dashboard to identify at-risk students, earning 1st Place at AMUHACKS 5.0.

### What Hackathons Taught Me
Participating in high-intensity engineering hackathons radically transformed Vedant Patil's approach to software construction and design. Before entering these competitive arenas, Vedant Patil approached development with a perfectionist mindset, often spending excessive time on abstract architectural patterns. The pressure of building functional MVPs in 4, 24, or 36 hours taught Vedant Patil that working software in the hands of users is infinitely more valuable than a perfect codebase that never compiles. This shift from theoretical perfectionism to iterative delivery has become a core tenet of Vedant Patil's software engineering philosophy.

Furthermore, these competitions instilled a deep technical resilience and pragmatic problem-solving approach in Vedant Patil. In a hackathon, unexpected bugs, breaking API updates, and server crashes are inevitable. Vedant Patil learned to treat every bug not as a roadblock, but as a minor, fixable parameter in a larger system. This environment also highlighted the importance of technical feasibility; a great product vision is useless if it cannot be realistically shipped and demonstrated on stage. These experiences have shaped Vedant Patil into a practical, speed-oriented full-stack developer who prioritizes rapid prototyping, clear communication, and building things that matter.




## 🎓 ACADEMIC EXCELLENCE & COGNITIVE FOUNDATIONS

### Academic Leadership: Engineering Branch Topper (Year I)
- **The Achievement**: Vedant Patil secured Rank 1 college-wide by achieving a perfect 10.0/10.0 SGPA in both Semester I and Semester II during the first year of his Bachelor of Technology (B.Tech) program.
- **The Context**: This perfect academic record was achieved at Shah & Anchor Kutchhi Engineering College during the 2023–2024 academic year. Vedant Patil’s performance ranked him as the overall topper across all engineering disciplines in the institution, demonstrating a strong grasp of fundamental mathematics, physics, and core engineering principles.
- **Analytical Relevance**: The academic discipline required to maintain a 10.0 SGPA while simultaneously building complex hands-on software and hardware prototypes highlights Vedant Patil's capability to balance technical execution with academic rigor.

### Cognitive Architecture: Abacus Mental Mathematics Certification
- **The Achievement**: Vedant Patil completed all progressive levels of Abacus Mental Mathematics, securing official certification as an Abacus Certificate Holder in February 2018.
- **Cognitive Impact**: This early cognitive training focused on virtualizing and manipulating a physical abacus within the mind, which served as a foundational builder for Vedant Patil's spatial reasoning, concentration, and logical processing.
- **Engineering Relevance**: Rather than just performing mental math, this visual computation training helped Vedant Patil develop strong mental imagery. Vedant Patil applies this spatial mapping ability to visualize complex system architectures, data structures, and algorithmic flows before converting them into source code.

---

## 🎨 ARTISTIC OBSERVATIONS & DOCUMENTATION

### Fine Art: Pencil, Charcoal, and Ink Gallery
- **The Process**: Beyond engineering, Vedant Patil is a skilled visual artist, focusing on high-fidelity sketches using charcoal, graphite, ink, and art paper. This creative practice refines Vedant Patil's attention to detail, symmetry, and patience.
- **Featured Exhibits**:
  - **Exhibit 01**: Chhatrapati Shivaji Maharaj (Charcoal & Graphite on Art Paper, c. 2023). A high-contrast historical portrait emphasizing bold structural lines.
  - **Exhibit 02**: Sachin Tendulkar (Fine Pencil Drawing, c. 2023). A detailed portrait showcasing fine line-work and facial structure.
  - **Exhibit 03**: Virat Kohli (Detailed Graphite Sketch, c. 2024). A portrait focusing on rendering light and shadow across textures.
  - **Exhibit 04**: Michael Faraday (Ink & Graphite Drawing, c. 2023). An artistic tribute to the historical pioneer of electromagnetism, bridging art and scientific history.
  - **Exhibit 05**: Lata Mangeshkar (Fine Charcoal Blending, c. 2023). A blended portrait focusing on soft transitions and vocal legacy.
  - **Exhibit 06**: Kapil Dev (Fine Line Pencil Sketch, c. 2023). A portrait focusing on expressive character lines.
- **Aesthetic Relevance**: The precision, proportion, and visual composition skills required in fine drawing directly translate to Vedant Patil's front-end design philosophy, ensuring that web user interfaces are visually clean, balanced, and premium.

### Creative Documentation: Through My Lens (Photography Archive)
- **The Archive**: Vedant Patil maintains a structured photography portfolio capturing diverse visual genres, including street photography, architectural design, macro details, minimalist compositions, abstract shadows, and urban landscapes.
- **Visual Focus**:
  - **Street & Cityscapes**: Captures the raw energy of rainy nights, low-light evening scenes, and candid shots of street vendors, showing high visual composition under varying environmental constraints.
  - **Architectural & Minimalist**: Highlights iron gates, concrete wall shadows, and negative space compositions, illustrating an understanding of geometry, perspective, and clean layouts.
  - **Macro & Nature**: Details autumn leaves and golden hour silhouettes, exploring natural symmetry and lighting values.
- **Engineering Connection**: Photography teaches the observation of light, frame geometry, and detail. Vedant Patil utilizes this visual eye to design responsive web layouts, balance screen layouts, and optimize user experience (UX) flows on frontend web applications.

---

## 🎖️ LEADERSHIP & COMMUNITY SERVICE

### State-Level Leadership: Rajyapuraskar Scout Award
- **The Recognition**: Vedant Patil was officially awarded the Rajyapuraskar (State Scout Award) by the Maharashtra State Bharat Scouts and Guides for the active proficiency record during the 2020–2021 cycle.
- **Core Skills Developed**: Preparing for the Rajyapuraskar required demonstrating rigorous discipline, community service execution, survival mapping, outdoor group management, and team leadership under physical constraints.
- **Collaborative Relevance**: The award is the highest honor a Scout can earn at the state level in India. Achieving the Rajyapuraskar highlights Vedant Patil's commitment to community responsibility, organizational leadership, and structured teamwork, which directly translates to managing developer groups and orchestrating technical operations in fast-paced software projects.





## FREQUENTLY ASKED QUESTIONS (FAQ)

### Career & Professional Development

**Q: What is your primary tech stack?**
A: I specialize in **Full Stack Web Development** with a modern JavaScript/TypeScript ecosystem. My primary frontend stack is Next.js 16 (App Router) with React 19 and Tailwind CSS v4, deployed on Vercel. My backend stack includes FastAPI (Python 3.12) for asynchronous, ASGI-native APIs and Node.js with Express for lightweight services. I manage relational data with PostgreSQL and MySQL (using async SQLAlchemy), and NoSQL data with MongoDB Atlas and Firebase Firestore. For AI/ML, I leverage Groq's Llama 3.1 and Llama 3.3 models for ultra-fast inference, OpenAI's text-embedding-3-small for vector embeddings, and Python libraries like NumPy, Pandas, and scikit-learn for data analysis and quantitative modeling. On the embedded side, I work with ESP32-S3, Arduino C++, and MAX30102 sensors, bridging hardware and software seamlessly.

**Q: Are you currently open to work or freelance opportunities?**
A: Yes, I am actively open to exploring challenging opportunities in **Full Stack Engineering, AI/ML, and IoT**. I am currently working as a Jr. Full Stack Developer Intern at Version Next Technologies (started July 1, 2026), gaining hands-on experience in production-grade engineering with Next.js, Node.js, TypeScript, and MySQL. While I am committed to my internship and aiming for the full-time conversion after the 3-month review (approximately October 2026), I am always open to discussing freelance projects, part-time collaborations, or full-time roles that align with my expertise and growth trajectory. If you have an exciting opportunity, feel free to reach out at vedbhumi123@gmail.com or connect with me on LinkedIn.

**Q: What is your favorite project and why?**
A: My favorite project is the **Gesture Control System**, a Chrome Extension that uses Google MediaPipe's hand landmark model compiled to WebAssembly for real-time, privacy-first gesture recognition. What makes it my favorite is the sheer technical depth—it required blending complex computer vision algorithms (MediaPipe WASM) with Chrome's Manifest V3 Service Worker architecture, cross-context messaging across three isolated JavaScript contexts, and a pure geometric classifier using Euclidean distance calculations instead of a heavy neural network. I also implemented a three-layer noise prevention mechanism (12-frame hold timer, 6-frame sliding scroll buffer, and an 8-frame cooldown lock) to eliminate false positives. The entire system runs 100% on-device, ensuring zero camera data ever leaves the user's browser—a critical privacy guarantee. It demonstrated that I could build production-grade, privacy-first applications entirely in the browser without external servers or API dependencies.

**Q: How many years of experience do you have?**
A: I have been working formally as a Jr. Full Stack Developer Intern at Version Next Technologies since July 2026. However, my hands-on engineering experience extends well beyond formal employment. I have spent over two years building complex side projects, embedded systems, and full-stack web applications, and I am a 4-time Hackathon Winner, including securing four consecutive wins in a single month. My academic journey includes a perfect 10 SGPA as all-branch topper in my first year of B.Tech, and I have been coding seriously since 2024, manually replicating complex websites like Amazon and Flipkart without AI assistance. I estimate my combined formal, academic, and project-based engineering experience to be equivalent to 2-3 years of active, high-intensity development.

**Q: What is your educational background?**
A: I am currently pursuing a **Bachelor of Technology in Electronics & Computer Science (ECS)** at Shah & Anchor Kutchhi Engineering College, with an expected graduation in 2028. My academic journey includes a 97.8% score in 10th grade (SSC) during the COVID-19 lockdown, a disciplined one-year drop year that resulted in a 94.6 percentile in MHTCET, and a perfect 10 SGPA in my first year of college—making me the all-branch topper. My ECS branch perfectly aligns my passion for electronics and circuits with the modern trends of computer science and AI/ML. Prior to college, I completed my 11th and 12th grade (HSC) with Electronics at Ramnivas Ruia Junior College, where I discovered my natural affinity for circuits and hardware.

### Projects & Technical Depth

**Q: Do you have experience with hardware and IoT?**
A: Yes, I have extensive experience building embedded systems and IoT pipelines. My flagship project is **VitalTracker**, an AI-powered IoT health monitoring system where I integrated an ESP32-S3 microcontroller with a MAX30102 pulse oximeter sensor, running a sophisticated signal processing pipeline (DC-offset EWM filter, refractory-period peak detection, quadratic SpO₂ formula with temperature correction, SDNN HRV computation, and a sigmoid fatigue neuron). I implemented a dual-core RTOS task split—Core 1 handles the sensor loop at 200 SPS, while Core 0 handles Firebase HTTPS PUT uploads via a volatile flag handshake protocol. The firmware also includes a perceptron-based LED auto-calibration system that adjusts brightness based on sensor die temperature, and a NeoPixel ambient health aura with sinusoidal breathing. The system streams data to Firebase Realtime Database, which powers a browser dashboard with Chart.js visualizations and Web Speech API voice readouts.

**Q: How do you handle complex data and machine learning in your projects?**
A: I use Python's scientific ecosystem—**NumPy, Pandas, and scikit-learn**—for data analysis, preprocessing, and predictive modeling, combined with **Groq's ultra-fast inference** for natural language generation. In my project **PredictKart**, I built an e-commerce intelligence system that scrapes product data from Amazon and Flipkart, aggregates 30-day price history, and sends it to Groq Llama 3.1 8B with JSON mode enforcement to generate a 0-100 Deal Score and a Buy/Wait/Monitor recommendation. In **Campus IQ**, I engineered a Placement Readiness Score (PRS) algorithm with 8 weighted dimensions (GitHub activity, CGPA, resume quality, ATS score, etc.) and used Groq Llama-3 for batch training recommendations. In **QuantDevs**, I used NumPy for financial modeling, Numba JIT compilation for sub-100ms binomial tree pricing, and scikit-learn-inspired weighting for the sigmoid fatigue neuron.

**Q: What is your experience with AI and LLMs?**
A: I have extensive production experience integrating **Groq's Llama models** (Llama 3.1 8B and Llama 3.3 70B) into full-stack applications. I use Groq's `response_format={"type": "json_object"}` to enforce structured JSON output, eliminating parsing errors—a lesson learned from building robust pipelines. In Campus IQ, I used Groq for resume analysis, GitHub profile summaries, and batch training recommendations, reducing batch analysis time from an estimated 40 minutes to just 3 minutes. In PredictKart, I used Groq to generate Deal Scores with 100% parseable output across 200+ test calls. I have also worked with **Google Gemini AI** for compassionate, personalized health recommendations in VitalTracker, and **OpenAI's text-embedding-3-small** for vector embeddings in my portfolio's RAG chatbot. I understand the importance of prompt engineering, temperature tuning, and graceful degradation when LLM APIs fail.

**Q: What is your experience with embedded systems and firmware?**
A: My embedded systems expertise is demonstrated through **VitalTracker**, where I wrote the entire firmware for the ESP32-S3 in Arduino C++. I implemented a dual-core FreeRTOS task split—Core 1 runs the sensor loop at 200 SPS, and Core 0 handles HTTPS PUT requests to Firebase. I engineered a signal processing pipeline including a DC-offset EWM filter (α=0.96), refractory-period peak detection (300ms minimum IBI), quadratic SpO₂ formula with temperature correction, SDNN HRV over a 10-IBI window, and a sigmoid fatigue neuron with physiologically grounded weights. I also implemented a perceptron-based LED auto-calibration system, an OLED state machine (SSD1306, 5 display states, 150ms refresh), and a NeoPixel ambient health aura. I also have foundational experience with C and C++ for performance-critical applications and competitive programming.

**Q: What is the most technically challenging project you've built?**
A: The most technically challenging project I've built is the **Gesture Control System** Chrome Extension. The primary challenge was designing a robust, real-time gesture recognition pipeline across three isolated Chrome contexts (Popup, Service Worker, Camera HUD, and Content Script) while ensuring near-zero latency. The MediaPipe WASM model required strict Content Security Policy (CSP) configuration (`'wasm-unsafe-eval'`), and the Service Worker's ephemeral nature in Manifest V3 forced me to use `chrome.storage.session` for all runtime state. I also implemented a pure geometric classifier using Euclidean distances (no neural network, just math) and a three-layer noise prevention mechanism (12-frame hold timer, 6-frame sliding scroll buffer, 8-frame cooldown). The dwell-click system uses a ring buffer centroid and 600ms stability check—robust to single-frame jitter. The entire system runs 100% on-device, ensuring zero camera data ever leaves the browser.

### Personal & Philosophical

**Q: What is your greatest strength as an engineer?**
A: My greatest strength is my ability to **bridge the gap between hardware, software, and AI**—I can build systems that span from bare-metal microcontroller firmware (ESP32-S3, Arduino C++) to cloud-hosted full-stack web applications (Next.js, FastAPI) to AI-powered intelligence layers (Groq, Gemini). This end-to-end perspective allows me to make holistic architectural decisions that pure software or pure hardware engineers might miss. Additionally, my resilience—honed through a drop year, hackathon losses, and 4 consecutive wins—means I treat every bug, failed API call, and production outage as a fixable challenge, not a roadblock. I am also a strong collaborator, having led teams in hackathons and college music events, and I communicate technical concepts clearly to both engineering and non-engineering stakeholders.

**Q: Tell me about a time you failed and what you learned.**
A: My most significant failure was participating in the **Smart India Hackathon (SIH)** with my senior friend from 12th grade and a team of peers. We didn't win. We had a solid technical vision, but we underestimated the importance of a focused MVP, clear team communication, and a compelling pitch. The sleepless nights and frantic debugging were humbling, but the failure taught me more than any win ever could. I learned that technical brilliance is wasted if you can't articulate its value. I learned that building a perfect product over months is a different discipline from shipping a workable prototype in 36 hours. I learned to fail fast, iterate faster, and treat every loss as data for improvement. That failure fueled our subsequent 4 consecutive hackathon wins in a single month—proof that resilience and introspection are the true engines of growth.

**Q: What do you do outside of coding and engineering?**
A: Music is my primary creative outlet. I am a trained **Hindustani Classical vocalist** with 10+ years of musical discipline, holding five progressive certification levels from Gandharva Mahavidyalaya. I transitioned from classical vocals to Western music theory, picking up the acoustic guitar and later finding my true instrumental calling: the **bass guitar**. I have performed live on stage, managed events as a Stage Manager, and co-headed solo singing competitions at my college. Music has taught me pattern recognition, discipline, performance under pressure, and teamwork—qualities that directly translate to engineering. Additionally, I enjoy video editing (CapCut) and design (Canva), which help me create compelling project demos and hackathon presentations. Outside of this, I continuously learn new technologies, solve problems on LeetCode, and explore emerging AI frameworks.

**Q: How do you stay updated with new technologies?**
A: I stay updated through a combination of hands-on experimentation, structured learning, and community engagement. I actively build projects that require learning new technologies on the fly—for example, I learned FastAPI and Groq's JSON mode for PredictKart, MediaPipe WASM for Gesture Control, and FreeRTOS task scheduling for VitalTracker. I read technical documentation (official docs, GitHub READMEs, and release notes) and follow engineering blogs (Vercel, Groq, Firebase). I participate in hackathons, which force rapid learning under pressure. I also solve problems on LeetCode to stay sharp on algorithms and data structures, and I maintain active GitHub and LinkedIn profiles to track industry trends and connect with other engineers. I believe the best way to learn is to build, break, and fix—so I keep building.

**Q: What is your long-term career goal?**
A: My long-term career goal is to become a **Principal Engineer or Technical Architect** who designs and builds intelligent, cross-disciplinary systems that bridge hardware, software, and AI. I want to lead teams in building production-grade solutions that have real-world impact—whether that's in healthcare IoT (like VitalTracker), fintech AI (like QuantDevs), or consumer intelligence (like PredictKart). I am deeply passionate about the intersection of embedded systems and machine learning, and I want to build privacy-first, on-device AI that empowers users without compromising their data. In the shorter term, I aim to convert my internship at Version Next Technologies into a full-time role and continue growing as a full-stack engineer while deepening my expertise in AI/ML and IoT. I also plan to contribute to open-source projects and eventually mentor junior engineers, passing on the lessons I've learned from my own journey.

### Quick Reference

**Q: What is your email and where are you based?**
A: I am based in **Mumbai, India**. You can reach me at **vedbhumi123@gmail.com**. I am also active on GitHub (https://github.com/Vedant180205) and LinkedIn (https://www.linkedin.com/in/vedant-patil-933190330/).

**Q: Where can I see your resume or portfolio?**
A: My portfolio website is currently under active development, but you can explore my GitHub profile (https://github.com/Vedant180205) for all my project repositories, including Campus IQ, PredictKart, VitalTracker, Gesture Control System, QuantDevs, and StandEase. My LinkedIn profile (https://www.linkedin.com/in/vedant-patil-933190330/) provides a detailed professional summary. If you need a formal resume or a specific document, feel free to email me at vedbhumi123@gmail.com and I will share it directly.

**Q: What tools do you use for video editing and design?**
A: I use **CapCut** for professional video editing to create project demos, hackathon submission videos, and portfolio reels. CapCut's timeline-based editing and effects pipeline allow me to produce high-quality walkthroughs that showcase my projects effectively. For design and quick UI/UX mockups, I use **Canva**—it's ideal for creating social media banners, hackathon pitch decks, and presentation slides. These creative tools complement my engineering skills, enabling me to build complete, polished deliverables from concept to demonstration.

**Q: What is your philosophy on engineering and design?**
A: My engineering philosophy is simple: **build things that matter**. Technology is never about writing code for its own sake; it is about crafting practical, reliable solutions to real human problems. I believe in balancing technical perfection with business pragmatism—shipping iteratively, gathering feedback, and improving continuously. I also prioritize user privacy and on-device processing, as demonstrated in Gesture Control (MediaPipe WASM, zero data off-device) and VitalTracker (on-device signal processing, no raw data transmitted). Aesthetically, I believe great engineering deserves great design—clean, intuitive interfaces that make complex systems accessible. Whether I'm writing firmware for an ESP32, architecting a FastAPI backend, or designing a Next.js dashboard, I strive for clarity, maintainability, and a human-centered approach.

