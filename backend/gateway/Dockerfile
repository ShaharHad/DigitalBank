FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 8000

COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

ENTRYPOINT ["/wait-for-mysql.sh"]

CMD [ "npm", "start" ]