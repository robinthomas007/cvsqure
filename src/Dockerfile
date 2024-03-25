# Use Node.js base image
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build



# Expose port 80
EXPOSE 80

# Command to run NGINX
CMD ["npm", "start"]
