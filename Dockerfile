# Estágio de construção (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiar arquivos de dependência
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Instalar dependênciasç

# Copiar arquivos do projeto
COPY . .

# Build da aplicação
RUN npm run build -- --configuration=production

# Estágio de produção
FROM nginx:1.25-alpine

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos de build do estágio anterior
COPY --from=build /app/dist/calendar-fe/browser /usr/share/nginx/html

# Expor porta e iniciar servidor
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
