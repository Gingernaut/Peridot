# ---- Base Node ----
FROM node:16.4.2-alpine AS BASE
WORKDIR /app

# ---- Dependencies ----
FROM BASE AS build

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ /app
RUN yarn run build

# --- Release ----
FROM BASE AS release  

COPY --from=build /app/server ./
COPY --from=build /app/dist ./

RUN yarn global add pm2 && \
    yarn add express compression connect-history-api-fallback helmet


CMD ["pm2-runtime", "/app/process.yml", "--json"]