# ⚡ Vedant Patil's Portfolio & Secure Dossier Archive

A premium, interactive, and responsive portfolio website built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**. It integrates modern, visually rich aesthetics (glassmorphism, micro-animations, color gradients) and a fully immersive, classified espionage-themed **Dossier System** at `/dossier`.

---

## 🚀 Key Highlights & Interactive Features

### 🖥️ Core Portfolio Sections
*   **Hero Grid**: Dark-mode terminal interface displaying a modern introductory grid.
*   **Intel Brief (About)**: Detailed summary of engineering principles, tools, and background.
*   **Mission Logs (Projects)**: Clean card decks presenting engineering endeavors, machine learning algorithms, and system designs.
*   **Toolkit (Tech Stack)**: Comprehensive flat icon grid highlighting core languages (Python, TypeScript, C++, C), web frameworks (Next.js, React, Node.js, Flask, Express), data science tools (NumPy, Pandas, scikit-learn), and embedded hardware (Raspberry Pi, Arduino).
*   **Academic Pathway (Education)**: Custom vertical timeline displaying schooling milestones with interactive scroll reveals and animated spine ticks.
*   **Theme Switcher**: Tactile pull-cord cord toggle with volume-faded audio feedback and localStorage persistence.

### 📁 The Decrypted Dossier (`/dossier`)
A highly engaging, themed command center archiving multidisciplinary achievements:
1.  **SYS_INIT Decryptor Terminal**: Immersive initial loading terminal simulating network handshakes and decryption key authorization with a bypass protocol.
2.  **Section 01 // The Musician**: Interactive classical/western vocalist briefing. Features an HTML5 Canvas-driven sine wave generator generating overlapping floating audio frequencies and floating notation overlays.
3.  **Section 02 // Mission Logs**: Classified pin-board visualizing hackathon achievements. Renders a glowing red thread network connection map. Hovering on nodes generates live technical briefs on a simulated terminal console, and clicking decrypts certificate evidence:
    *   `LOG-01`: **IO Hackathon 2026** (IIT Guwahati & AQUA option pricing systems using Numba JIT).
    *   `LOG-02`: **Code Sprint** (XIE Mahim 1st Place win under Team CodeRunners).
    *   `LOG-03`: **Kaggle Knight** (IIT Jodhpur 36-Hour ML Hackathon under Team nightknight).
    *   `LOG-04`: **AMUHACKS 5.0** (Aligarh Muslim University 1st Place win under Team CyberDevs).
4.  **Section 03 // The Artist**: Multi-sensory layout shifting from pure dark mode to warm gallery off-white (`#efece5`) on scroll. Displays charcoal sketches framed in 3D walnut/mahogany wooden borders, brass hanging nails, support cables, and interactive spotlight halos on hover.
5.  **Section 04 // Through My Lens**: Minimalist, asymmetric 3-column masonry photography collage. Bypasses standard Next.js downsizers to preserve original image aspect ratios, lens specifications (EXIF focal lengths, exposures), and pixel-perfect quality.
6.  **Section 05 // The Human Calculator**: Fast-paced binary number generator grids and an interactive virtual abacus representing mathematical calculation speed, memory visualization, and focus metrics.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Library**: [React 19](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: Pure CSS Modules (scoped layouts, custom CSS custom properties for transitions)
*   **Linter**: [ESLint 9](https://eslint.org/) (Conforms to strict standard rule declarations)

---

## 📁 Repository Structure

```
vedant-portfolio/
├── app/
│   ├── components/       # Reusable components
│   │   ├── About.tsx     # Profile summary cards
│   │   ├── Education.tsx # Interactive schooling timeline
│   │   ├── Footer.tsx    # Ending signature and links
│   │   ├── Hero.tsx      # Landing page terminal introduction
│   │   ├── Navbar.tsx    # Responsive header with synchronized paths
│   │   ├── Projects.tsx  # Project showcase cards
│   │   ├── TechStack.tsx # toolkit icon grid
│   │   └── ThemeToggle.tsx # Sound-faded pull-cord cord light switcher
│   ├── dossier/          # Espionage-themed dossier system
│   │   ├── page.tsx      # Main dossier code
│   │   └── page.module.css # Stylesheet with layout transitions
│   ├── globals.css       # Global rules & custom HSL root variables
│   ├── layout.tsx        # HTML document layout structure
│   └── page.tsx          # Main entry route
└── public/               # Optimized assets (certificates, sketches, photography)
```

---

## 🚀 Local Installation & Execution

### Prerequisites
*   Node.js 18.0.0 or higher
*   npm 10.0.0 or higher

### Steps
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Vedant180205/portfolio_self.git
    cd portfolio_self
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4.  **Static Build & Verification**
    To test the production bundles and verify type safety:
    ```bash
    npx tsc --noEmit
    npm run build
    ```

5.  **Code Styling Check**
    To run ESLint checking tools:
    ```bash
    npm run lint
    ```

---

## 📄 License

This project is licensed under the MIT License. Feel free to use it as inspiration for your own portfolio builds.
