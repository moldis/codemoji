'use strict';

const throng = require('throng');
const codemoji = require('./server');
const workers = process.env.WEB_CONCURRENCY || 1;
const port = process.env.PORT == undefined ? 8080:  process.env.PORT;

const start = function() {

  const server = codemoji.listen(port, function() {
    console.log(`Running server at: ${port}`);
  });

  const shutdown = function() {
    server.close(function() {
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

throng(workers, start);