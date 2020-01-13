const jimp = require('jimp');

const imageFormat = jimp.MIME_PNG;

// const { log: print } = console;

const isUrl = (url) => /^https?:\/{2}/.test(url);

exports.handler = async function blur(event) {
  const imageUrl = event.queryStringParameters.image;
  // eslint-disable-next-line radix
  const blurFactor = parseInt(event.queryStringParameters.blur) || 5;
  if (!isUrl(imageUrl)) {
    return {
      statusCode: 400,
      body: 'Invalid url format',
    };
  }
  const image = await jimp.read(imageUrl);
  image.blur(blurFactor);
  const imageAsBase64 = await image.getBase64Async(imageFormat);
  return {
    statusCode: 200,
    body: imageAsBase64,
  };
};
