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

# Create .env file with placeholder values for build time
RUN echo "DEEPSEEK_API_KEY=placeholder_for_build_only" > .env && \
    echo "GEMINI_API_KEY=placeholder_for_build_only" >> .env && \
    echo "CLERK_SECRET_KEY=placeholder_for_build_only" >> .env && \
    echo "PUBLIC_CLERK_PUBLISHABLE_KEY=placeholder_for_build_only" >> .env

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (these will be overridden by runtime environment variables)
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Start the application
CMD ["node", "build"] 