#compile
FROM node:10.17.0-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm run build
#runtime
FROM nginx:latest
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html/
