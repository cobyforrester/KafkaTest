const { Kafka } = require("kafkajs");

// for getting user input
const msg = process.argv[2];

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "myApp",
      brokers: ["localhost:9092"],
    });
    console.log("Connecting...");
    const producer = kafka.producer();
    await producer.connect();
    console.log("Connected!");

    // simply converts message to hash number to be partitioned
    const hash = msg.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const partition = hash % 2 == 0 ? 0 : 1;
    const result = await producer.send({
      topic: "Names",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });
    console.log(`Send Successful: ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (e) {
    console.error(`Error ocurred, details: ${e}`);
  } finally {
    process.exit(0);
  }
};

run();
