# Vedant's Portfolio

A modern, responsive personal portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**.

## ✨ Features

- **Hero** section with animated introduction
- **About** section highlighting skills and background
- **Projects** showcase with live demo & GitHub links
- **Dark / Light mode** toggle
- Fully responsive across all screen sizes
- CSS Modules for scoped, maintainable styling

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- CSS Modules — Component-scoped styles

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vedant-portfolio.git
cd vedant-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
vedant-portfolio/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── globals.css       # Global styles & CSS variables
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
└── public/               # Static assets (images, SVGs)
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

This site is optimized for deployment on **Vercel**:

1. Push this repo to GitHub
2. Import it on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and deploys instantly

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio!
