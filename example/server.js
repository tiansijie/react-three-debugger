var express = require('express');
var app = express();

app.use(express.static('./example/views'));
app.use(express.static('./example/public'));

app.listen(4745, function () {
  console.log('Example app listening on port 4745!');
})
