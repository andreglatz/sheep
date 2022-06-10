FROM node:lts as builder

ENV NODE_ENV build

WORKDIR /app

RUN corepack enable

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN yarn build

# ---

FROM node:lts

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["yarn", "start:prod"]
