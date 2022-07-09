#Start Kafka 
bin/kafka-server-start.sh config/server.properties
bin/zookeeper-server-start.sh config/zookeeper.properties

#Create topic
bin/kafka-topics.sh --create --topic my-topic --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092

#show topic list
bin/kafka-topics.sh --list --bootstrap-server localhost:9092

#Write message to topic 
bin/kafka-console-producer.sh --topic my-topic --bootstrap-server localhost:9092

