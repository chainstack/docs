FROM node:11 as builder

ARG CONSOLE_HOSTNAME
ARG WEBSITE_HOSTNAME
ARG DOCS_HOSTNAME

ADD . /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM nginx:latest

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY build/server.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY --from=builder /app/docs/.vuepress/dist .

ENTRYPOINT ["nginx"]
