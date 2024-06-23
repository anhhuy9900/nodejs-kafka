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

#### How  to check kafka is working

#### What are issues for work with kafka ?
- When we reload the Kafka server, it will auto-resume messages is existing in topics

#### To verify that messages have been committed in Kafka
```shell
docker exec -it <kafka-container-name> /bin/bash
cd /usr/bin
./kafka-consumer-groups --bootstrap-server localhost:9092 --describe --group <your-consumer-group>
```
```shell
GROUP                TOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID     HOST            CLIENT-ID
group-es-handle-data es-handle-data  0          1374            1375            1               -               -               -
```
- Summary
  - GROUP: This is the name of the consumer group. In your case, it is group-es-handle-data.
  - TOPIC: This is the name of the Kafka topic that the consumer group is consuming messages from. Here, it is es-handle-data
  - CURRENT-OFFSET: This is the offset that the consumer group has most recently committed for the partition. It indicates the latest message that has been fully processed and acknowledged by the consumer group. In this case, the committed offset is 1374.
  - LOG-END-OFFSET: This is the offset of the most recent message in the partition (i.e., the high watermark). It shows the total number of messages that have been written to the partition. Here, the log end offset is 1375.
  - LAG: This indicates the difference between the LOG-END-OFFSET and the CURRENT-OFFSET. It represents the number of messages that are in the partition but have not yet been processed by the consumer group. In this example, the lag is 1, meaning there is one message in the partition that the consumer has not yet processed.
- NOTE: The consumer has committed offset 1374 for partition 0, meaning it has successfully processed and acknowledged all messages up to this offset.
  The latest message in the partition has an offset of 1375.
  There is a lag of 1, indicating that there is one message (offset 1375) in the partition that the consumer has not yet processed.
  The CONSUMER-ID, HOST, and CLIENT-ID fields are all -, which suggests that no active consumer from this group is currently assigned to partition 0. This could happen if the consumer has temporarily disconnected or if there is no consumer currently running for this group.

