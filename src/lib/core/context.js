var Context = function(server, req, res) {
    var self = this;
    self.server = server;
    self.request = req;
    self.response = res;
    self.configs = server.configs;
};

Context.prototype.responseError = function(errorMessage) {
    var self = this;
    if (self.isEnd) return;
    self.response.writeHead(500, {
        'Content-Type': self.configs.mimeType['.html']
    });
    var model = {
        errorMessage: errorMessage,
        server: self.server,
        context: self,
        request: self.request,
        response: self.response
    };
    self.response.end(self.server.responsePages["500"](model));
    self.isEnd = true;
};

Context.prototype.responseNotFound = function() {
    var self = this;
    if (self.isEnd) return;
    self.response.writeHead(404, {
        'Content-Type': self.configs.mimeType['.html']
    });
    var model = {
        server: self.server,
        context: self,
        request: self.request,
        response: self.response
    };
    self.response.end(self.server.responsePages["404"](model));
    self.isEnd = true;
};

Context.prototype.responseContent = function(content, mime) {
    var self = this;
    if (self.isEnd) return;
    self.response.writeHead(200, {
        'Content-Type': mime || self.request.mime
    });
    self.response.end(content);
    self.isEnd = true;
};

Context.prototype.redirect = function(url) {
    var self = this;
    if (self.isEnd) return;
    self.response.writeHead(302, {
        'Location': url
    });
    self.response.end();
    self.isEnd = true;
};

module.exports = Context;
/*end*/