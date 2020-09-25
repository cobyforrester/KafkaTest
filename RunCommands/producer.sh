# start producer server
cd ../kafka && bin/kafka-console-producer.sh --broker-list localhost:9092 --topic streams-plaintext-input < ../sample.txt
