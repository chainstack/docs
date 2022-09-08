FROM node:16 as builder

ARG CONSOLE_HOSTNAME
ARG WEBSITE_HOSTNAME
ARG DOCS_HOSTNAME
ARG ALGOLIA_KEY
ARG GA_ID

ADD . /app
WORKDIR /app

RUN yarn install
RUN yarn run build

FROM nginx:latest

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY build/server.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY --from=builder /app/docs/.vuepress/dist .

ENTRYPOINT ["nginx"]
