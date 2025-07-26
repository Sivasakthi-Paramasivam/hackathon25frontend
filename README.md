# Hackathon25 Frontend

A modern React-based e-commerce frontend application built with TypeScript, Vite, and Material-UI.

## Features

- 🛍️ Product listing with search and filtering
- 📱 Responsive design for all devices
- 🎨 Modern UI with Material-UI components
- ⚡ Fast performance with Vite
- 🔄 Real-time API integration
- 🚀 Production-ready deployment

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **HTTP Client**: Axios
- **Containerization**: Docker
- **Web Server**: Nginx

## Prerequisites

- Node.js 22.17.0 or higher
- Docker and Docker Compose
- Git

## Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackathon25frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Docker Deployment

### Using Docker Compose

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api

### Manual Docker Build

1. **Build the Docker image**
   ```bash
   docker build -t hackathon25frontend .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 hackathon25frontend
   ```

## Production Deployment

### Server Setup

1. **Clone the repository on your server**
   ```bash
   git clone <repository-url>
   cd hackathon25frontend
   ```

2. **Make the deployment script executable**
   ```bash
   chmod +x deploy.sh
   ```

3. **Run the deployment script**
   ```bash
   ./deploy.sh
   ```

### GitHub Actions Deployment

The repository includes a GitHub Actions workflow that automatically deploys to your server when changes are pushed to the main branch.

**Required Secrets:**
- `HOST`: Your server's IP address
- `USERNAME`: SSH username
- `SSH_KEY`: Private SSH key for server access
- `PORT`: SSH port (usually 22)

### Nginx Configuration

The application includes two nginx configurations:

1. **`nginx.conf`**: For standalone frontend deployment
2. **`nginx-reverse-proxy.conf`**: For reverse proxy setup with backend

For production deployment with both frontend and backend:

```bash
# Copy the reverse proxy configuration
sudo cp nginx-reverse-proxy.conf /etc/nginx/nginx.conf

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## API Configuration

The frontend communicates with the backend using the private IP address since they're hosted on the same server. The API base URL is configured in `src/services/api.ts`.

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8000/api
NODE_ENV=production
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run test`: Run tests
- `npm run lint`: Run ESLint

## Project Structure

```
hackathon25frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── store/         # Redux store
│   ├── types/         # TypeScript types
│   └── theme/         # MUI theme configuration
├── public/            # Static assets
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf         # Nginx configuration
└── deploy.sh          # Deployment script
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   # Kill the process
   kill -9 <PID>
   ```

2. **Docker build fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   # Rebuild
   docker-compose build --no-cache
   ```

3. **Nginx configuration errors**
   ```bash
   # Test nginx configuration
   sudo nginx -t
   # Check nginx logs
   sudo tail -f /var/log/nginx/error.log
   ```

## Support

For issues and questions, please create an issue in the repository or contact the development team.

## License

This project is licensed under the MIT License. 