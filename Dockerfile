# Build container: docker build -t hono-api .
# Run container: docker run -p 3001:3001 hono-api

FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 3001

CMD ["bun", "./src/index.ts"]