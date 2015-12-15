package realtime;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.logging.LoggerFactory;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;

import java.util.Arrays;
import java.util.Properties;

/**
 * Created by imu on 12/14/2015.
 */
public class KafkaConsumer extends AbstractVerticle {

    private org.apache.kafka.clients.consumer.KafkaConsumer<String, String> consumer;

    @Override
    public void start() throws Exception {
        Properties props = new Properties();
        props.put("bootstrap.servers", "ec2-54-165-8-35.compute-1.amazonaws.com:9092");
        props.put("group.id", "test");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("session.timeout.ms", "30000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        consumer = new org.apache.kafka.clients.consumer.KafkaConsumer<String, String>(props);
        consumer.subscribe(Arrays.asList("Event"));
        scheduleConsume();
    }

    public void scheduleConsume() {
        vertx.executeBlocking(future -> {
            consume();
            future.complete();
        }, res -> {
            System.out.println("Done");
            scheduleConsume();
        });
    }

    public void consume() {
        LoggerFactory.getLogger("MyLog").info("Consuming...");

        ConsumerRecords<String, String> records = consumer.poll(1000);
        for (ConsumerRecord<String, String> record : records) {
            System.out.printf("offset = %d, key = %s, value = %s", record.offset(), record.key(), record.value());
            vertx.eventBus().publish("news-feed", record.value());
        }
    }

}
