const { Kafka } = require("kafkajs");

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "myApp",
      brokers: ["localhost:9092"],
    });
    console.log("Connecting...");
    const consumer = kafka.consumer({ groupId: "group0" });
    await consumer.connect();
    console.log("Connected!");

    await consumer.subscribe({
      topic: "Names",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `RVD Msg: ${result.message.value}  on partition ${result.partition}`
        );
      },
    });
  } catch (e) {
    console.error(`Error ocurred, details: ${e}`);
  } finally {
  }
};

run();
