# Use Node.js as the base image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

RUN echo "DEEPSEEK_API_KEY=placeholder_for_build_only" > .env && \
    echo "GEMINI_API_KEY=placeholder_for_build_only" >> .env && \
    echo "ADMIN_PW=placeholder_for_build_only" >> .env && \
    echo "OLLAMA_CONNECTION_STRING=place_holder" >> .env

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (these will be overridden by runtime environment variables)
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["node", "build"] 