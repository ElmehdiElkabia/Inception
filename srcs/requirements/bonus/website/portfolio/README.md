# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features a clean design with smooth animations and interactive UI components.

## 🚀 Features

- **Modern React Architecture** - Built with React 19 and modern hooks
- **Responsive Design** - Fully responsive across all devices
- **Tailwind CSS** - Beautiful styling with utility-first CSS framework
- **Component Library** - Integrated with shadcn/ui components
- **Routing** - Client-side routing with React Router
- **Animations** - Smooth animations with Tailwind CSS animate
- **Icons** - Lucide React icons for consistent iconography
- **Toast Notifications** - User feedback with toast and sonner components
- **Tooltips** - Interactive tooltips for enhanced UX

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ElmehdiElkabia/portfolio
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── About.jsx       # About section
│   ├── Contact.jsx     # Contact form
│   ├── Footer.jsx      # Site footer
│   ├── Hero.jsx        # Hero section
│   ├── Navbar.jsx      # Navigation bar
│   ├── Projects.jsx    # Projects showcase
│   └── Skills.jsx      # Skills section
├── pages/              # Page components
│   ├── Index.jsx       # Home page
│   └── NotFound.jsx    # 404 page
├── lib/                # Utility functions
│   └── utils.js        # Helper utilities
├── assets/             # Static assets
└── App.jsx             # Main app component
```

## 🎨 Customization

### Adding New Components
```bash
npx shadcn@latest add [component-name]
```

### Styling
The project uses Tailwind CSS. Customize the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
      fontFamily: {
        // Your custom fonts
      },
    },
  },
}
```

### Content
Update the following files to customize your portfolio:
- `src/components/Hero.jsx` - Personal introduction
- `src/components/About.jsx` - About section
- `src/components/Projects.jsx` - Your projects
- `src/components/Skills.jsx` - Your skills
- `src/components/Contact.jsx` - Contact information

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Run `npm run build`
2. Drag and drop the `dist` folder to Netlify

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run build && npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons

---

Made with ❤️ by [ELmehdi ELkabia](https://github.com/ELmehdiElkabia)
