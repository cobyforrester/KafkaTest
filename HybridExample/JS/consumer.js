const { Kafka } = require("kafkajs");
const { MongoClient } = require("mongodb");

const run = async () => {
  // DB URI/OPTIONS
  const url = "mongodb://localhost:27017/kafka";
  const options = { useUnifiedTopology: true };

  //variable for clean output
  let isConnected = false;

  try {
    const kafka = new Kafka({
      clientId: "myApp",
      brokers: ["localhost:9092"],
    });
    console.log("Connecting...");
    const consumer = kafka.consumer({ groupId: "group0" });
    await consumer.connect();

    await consumer.subscribe({
      topic: "words",
      fromBeginning: true,
    });

    await consumer.run({
      // stays reading all new messages to a topic
      eachMessage: async (result) => {
        if (!isConnected) {
          console.log(
            "\n=================== Connected =====================\n"
          );
          isConnected = true;
        }

        // connect to mongodb and add value
        MongoClient.connect(url, options, (err, db) => {
          if (err) throw err;
          let word = result.message.value + ""; // + "" to convert to string, cheap and easy
          let db_kafka = db.db("kafka");
          db_kafka.collection("words").insertOne({ word: word }, (err, res) => {
            if (err) throw err;
            console.log(
              `Success! added "${word}" to db! From partition ${result.partition}`
            );
            db.close();
          });
        });
      },
    });
  } catch (e) {
    console.error(`Error ocurred, details: ${e}`);
  } finally {
  }
};

run();
