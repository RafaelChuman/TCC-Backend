FROM node
ENV NODE_ENV=production
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3333
RUN chown -R node /usr/src
USER node
CMD ["npm", "run", "proc"]
