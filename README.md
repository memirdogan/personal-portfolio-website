# 🌟 Musa Emir Doğan - Personal Portfolio Website

> Modern, responsive, and SEO-optimized personal portfolio website built with React, TypeScript, and Tailwind CSS.

[![Live](https://img.shields.io/badge/Live-blue?style=for-the-badge&logo=vercel)](https://memir.codes)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=github)](https://github.com/memirdogan/personal-portfolio-website)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mudogan)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [SEO Optimization](#seo-optimization)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About

This is the personal portfolio website of **Musa Emir Doğan**, a Jr. Cloud & Platform Engineer at Sufle with AWS certification. The website showcases professional experience, skills, projects, and achievements in cloud computing, DevOps, and software development.

### 🚀 Live Website
Visit the live website: **[memir.codes](https://memir.codes)**

## ✨ Features

### 🎨 Design & UX
- **Modern Dark Theme**: Sleek, professional dark mode design
- **Responsive Layout**: Optimized for all device sizes (mobile, tablet, desktop)
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Interactive Elements**: Hover effects, scroll animations, and micro-interactions

### 🌐 Internationalization
- **Dual Language Support**: Turkish and English language switching
- **Context-based Translation**: React Context API for state management
- **LocalStorage Persistence**: Language preference saved locally

### 🔍 SEO Optimization
- **Advanced JSON-LD**: Comprehensive structured data for search engines
- **Meta Tags**: Optimized Open Graph, Twitter Cards, and meta descriptions
- **Sitemap & Robots.txt**: Proper search engine indexing
- **Performance Optimized**: Fast loading with preload and prefetch strategies

### 📱 Progressive Web App (PWA)
- **Web App Manifest**: Add to home screen functionality
- **Optimized Icons**: Various sizes for different devices
- **Offline Ready**: Service worker implementation ready

### 🎪 Interactive Sections
- **Hero Section**: Professional introduction with animated profile
- **About Me**: Personal story and GitHub integration
- **Professional Experience**: Detailed work history with animations
- **Skills**: Categorized technical skills with modern design
- **Projects Portfolio**: Showcase of personal and professional projects
- **Leadership & Community**: Community involvement and leadership roles
- **Education**: Academic background and certifications
- **Publications**: Articles and content contributions
- **Contact**: Multiple ways to get in touch

### 🏢 Brand Showcase
- **Animated Brand Line**: Continuous scrolling logos of companies and certifications
- **Company Logos**: Sufle, AWS, RenaByte, GDSC, T3 AI, 42 School

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Animation & Effects
- **Framer Motion** - Production-ready motion library for React
- **React Intersection Observer** - Scroll-triggered animations
- **CSS Transforms** - Hardware-accelerated animations

### Icons & Assets
- **React Icons** - Popular icon libraries (Feather Icons, etc.)
- **WebP Images** - Optimized image format for better performance
- **Custom SVG Icons** - Scalable vector graphics

### Development Tools
- **ESLint** - Code linting for consistent code style
- **PostCSS** - CSS processing with autoprefixer
- **Git** - Version control system

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/memirdogan/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
personal-website/
├── public/                     # Static assets
│   ├── brands/                # Company and certification logos
│   ├── leadership-community/  # Community involvement images
│   ├── pp/                    # Profile pictures
│   ├── projects/             # Project screenshots
│   ├── resume/               # Resume files
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt           # Search engine directives
│   ├── sitemap.xml          # Site structure for SEO
│   └── projects-schema.json # Structured data for projects
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── sections/        # Page sections (Hero, About, etc.)
│   ├── contexts/            # React contexts (Language)
│   ├── styles/              # CSS files
│   ├── App.tsx              # Main application component
│   └── main.tsx            # Application entry point
├── index.html              # HTML template with SEO meta tags
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md            # Project documentation
```

## 🔍 SEO Optimization

This website implements advanced SEO techniques for maximum search engine visibility:

### Structured Data (JSON-LD)
- **Person Schema**: Professional information and credentials
- **WebSite Schema**: Site metadata and search functionality
- **BreadcrumbList**: Navigation structure
- **SoftwareApplication**: Project portfolio items

### Meta Tags
- **Open Graph**: Facebook and social media optimization
- **Twitter Cards**: Twitter sharing optimization
- **Geo Tags**: Location-based SEO for Istanbul, Turkey
- **Robot Directives**: Search engine crawling instructions

### Performance
- **WebP Images**: Modern image format for faster loading
- **Lazy Loading**: Images load when needed
- **Preload/Prefetch**: Critical resource optimization
- **DNS Prefetch**: External domain optimization

## ⚡ Performance

### Optimization Techniques
- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: WebP format with fallbacks
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Bundle Optimization**: Vite's built-in optimizations

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Optimized with preload hints
- **FID (First Input Delay)**: Minimal JavaScript on initial load
- **CLS (Cumulative Layout Shift)**: Stable layout with proper sizing

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (Recommended) - Zero-config deployment with GitHub integration
- **Netlify** - JAMstack deployment with form handling
- **GitHub Pages** - Free static site hosting
- **AWS S3 + CloudFront** - Scalable cloud deployment

### Deployment Steps (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Deploy automatically on every push to main branch

### Environment Variables
No environment variables required for basic deployment.

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Adding New Sections
1. Create a new component in `src/components/sections/`
2. Add translation keys in `src/contexts/LanguageContext.tsx`
3. Import and use in `src/App.tsx`

### Updating Content
- **Personal Info**: Edit `src/contexts/LanguageContext.tsx`
- **Images**: Replace files in `public/` directories
- **Resume**: Update files in `public/resume/`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow the existing code style
2. Add TypeScript types for new features
3. Update translations for both languages
4. Test responsive design on multiple devices
5. Ensure accessibility standards are met

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Musa Emir Doğan**
- **Website**: [memir.codes](https://memir.codes)
- **Email**: [contact@memir.codes](mailto:contact@memir.codes)
- **LinkedIn**: [linkedin.com/in/mudogan](https://linkedin.com/in/mudogan)
- **GitHub**: [github.com/memirdogan](https://github.com/memirdogan)

---

### 🌟 Show Your Support

If you found this project helpful, please give it a ⭐️ on GitHub!

### 🔗 Related Projects

- **[Sunoa E-Commerce](https://github.com/memirdogan/sunoa-ecommerce-website)** - Modern e-commerce platform
- **[RenaByte Platform](https://renabyte.com)** - Healthcare technology project
- **[Terraform Architecture](https://github.com/memirdogan/Terraform-Architecture-deploy)** - Cloud infrastructure design

---