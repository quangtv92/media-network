FROM nginx:1.12

WORKDIR /usr/src

RUN \
  apt-get update && \
  apt-get install -y nano

RUN ln -s /usr/src/docker/nginx/nginx-dev.conf /etc/nginx/conf.d/nginx-dev.conf
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
