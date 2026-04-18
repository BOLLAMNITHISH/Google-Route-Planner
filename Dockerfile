# Stage 1: Build the React client
FROM node:20-alpine AS build-client
WORKDIR /app/client
COPY client/package*.json ./
# Install dependencies (using legacy-peer-deps due to React 19 routing conflicts check)
RUN npm install --legacy-peer-deps
COPY client/ ./
RUN npm run build

# Stage 2: Configure the Express server
FROM node:20-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --omit=dev
COPY server/ ./

# Copy built frontend assets so the backend can serve them natively
# (We preserve the relative path so express.static finds them exactly at ../client/dist)
COPY --from=build-client /app/client/dist /app/client/dist

# Expose standard Cloud Run port
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Start application using package.json script
CMD ["npm", "start"]
