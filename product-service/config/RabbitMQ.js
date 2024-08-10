const amqp = require("amqplib");

let channel;

const Connect = async () => {
  const connection = await amqp.connect(process.env.RabbitMQ_URL);
  channel = await connection.createChannel();
  await channel.assertExchange("inventory-management", "direct", {
    durable: true,
  });
};

const publishMessage = async (message, routingkey) => {
  if (!channel) await Connect();

  channel.publish("inventory-management", routingkey, Buffer.from(message));
  console.log(`Message Published to the exchange : ${message}`);
};

module.exports = publishMessage;
