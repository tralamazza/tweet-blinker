# There will be an answer, let it blink

All hail a useless twitter stream listener arduino blinker \o/

## Installation

* Flash StandardFirmata into your Arduino Uno
* Go to your twitter [dev account thingie](https://dev.twitter.com)
* Create an app or just use an existing one
* Create a file in this folder called `.credentials.json`

```json
{
  "consumer_key": "your",
  "consumer_secret": "values",
  "access_token_key": "go ",
  "access_token_secret": "here"
}
```
* `node index.js` and let it blink whenever someone tweets #jsconf.

* You can pass the USB port in the 1st argument `node index.js /dev/ttyUSB` (defaults to */dev/ttyACM0*)
