### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
ADD fontawesome-free-5.11.2-web ./node_modules/fontawesome-free-5.11.2-web
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.13.8-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/TemplateProjet .
