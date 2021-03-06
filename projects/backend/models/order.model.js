const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [
    {
     product: { type: Object, required: true},
      selectedVariation: [{
        id: { type: Number, required: true},
        type: { type: String, required: true},
        value: { type: String, required: true}
      }]
    }
  ],
  user: {
    name: {type: String, required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  }
});

module.exports = mongoose.model('Order', orderSchema);


