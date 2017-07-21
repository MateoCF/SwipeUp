var mongoose = require('mongoose');
var remarkSchema = mongoose.Schema({
    remark: String, 
    username: String
});

var Remark = mongoose.model('Remark', remarkSchema);
module.exports = Remark;