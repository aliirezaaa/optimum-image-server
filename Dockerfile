FROM  node:lts-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN mkdir -p /home/files && chown -R node:node /home/files
# RUN apk update 

# RUN  apk add build-essential libpng16-dev autoconf libtool pkg-config nasm  

WORKDIR /home/node/app

COPY package*.json ./

# USER node

RUN npm install

COPY --chown=node:node . .


CMD [ "node", "bin/www" ]