const logger = fn => async (req, res) => {
  const start = Date.now();
  const { method, url } = req;

  // Capture the original res.end to log after the response is sent
  const oldEnd = res.end;
  res.end = function (chunk, encoding) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${method} ${url} ${res.statusCode} (${duration}ms)`);
    return oldEnd.apply(res, arguments);
  };

  return await fn(req, res);
};

module.exports = logger;
