# Specify the base image 
FROM node:latest as builder

# Create a working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY ./ ./

# Build the app
RUN npm run build


# Runtime stage
FROM nginx

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]