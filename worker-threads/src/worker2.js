const { workerData, parentPort } = require('worker_threads');
const Jimp = require('jimp');

Jimp.read(workerData.imagePath, (err, image) => {
  if (err) {
    return parentPort.postMessage({ error: err.message });
  }

  image
    .resize(256, 256)
    .quality(80)
    .write(workerData.imagePath, () => {
      parentPort.postMessage('Image processing complete.');
    });
});
