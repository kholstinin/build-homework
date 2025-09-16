import path from "node:path";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.resolve(import.meta.dirname, "static"),
  list: true,
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
