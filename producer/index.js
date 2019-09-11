const kafka = require('kafka-node');
const bp = require('body-parser');

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA});
  console.log(`Connecting to ${process.env.KAFKA}`);
  const producer = new Producer(client);
  const topic = 'example';
  let payloads = [ { topic, messages: 'test' } ];

  producer.on('ready', async function() {
    let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log('[kafka-producer -> '+topic+']: broker update failed');
      } else {
        console.log('[kafka-producer -> '+topic+']: broker update success');
      }
    });
  });

  producer.on('error', function(err) {
    console.log('[kafka-producer -> '+topic+']: connection errored');
    throw err;
  });
}
catch(e) {
  console.log(e);
}
