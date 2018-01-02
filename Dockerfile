FROM node:9.2.0-alpine

LABEL maintainer="Tyler Peterson"

WORKDIR /app
COPY . /app

RUN yarn global add pm2
RUN yarn install --frozen-lockfile && yarn run build

HEALTHCHECK --interval=20s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:8080 || exit 1

EXPOSE 8080
CMD ["pm2-docker", "process.yml", "--web", "--json"]
