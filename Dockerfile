FROM node:20-alpine

WORKDIR /app

# Copy source code
COPY . .

ARG VITE_ALBY_ID
ARG VITE_REDIRECT_URL
ARG VITE_SERVER_URL

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd server && npm install

# Build the client (this creates the /app/public directory)
# Note: In development mode, the client dev server runs separately
ARG BUILD_ENV=production
RUN if [ "$BUILD_ENV" = "production" ]; then npm run build; fi

# Set environment variables
ENV NODE_ENV=production

# Expose the server port
EXPOSE 3000

# Command to run the application in production
CMD ["npm", "start"]