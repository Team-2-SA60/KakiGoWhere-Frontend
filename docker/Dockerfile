# ====== Stage 1: Build the React application ======
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ====== Stage 2: Serve the built application with Nginx ======
FROM nginx:stable-alpine AS production

# Copy the built application from the build stage to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]