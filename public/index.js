

Router
.add(/board/(.*)/, function() {
    console.log('board', arguments);
})
.add(function() {
    console.log('default');
}).listen();
