#!/usr/bin/bash

# Instalar dependências
npm install --legacy-peer-deps

# Build de produção
npm run build:prod

# Testes (adicione isto ao seu CI/CD)
npm run test:prod

# Análise de bundle
npm run analyze

# Construir imagem Docker
docker build -t calendar-fe-prod .

# Executar container
docker run -d -p 80:80 --name calendar-prod calendar-fe-prod