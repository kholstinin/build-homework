import path from "node:path";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.resolve(import.meta.dirname, "dist"),
  list: true
});

fastify.get("/", async function handler(request, reply) {
  reply.type('text/html; charset=utf-8')
  return reply.send('pong');
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
