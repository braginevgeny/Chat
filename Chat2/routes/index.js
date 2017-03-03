
var Chat = require('../Chat');

var TestChat = Chat({
    js: '',
    html: '',
    css: '',
});


exports.TestChat = function(req, res){
    res.jsonp(TestChat.getInformation());
};
