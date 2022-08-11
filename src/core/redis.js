const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;
const redis = require('redis');

const redisClient = redis.createClient({
    host,
    port: Number(port),
});

redisClient.connect();

module.exports = {
    publish(eventName, eventData) {
        try {
            redisClient.publish(eventName, JSON.stringify(eventData));
        } catch (error) {
            console.log(error);
        }
    }
}