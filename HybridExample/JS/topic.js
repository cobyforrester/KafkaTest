const { Kafka } = require("kafkajs");
const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "myApp",
      brokers: ["localhost:9092"],
    });
    console.log("Connecting...");
    const admin = kafka.admin();
    await admin.connect();
    console.log("Connected!");
    await admin.createTopics({
      topics: [
        {
          topic: "words",
          numPartitions: 2,
        },
      ],
    });
    console.log("Topic Created!");
    await admin.disconnect();
  } catch (e) {
    console.error(`Error ocurred, details: ${e}`);
  } finally {
    process.exit(0);
  }
};

run();
