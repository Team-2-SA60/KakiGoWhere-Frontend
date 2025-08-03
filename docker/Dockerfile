# ====== Stage 1: Build the React application ======
FROM node:20-alpine AS build

# Env
ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=$VITE_API_URL

# Change directory
WORKDIR /app

# Copy dependency requirements
COPY package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy app files
COPY . .

# Build react app
RUN npm run build

# ====== Stage 2: Serve the built application with Nginx ======
FROM nginx:stable-alpine AS production

# Replace nginx default config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application from the build stage to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]