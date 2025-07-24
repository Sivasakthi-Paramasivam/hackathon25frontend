# ShopHub - Modern E-commerce Frontend

A modern, responsive e-commerce web application built with React + TypeScript, featuring a Flipkart-inspired design with performance optimizations.

## 🚀 Features

### Core Features
- **Homepage**: Hero carousel with 3 rotating banners, featured categories, and call-to-action sections
- **Product Listing**: Paginated product display with search, filtering, and sorting
- **Product Details**: Comprehensive product pages with images, descriptions, specifications, and features
- **Shopping Cart**: Interactive cart drawer with quantity management
- **Responsive Design**: Mobile-first approach that works on all screen sizes

### Performance Optimizations
- **Image Lazy Loading**: All images use `loading="lazy"` for better performance
- **Caching Strategy**: API responses are cached for 5 minutes to reduce server load
- **Code Splitting**: Vite configuration with manual chunks for vendor, MUI, and Redux
- **Optimized Build**: Production build with source maps and tree shaking

### UI/UX Features
- **Modern Design**: Clean, modern interface inspired by Flipkart
- **Material-UI**: Consistent design system with custom theming
- **Smooth Animations**: CSS animations and transitions for better user experience
- **Accessibility**: Proper focus management and semantic HTML

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 5.4.0
- **UI Library**: Material-UI (MUI) 7.2.0
- **State Management**: Redux Toolkit 2.8.2 + React Redux 9.2.0
- **Routing**: React Router DOM 7.7.0
- **HTTP Client**: Axios 1.10.0
- **Performance**: React Intersection Observer, React Content Loader

## 📁 Project Structure

```
ecommerce-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx      # Navigation header with search
│   │   ├── Footer.tsx      # Site footer with links
│   │   ├── HeroCarousel.tsx # Hero banner carousel
│   │   └── CartDrawer.tsx  # Shopping cart drawer
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── ProductListPage.tsx # Product catalog
│   │   └── ProductDetailPage.tsx # Individual product page
│   ├── store/              # Redux store configuration
│   │   ├── index.ts        # Store setup
│   │   └── slices/         # Redux slices
│   │       ├── productSlice.ts
│   │       ├── cartSlice.ts
│   │       ├── categorySlice.ts
│   │       └── uiSlice.ts
│   ├── services/           # API services
│   │   └── api.ts         # API client with caching
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run lighthouse` - Run Lighthouse performance audit

## 🔧 Configuration

### Backend API
The application is configured to connect to a backend API running on `http://localhost:8000`. Update the `API_BASE_URL` in `src/services/api.ts` if your backend runs on a different port.

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=ShopHub
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 600px
- **Tablet**: 600px - 960px  
- **Desktop**: > 960px

## 🎨 Design System

### Colors
- **Primary**: #1976d2 (Blue)
- **Secondary**: #dc004e (Pink)
- **Success**: #2e7d32 (Green)
- **Error**: #d32f2f (Red)

### Typography
- **Font Family**: Roboto
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: 12px border radius, subtle shadows
- **Buttons**: 8px border radius, no text transform
- **Spacing**: Consistent 8px grid system

## 🔍 Performance Metrics

The application is optimized for the following Lighthouse metrics:
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Overall Performance Score**: > 90

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 📦 Build for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   The build output is in the `build/` directory and can be deployed to any static hosting service.

## 🔗 API Integration

The frontend integrates with the following backend endpoints:
- `GET /products` - Get paginated products
- `GET /products/{id}` - Get single product
- `GET /products/search` - Search products
- `GET /categories` - Get product categories
- `GET /health-stats` - Get system health

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using React + TypeScript + Material-UI** 