# Estágio de construção (Build)
FROM node:18-alpine AS build
WORKDIR /app

# Copiar arquivos de dependência
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Instalar dependênciasç

# Copiar arquivos do projeto
COPY . .

# Build da aplicação
RUN npm run build -- --configuration production

# Estágio de produção
FROM nginx:1.25-alpine

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos de build do estágio anterior
COPY --from=build /app/dist/calendar-fe /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Expor porta e iniciar servidor
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]