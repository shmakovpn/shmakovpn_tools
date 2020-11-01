var casper = require('casper').create();

casper.echo("Casper CLI passed args:");
console.log('Hello');

casper.start('http://casperjs.org/', function() {
    console.log('hello2')
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
})
casper.run();

// 10.91.147.130
// 3500 14000
// 2000
// 799 900