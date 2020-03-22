# 1) Building app
FROM node:13.10.1-stretch as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
# Next build using create-react-app
RUN npm run build
# 2) Deployment
FROM nginx:1.17.9-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# Copy server config
COPY ./config-nginx/corona-atlas.conf /nginx.conf.template
COPY ./config-nginx/nginx.conf /etc/nginx/nginx.conf
