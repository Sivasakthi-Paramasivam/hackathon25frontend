#!/bin/bash

# Frontend Deployment Script
echo "Starting frontend deployment..."

# Stop existing containers
echo "Stopping existing containers..."
docker-compose down

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Build new image
echo "Building new Docker image..."
docker-compose build --no-cache

# Start containers
echo "Starting containers..."
docker-compose up -d

# Clean up unused images
echo "Cleaning up unused images..."
docker system prune -f

# Check container status
echo "Checking container status..."
docker-compose ps

echo "Frontend deployment completed!" 