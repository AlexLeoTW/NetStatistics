/*jshint esversion:6, node: true */

var debug = require('debug')('NetStatistics'),
    speedtest = require('./module/speedtest'),
    fs = require('fs'),
    CronJob = require('cron').CronJob;

debug('Launch OK');

new CronJob('00 00 */2 * * *', function() {
    var result = speedtest.tokyo();

    debug(result);
    fs.appendFile('speed.log', result.toString() + '\n', (err) => {
        if (err) throw err;
        debug('write OK');
    });
}, null, true, 'Asia/Taipei');
