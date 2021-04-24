const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title : {type: String, required: true},
  img : {type: String, required: false},
  subCategories : [{
    title : {type: String, required: true},
    img : {type: String, required: false},
  }]
});

module.exports = mongoose.model('Category', categorySchema);



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


// const mongodb = require('mongodb');
// const getDB = require("../db/index").getDB;

// class Category {
//   constructor(category) {
//     Object.assign(this, category);
//     if(this._id){
//       this._id = new mongodb.ObjectId(this._id);
//     }
//   }
//   static getIdForSubCat(){
//     return new mongodb.ObjectId();
//   }
//   save() {
//     const db = getDB();
//     if(this._id){
//       return db.collection('categories').updateOne({_id: mongodb.ObjectId(this._id)}, {$set: this});
//     }
//     return db.collection("categories")
//                 .insertOne(this)
//   }

//   static fetchAll(){
//     const db = getDB();
//     return db.collection("categories")
//               .find()
//               .toArray()
//   }

//   static findById(categoryId){
//     const db = getDB();
//     return db.collection("categories")
//               .find({_id: new mongodb.ObjectId(categoryId) })
//               .next();
//   }

//   static deleteById(categoryId){
//     const db = getDB();
//     return db.collection("categories")
//               .deleteOne({_id: new mongodb.ObjectId(categoryId) });
//   }
// }

// module.exports = Category;
