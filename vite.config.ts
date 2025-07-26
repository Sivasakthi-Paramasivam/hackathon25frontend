import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://34.93.69.206', // your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: false, // Disable sourcemaps for smaller bundle
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Multiple passes for better compression
        toplevel: true, // Remove unused top-level functions
        unsafe: true, // Enable unsafe optimizations
        unsafe_comps: true, // Optimize comparisons
        unsafe_Function: true, // Optimize Function constructor
        unsafe_math: true, // Optimize math expressions
        unsafe_methods: true, // Optimize method calls
        unsafe_proto: true, // Optimize prototype access
        unsafe_regexp: true, // Optimize regexp
        unsafe_undefined: true, // Optimize undefined checks
      },
      mangle: {
        toplevel: true, // Mangle top-level names
        safari10: true, // Safari 10 compatibility
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-core': ['react', 'react-dom'],
          // MUI core components with all dependencies included
          'mui-core': [
            '@mui/material', 
            '@mui/material/styles', 
            '@mui/material/CssBaseline', 
            '@mui/system',
            '@mui/utils',
            '@emotion/react', 
            '@emotion/styled'
          ],
          // MUI icons (separate chunk for better caching)
          'mui-icons': ['@mui/icons-material'],
          // Redux toolkit
          'redux-core': ['@reduxjs/toolkit', 'react-redux'],
          // Router
          'router': ['react-router-dom'],
          // HTTP client
          'http-client': ['axios'],
          // Utility libraries
          'utils': ['react-intersection-observer', 'react-content-loader'],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      // External dependencies that should not be bundled
      external: [],
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Target modern browsers for smaller bundles
    target: 'es2015',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/material/styles',
      '@mui/material/CssBaseline',
      '@mui/system',
      '@mui/utils',
      '@mui/icons-material',
      '@reduxjs/toolkit',
      'react-redux',
      'react-router-dom',
      'axios',
      '@emotion/react',
      '@emotion/styled',
    ],
    exclude: ['react-content-loader'], // Exclude from pre-bundling
  },
  // Remove development code in production
  define: {
    __DEV__: false,
  },
  // Enable esbuild for faster builds
  esbuild: {
    drop: ['console', 'debugger'], // Remove console and debugger in production
    legalComments: 'none', // Remove legal comments
  },
}) 