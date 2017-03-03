//модуль чата, для получение данных и отправки их на сайт клиента
var Chat = function () {
	this.data = {
		js: null,
		html: null,
		css: null,
    };
    var fs = require('fs');
    this.fill = function (info) {
        for (var prop in this.data) {
            switch (prop) {
                case 'js':
                    var jsdata = '';
                    jsdata = fs.readFileSync('io.js', 'utf8');
                    jsdata = jsdata + fs.readFileSync('client.js', 'utf8');
                    this.data[prop] = jsdata;
                    break;
                case 'html':
                    this.data[prop] = fs.readFileSync('chat.html', 'utf8');
                    break;
                case 'css':
                    this.data[prop] = fs.readFileSync('chat.css', 'utf8');
                    break;
            }
        }
    };

	this.getInformation = function () {
		return this.data;
	};
};

module.exports = function (info) {
    var instance = new Chat();
	instance.fill(info);
	return instance;
};