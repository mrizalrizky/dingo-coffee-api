FROM node:18

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt@latest --save

EXPOSE 3344

CMD ["npm", "run", "dev"]