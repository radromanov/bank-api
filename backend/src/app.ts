import express from "express";
import { Server } from "@presentation/server";
import { RateLimiter } from "@presentation/rate-limit";
import { RedisClient } from "@infrastructure/cache";
import { RedisConfig } from "@config/redis.config";

const app = express();
const cache = new RedisClient(RedisConfig);
const ratelimiter = new RateLimiter(cache);

const server = new Server(app, ratelimiter);

server.routes();
server.listen();
