FROM node:14-slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the bot will listen on
EXPOSE 3000

CMD ["node", "main.js"]