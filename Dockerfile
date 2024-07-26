FROM node:20.15.0
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["node" "index.js"]
