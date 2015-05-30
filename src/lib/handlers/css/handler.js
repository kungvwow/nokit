var fs = require("fs");
var path = require("path");

var Handler = module.exports = function(server) {
    var self = this;
    self.server = server;
    self.configs = self.server.configs;
};

//处理请求
Handler.prototype.handleRequest = function(context) {
    var self = this;
    fs.exists(context.request.physicalPath, function(exists) {
        if (exists) {
            fs.readFile(context.request.physicalPath, function(err, data) {
                if (err) {
                    context.responseError(err);
                } else {
                    context.responseContent(data.toString(), self.configs.mimeType['.css']);
                }
            });
        } else if (self.server.handlers['.less']) {
            req.physicalPath = req.physicalPath.replace('.css', '.less');
            self.server.handlers['.less'].handleRequest(context);
        } else {
            context.responseNotFound();
        }
    });
};