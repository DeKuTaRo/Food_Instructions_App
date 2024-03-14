FROM node

WORKDIR /app/recipe

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "run", "dev"]