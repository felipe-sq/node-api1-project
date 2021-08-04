const server = require('./api/server.js');

const port = 5500;

// START YOUR SERVER HERE
server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})