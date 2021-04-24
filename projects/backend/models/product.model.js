const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: false},
    sku: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    images: {
      main: { type: String, required: false},
      catalog: { type: Array, required: false}
    },
    manufacture_details: {
      model_number: { type: String, required: false},
      release_date: { type: String, required: false}
    },
    shipping_details: {
      weight: { type: String, required: false},
      width: { type: String, required: false},
      height: { type: String, required: false},
      depth: { type: String, required: false}
    },
    quantity: { type: String, required: true},
    pricing: {
      price: { type: String, required: true},
      oldPrice: { type: String, required: false}
    },
    variations: [ {
        type:{ type: String, required: true},
        name: { type: String, required: true},
        values: { type: Array, required: true}
      }],
    variation_quantity : { type: Array, required: false},
    categories: { type: Array, required: true},
    outofStock: { type: Boolean, required: true}
});

module.exports = mongoose.model('Product', productSchema);



// const mongodb = require('mongodb');
// const getDB = require("../db/index").getDB;

// class Product {
//   constructor(product) {
//     Object.assign(this, product);
//     if(this._id){
//       this._id = this._id ? new mongodb.ObjectId(this._id) : null;
//     }
//   }

//   save() {
//     const db = getDB();
//     if(this._id){
//       return db.collection('products').updateOne({_id: mongodb.ObjectId(this._id)}, {$set: this});
//     }
//     return db.collection("products")
//                 .insertOne(this)
//   }

//   static findByCateogry(categoryId){
//     const db = getDB();
//     console.log(categoryId);

//     return db.collection("products")
//               .find({ categories: categoryId })
//               .toArray()
//   }
//   static fetchAll(){
//     const db = getDB();
//     return db.collection("products")
//               .find()
//               .toArray()
//   }

//   static findById(productId){
//     const db = getDB();
//     return db.collection("products")
//               .find({_id: new mongodb.ObjectId(productId) })
//               .next();
//   }

//   static deleteById(productId){
//     const db = getDB();
//     return db.collection("products")
//               .deleteOne({_id: new mongodb.ObjectId(productId) });
//   }
// }

// module.exports = Product;
