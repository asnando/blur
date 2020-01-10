const { log: print } = console;

exports.handler = async (...args) => {
  print(args);
  return {
    statusCode: 200,
    body: 'app running',
  };
};
