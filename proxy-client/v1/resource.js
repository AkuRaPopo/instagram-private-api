var util = require("util");
var _ = require('underscore');


function InstagramResource(session, params) {
    var Session = require("./session");
    if (!(session instanceof Session))
        throw new Error("Argument `session` is not instace of Session");
    this._session = session;
    this._params = {};
    this.setParams(_.isObject(params) ? params : {});
}

module.exports = InstagramResource;

Object.defineProperty(InstagramResource.prototype, "params", {
    get: function() { return this.getParams() }
});

Object.defineProperty(InstagramResource.prototype, "session", {
    get: function() { return this._session }
});


InstagramResource.prototype.parseParams = function(params) {
    // Override this to parse instagram shit
    return params;
};


InstagramResource.prototype.setParams = function(params) {
    if (!_.isObject(params))
        throw new Error("Method `setParams` must have valid argument");
    params = this.parseParams(params);
    if (!_.isObject(params))
        throw new Error("Method `parseParams` must return object");
    this._params = params;
    if(params.id) this.id = params.id;
    return this;
};

InstagramResource.prototype.getParams = function() {
    return this._params;
};
    