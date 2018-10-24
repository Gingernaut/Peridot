# ---- Base Node ----
FROM node:10.12.0-alpine AS BASE
WORKDIR /app

# ---- Dependencies ----
FROM BASE AS dependencies  
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# ---- Copy Files/Build ----
FROM dependencies AS build  
WORKDIR /app
COPY ./ /app
RUN yarn run build

# --- Release ----
FROM BASE AS release  

COPY --from=dependencies /app/yarn.lock ./
COPY --from=build /app/server/ ./
COPY --from=build /app/dist ./

RUN yarn install --production --frozen-lockfile && \
    yarn global add pm2 && \
    yarn add express serve-favicon compression

# RUN addgroup -S nodejs && adduser -S -G nodejs nodejs
# USER nodejs

CMD ["pm2-docker", "/app/process.yml", "--web", "--json"]