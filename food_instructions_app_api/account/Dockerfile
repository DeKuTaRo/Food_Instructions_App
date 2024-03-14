FROM node

WORKDIR /app/account

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "run", "dev"]