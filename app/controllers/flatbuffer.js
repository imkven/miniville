var express = require('express'),
  router = express.Router(),
  db = require('../models');

var fs = require('fs');
var path = require('path');
var flatbuffers = require(path.normalize(__dirname + '/../../public/js/flatbuffers.js')).flatbuffers;
var MiniVille = require(path.normalize(__dirname + '/../buff/miniville_generated.js')).MiniVille;


module.exports = function (app) {
  app.use('/flatbuffers', router);
};

router.get('/', function (req, res, next) {
  res.render('flatbuffers');
});

router.get('/test', function (req, res, next) {
  db.Notes.findAll({
    attributes: ['content'],
    raw: true
  }).then(function (notes) {


    // console.log(builder);
    var builder = new flatbuffers.Builder(1);
    // var contents = [];
    //
    // notes.forEach(function (val, idx) {
    //   var c = builder.createString(val.content);
    //   MiniVille.Dumb.Content.startContent(builder);
    //   MiniVille.Dumb.Content.addContent(builder, c);
    //   contents.push(MiniVille.Dumb.Content.endContent(builder));
    // });
    //
    // var Contents = MiniVille.Dumb.Notes.createDataVector(builder, contents);
    var c = builder.createString('Hello worlds');
    MiniVille.Dumb.Notes.startNotes(builder);
    MiniVille.Dumb.Notes.addContent(builder, c);
    var notes = MiniVille.Dumb.Notes.endNotes(builder);

    MiniVille.Dumb.Notes.finishNotesBuffer(builder, notes);

    //var data = builder;

    //var data = builder.dataBuffer();

    var data = builder.asUint8Array();

    var bb = new flatbuffers.ByteBuffer(data);
    console.log(bb);

    // var x = MiniVille.Dumb.Notes.getRootAsNotes(data);
    //
    // console.log(x);
    //
    // console.log(x.content());

    res.setHeader('Content-Type', 'application/vnd.flatbuffers');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.send(data);




    // var miniville = flatbuffers.compileSchema(fs.readFileSync(path.normalize(__dirname + '/miniville.bfbs')));
    // var generated = miniville.generate({data: notes});
    // var parsed = miniville.parse(generated);
    // console.log('generated:', Array.from(generated));
    // console.log('parsed:', parsed);

  });
});
