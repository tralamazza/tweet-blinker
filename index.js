var keys = require('./.credentials.json');
var tu = require('tuiter')(keys);
var firmata = require('firmata');
var eyes = require('eyes');

var board = new firmata.Board(process.argv[2] || '/dev/ttyACM0', function (err) {
  if (err) return console.error(err);
  var LED = 13;
  // setup led pin and turn it off
  board.pinMode(LED, board.MODES.OUTPUT);
  board.digitalWrite(LED, board.LOW);
  // setup twitter callback filter
  tu.filter({ track: ['jsconf'] }, function (stream) {
    var TIMEOUT = 300;
    // blinks pin LED and calls done
    var blink = function (done) {
      board.digitalWrite(LED, board.HIGH);
      setTimeout(function () {
        board.digitalWrite(LED, board.LOW);
        done();
      }, TIMEOUT);
    };
    var blink_q_len = 0;
    // chain blinks
    var blink_q = function () {
      if (blink_q_len-- > 0) {
        blink(blink_q);
      }
    };
    // on new tweet
    stream.on('tweet', function (data) {
      eyes.inspect({
        tweet: data.text,
        handle: '@' + data.user.screen_name
      });
      if (blink_q_len++ === 0)
        blink_q();
    });
  });
});
