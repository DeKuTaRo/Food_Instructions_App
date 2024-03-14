FROM node

WORKDIR /app/order

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm", "run", "dev"]