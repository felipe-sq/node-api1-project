const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE
server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})