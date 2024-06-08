# Compilacion proyecto
FROM node:12.16.3 as build-state
WORKDIR /app
COPY . .
#RUN npm install
#RUN npm run build:prod

# Despliegue produccion
FROM nginx:1.18.0
COPY --from=build-state /app/dist /usr/share/nginx/html
COPY ./infraestructura/docker/nginx.conf /etc/nginx/nginx.conf
COPY ./infraestructura/docker/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]