FROM node:latest

ENV NODE_ENV=production

WORKDIR /bot

COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

COPY . .

CMD ["node", "main.js"] 
