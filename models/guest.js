var orm = require("../config/orm.js");

var guest = {
    all: function(cb) {
        orm.all("guests", function(res) {
            cb(res);
        });
    },

    create: function(cols, vals, cb) {
        orm.create("guests", cols, vals, function(res) {
            cb(res);
        });
    },

    update: function(objColVals, condition, cb) {
        orm.update("guests", objColVals, condition, function(res) {
            cb(res);
        });
    },

    delete: function(condition, cb) {
        orm.delete("guests", condition, function(res) {
            cb(res);
        });
    }
};

module.exports = guest;