# Estágio de construção (Build)
FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Copiar arquivos de dependência
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar arquivos do projeto
COPY . .

# Build da aplicação
RUN npm run build -- --prod

# Estágio de produção
FROM nginx:1.25-alpine

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos de build do estágio anterior
COPY --from=build /usr/src/app/dist/calendar-fe /usr/share/nginx/html

# Expor porta e iniciar servidor
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]