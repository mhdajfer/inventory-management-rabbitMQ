const amqp = require("amqplib");

const Connect = async () => {
  const connection = await amqp.connect(process.env.RabbitMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange("inventory-management", "direct", {
    durable: true,
  });

  const q = await channel.assertQueue("order", { durable: true });
  channel.bindQueue(q.queue, "inventory-management", "order_products");

  return { channel, q };
};

const publishMessage = async (message, routingkey) => {
  if (!channel) await Connect();

  channel.publish("inventory-management", routingkey, Buffer.from(message));
  console.log(`Message Published to the exchange`);
};

const consumeMessage = async (createOrderCallback) => {
  const { channel, q } = await Connect();

  channel.consume(q.queue, (data) => {
    const products = JSON.parse(data.content);
    createOrderCallback(products);
    channel.ack(data);
  });
};

module.exports = consumeMessage;
