var keys = require('./.credentials.json');
var tu = require('tuiter')(keys);
var firmata = require('firmata');
var eyes = require('eyes');

var LED = 13;

var board = new firmata.Board(process.argv[2] || '/dev/ttyACM0', function () {
  board.pinMode(LED, board.MODES.OUTPUT);
  board.digitalWrite(LED, board.LOW);

  tu.filter({ track: ['jsconf'] }, function (stream) {
    stream.on('tweet', function(data) {
      eyes.inspect({
        tweet: data.text,
        handle: '@' + data.user.screen_name
      });
      board.digitalWrite(LED, board.HIGH);
      // setTimeout is a hack, I know
      setTimeout(function () { board.digitalWrite(LED, board.LOW); }, 300);
    });
  });
});
