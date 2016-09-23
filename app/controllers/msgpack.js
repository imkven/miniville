var express = require('express'),
  router = express.Router(),
  db = require('../models');

var msgpack = require('msgpack5')();
var encode  = msgpack.encode;
var decode  = msgpack.decode;

msgpack.register(0x42, MyType, mytipeEncode, mytipeDecode);

function MyType(size, value) {
  this.value = value;
  this.size  = size;
}

function mytipeEncode(obj) {
  var buf = new Buffer(obj.size);
  buf.fill(obj.value);
  return buf;
}

function mytipeDecode(data) {
  var result = new MyType(data.length, data.toString('utf8', 0, 1)), i;

  for (i = 0; i < data.length; i++) {
    if (data.readUInt8(0) != data.readUInt8(i)) {
      throw new Error('should all be the same');
    }
  }

  return result
}

module.exports = function (app) {
  app.use('/msgpack', router);
};

router.get('/test', function (req, res, next) {
  db.Notes.findAll({
    raw: true
  }).then(function (notes) {

    //console.log(notes);

    var data = encode({
      data: notes
    });

    // res.setHeader('Content-Type', 'application/vnd.msgpack');
    // res.setHeader('Transfer-Encoding', 'chunked');
    // res.send(data);

    res.json(data);
  });
});
