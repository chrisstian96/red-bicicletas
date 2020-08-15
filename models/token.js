const {Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    _userId: {type: Schema.Types.ObjectId, required: true, ref: 'Usuario'},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: 43200}

});

module.exports = model('Token', TokenSchema);