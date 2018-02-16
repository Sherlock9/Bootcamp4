// @flow

export default function pipe(readStream: *, writeStream: *) {
  readStream.on('data', (data) => {
    let shouldContinue = writeStream.write(data);
    if (shouldContinue === false) {
      readStream.pause();
      writeStream.once('drain', () => {
        readStream.resume();
      });
    }
  });
  readStream.on('end', () => {
    writeStream.end();
  });
}
