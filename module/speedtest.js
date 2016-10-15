/*jshint esversion:6, node: true */

var child_process = require('child_process');


function Result(ping, download, upload) {
    //'use strict';
    this.ping = ping ? ping : 'error';
    this.download = download ? download : 'error';
    this.upload = upload ? upload : 'error';
    this.date = new Date();
}

Result.prototype.toString = function () {
    return `Ping: ${this.ping} ms\n` +
           `Download: ${this.download} Mbit/s\n` +
           `Upload: ${this.upload} Mbit/s\n` +
           `Date: ${this.date}`;
};

/*var res = new Result();
console.log(res.toString());
res['ping'] = 10;
console.log(res.toString());*/

function tokyo() {
    var speedtest = child_process.execSync('speedtest-cli --server 7510 --simple'),
        result = {
            //Ping: '71.203 ms',
            //Download: '34.46 Mbit/s',
            //Upload: '20.06 Mbit/s'
        };
    result = new Result();

    speedtest = speedtest.toString().split('\n');

    var i = 0,
    tempLine = '';

    for (i=0; i<speedtest.length; i++) {
        tempLine = speedtest[i].split(' ');

        if (!isNaN(tempLine[1])) {
            var entryName = tempLine[0].substring(0, tempLine[0].length-1).toLowerCase();
            result[entryName] = tempLine[1];
        }
    }

    return result;
}

module.exports.tokyo = tokyo;
