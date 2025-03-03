FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_BASE_API_URL=CANIPAY_ENV_API_URL
ENV NEXT_PUBLIC_VWORLD_KEY=CANIPAY_ENV_VWORLD_KEY
ENV NEXT_PUBLIC_VWORLD_URL=CANIPAY_ENV_VWORLD_URL
ENV NEXT_PUBLIC_NAVER_MAP_URL=CANIPAY_NAVER_MAP_URL

RUN yarn run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY ./env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

USER nextjs

EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
ENTRYPOINT ["/bin/sh", "-c", "/docker-entrypoint.d/env.sh && exec node server.js"]
