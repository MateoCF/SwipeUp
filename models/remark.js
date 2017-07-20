var mongoose = require('mongoose');
var remarkSchema = mongoose.Schema({
    remark: String, 
    username: String,
    date: { type : Date, default: Date.now }
});

var Remark = mongoose.model('Remark', remarkSchema);
module.exports = Remark;