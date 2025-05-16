FROM node:20-alpine

WORKDIR /usr/src/app

# Instala tzdata e dependências
RUN apk add --no-cache tzdata

# Define o timezone
ENV TZ=America/Manaus

# Copia apenas o package.json e package-lock.json antes de instalar dependências
COPY package*.json ./

# Instala ferramentas globais e dependências locais
RUN npm install -g rimraf @nestjs/cli && npm install

# Copia o restante do código
COPY . .

# Build da aplicação NestJS
RUN npm run build

EXPOSE 3005

CMD ["npm", "run", "start:prod"]