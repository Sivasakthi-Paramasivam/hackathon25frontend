# E-commerce Frontend

A modern React + TypeScript e-commerce frontend application with Flipkart-inspired design.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Deployment

### Prerequisites
- Docker and Docker Compose installed
- Backend API running on port 8000

### Local Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

### Production Deployment

1. **Clone the repository on your server:**
```bash
git clone <your-frontend-repo-url>
cd hackathon25frontend
```

2. **Set up environment variables:**
```bash
cp env.production .env.production
# Edit .env.production with your production settings
```

3. **Deploy using the deployment script:**
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Configuration

### Environment Variables

Create `.env.production` file:
```env
NODE_ENV=production
VITE_API_BASE_URL=http://localhost:8000
```

### Nginx Configuration

The application includes several nginx configurations:

1. **`nginx.conf`** - Standalone frontend nginx config
2. **`nginx-reverse-proxy.conf`** - Reverse proxy for both frontend and backend

#### Setting up Reverse Proxy

1. Copy the reverse proxy config:
```bash
sudo cp nginx-reverse-proxy.conf /etc/nginx/sites-available/hackathon25
```

2. Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/hackathon25 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

3. Update your domain in the config file:
```nginx
server_name your-domain.com;  # Replace with your actual domain
```

## 🔄 CI/CD Pipeline

### GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Builds the application
2. Runs tests
3. Deploys to your server via SSH

### Required Secrets

Set up these secrets in your GitHub repository:

- `HOST`: Your server IP address
- `USERNAME`: SSH username
- `SSH_KEY`: Private SSH key
- `PORT`: SSH port (usually 22)

## 🌐 Network Architecture

### Production Setup

```
Internet → Nginx Reverse Proxy → Frontend (port 3000) + Backend (port 8000)
```

### Communication Flow

1. **Frontend → Backend**: Uses `localhost:8000` (private IP communication)
2. **Public Access**: Through nginx reverse proxy with path-based routing:
   - `/` → Frontend application
   - `/api/*` → Backend API

### Path-based Routing

- **Frontend**: `https://your-domain.com/`
- **Backend API**: `https://your-domain.com/api/`
- **Health Checks**: 
  - Frontend: `https://your-domain.com/health`
  - Backend: `https://your-domain.com/api/health`

## 📁 Project Structure

```
hackathon25frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── store/         # Redux store
│   ├── types/         # TypeScript types
│   └── assets/        # Static assets
├── public/            # Public assets
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose setup
├── nginx.conf         # Frontend nginx config
├── nginx-reverse-proxy.conf # Reverse proxy config
├── deploy.sh          # Deployment script
└── .github/workflows/ # CI/CD workflows
```

## 🔍 Monitoring & Health Checks

### Health Check Endpoints

- **Frontend**: `http://localhost:3000/health`
- **Backend**: `http://localhost:8000/health`

### Logs

```bash
# Frontend logs
docker-compose logs frontend

# Nginx logs
docker exec hackathon25frontend tail -f /var/log/nginx/access.log
docker exec hackathon25frontend tail -f /var/log/nginx/error.log
```

## 🛠️ Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are installed
2. **API connection fails**: Check if backend is running on port 8000
3. **Nginx errors**: Verify configuration syntax with `nginx -t`

### Performance Optimization

The application includes:
- Code splitting and lazy loading
- Optimized bundle splitting
- Gzip compression
- Static asset caching
- Minified production builds

## 📝 License

This project is licensed under the MIT License. 