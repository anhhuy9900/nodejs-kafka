### Start Kafka 
bin/kafka-server-start.sh config/server.properties
bin/zookeeper-server-start.sh config/zookeeper.properties

### Create topic
#bin/kafka-topics.sh --create --topic my-topic --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092

#### Create Topic in docker
docker exec kafka-stack-docker-compose-kafka1-1 kafka-topics --create --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1 --topic Test1

#### Add more partitions to topic in kafka
docker exec kafka-stack-docker-compose-kafka1-1 kafka-topics -alter --bootstrap-server localhost:9092 --partitions 5 --topic dummytopic 

### show topic list
bin/kafka-topics.sh --list --bootstrap-server localhost:9092

### Write message to topic 
bin/kafka-console-producer.sh --topic my-topic --bootstrap-server localhost:9092

### Warning
#### Kafka consumer customization options in Kafkajs
The Kafka consumer provides many options and a lot of flexibility in terms of allowing you to determine how you want to consume data. Here are some settings you should know:

- autoCommit
    - Committing in Kafka means saving the message/event to disk after processing. As we know, offset is just a number that keeps track of the messages/events processed.
    - Committing often makes sure that we don’t waste resources processing the same events again if a rebalance happens. But it also increases the network traffic and slows down the processing.

- maxBytes 
  - This tells Kafka the maximum amount of bytes to be accumulated in the response. This setting can be used to limit the size of messages fetched from Kafka and avoids overwhelming your application.

- fromBeginning 
  - Kafka consumes from the latest offset by default. If you want to consume from the beginning of the topic, use the fromBeginning flag.
    ```javascript
    await consumer.subscribe({ topics: ['demoTopic], fromBeginning: true })
    ```
- Seek 
  - You can choose to consume events from a particular offset as well. Simply pass the offset number you want to start consuming from.
  - This will now only resolve the previous offset, not commit it
    consumer.seek({ topic: 'example', partition: 0, offset: "12384" })


