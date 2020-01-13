const jimp = require('jimp');

const imageFormat = jimp.MIME_PNG;

const { log: print } = console;

const isUrl = (url) => /^https?:\/{2}/.test(url);

const getParam = (request, name, defaultValue) => {
  const {
    params: reqParams,
    body,
    query,
  } = request;
  const params = {
    ...reqParams,
    ...body,
    ...query,
  };
  return params[name] || defaultValue;
};

async function blur(req) {
  const imageUrl = getParam(req, 'image');
  // eslint-disable-next-line radix
  const blurFactor = parseInt(getParam(req, 'blur', 5));
  if (!isUrl(imageUrl)) {
    return {
      statusCode: 400,
      body: 'Invalid url format',
    };
  }
  try {
    const image = await jimp.read(imageUrl);
    image.blur(blurFactor);
    const imageBuffer = await image.getBufferAsync(imageFormat);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': imageFormat,
      },
      body: imageBuffer,
    };
  } catch (exception) {
    print(exception);
    return {
      statusCode: 500,
      body: 'Internal server error',
    };
  }
};

module.exports = blur;
