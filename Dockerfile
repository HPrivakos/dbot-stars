FROM oven/bun

COPY . /app
WORKDIR /app
RUN bun install

CMD ["bun", "run", "src/index.ts"]