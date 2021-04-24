const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
      first_name: { type: String, required: true},
      last_name: { type: String, required: true},
      email: { type: String, required: true, unique: true},
      password: { type: String, required: true},
      img: { type: String, required: false, default: ''},
      emailVerified: { type: Boolean, required: true, default: false},
      cart: { items: [
        {
          productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
          selectedVariation: [{
            id: { type: Number, required: true},
            type: { type: String, required: true},
            value: { type: String, required: true}
          }]
        }


      ] },
      wishlist: { items: [
        {
          productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
          selectedVariation: [{
            id: { type: Number, required: true},
            type: { type: String, required: true},
            value: { type: String, required: true}
          }]
        }


      ] },
      orders : [
        { type: Schema.Types.ObjectId, ref: 'Order', required: true}
      ],
      token : {
        type : String
      },
      isAdmin : { type: Boolean, required: true, default: false }

});

userSchema.pre("save",function(next){
  var user = this;

  if(user.isModified("password")){
      bcrypt.genSalt(12, function(err,salt){
          if(err){
              return next(err)
          }
          bcrypt.hash(user.password, salt,function(err,hash){
              if(err){
                  return next(err)
              }
              user.password = hash;
              next();
          })
      })
  }else{
      next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword,cb){
  bcrypt.compare(candidatePassword,this.password, function(err,isMatch){
      if(err) return cb(err);
      cb(null,isMatch);
  })
}

userSchema.methods.generateToken = function(cb){
  var user = this;
  var token = jwt.sign(user._id.toHexString(),process.env.SECRET)
  user.token = token;
  user.save(function(err,user){
      if(err) return cb(err);
      cb(null,user);
  })
};

userSchema.statics.findByToken = function(token,cb){
  var user = this;
  jwt.verify(token,process.env.SECRET,function(err,decode){
      user.findOne({"_id":decode, "token":token},function(err,user){
          if(err) return cb(err)
          cb(null,user)
      })
  })
};

userSchema.methods.addToCart = function(cartProductItem){
  console.log( this.cart.items, cartProductItem);
  const itemId = new mongoose.Types.ObjectId();
  this.cart.items.push({itemId, ...cartProductItem});
  console.log('my cart',this.cart);
  return this.save();x
}




userSchema.methods.addToWishlist = function(cartProductItem){
  const itemId = new mongoose.Types.ObjectId();
  this.wishlist.items.push({itemId, ...cartProductItem});
  return this.save();x
}


userSchema.methods.removeShoppingCartItem = function(itemId){
  console.log('remove', this.cart.items);
    this.cart.items = this.cart.items.filter(item => item._id.toString() !== itemId.toString());
    return this.save();
}

userSchema.methods.removeWishlistItem = function(itemId){
  console.log('remove', this.wishlist.items);
    this.wishlist.items = this.wishlist.items.filter(item => item._id.toString() !== itemId.toString());
    return this.save();
}
module.exports = mongoose.model('User', userSchema);




// const bcrypt = require('bcryptjs');
// const mongodb = require("mongodb");
// const getDB = require("../db/index").getDB;

// class User {
//   constructor(user) {
//     Object.assign(this, user);
//     console.log(this);
//     console.log('password ', this.password);
//     this.password = bcrypt.hashSync(this.password, 12);

//     if (this._id) {
//       this._id = this._id ? new mongodb.ObjectId(this._id) : null;
//     }
//   }


//   /**
//    * Cart
//    */
//   addToCard(cardProductItem) {
//     const db = getDB();
//     const itemId = new mongodb.ObjectId();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: this._id },
//         {
//           $push: {
//             "cart.items": {
//               _id: itemId,
//               ...cardProductItem,
//               productId: new mongodb.ObjectId(cardProductItem.productId),
//             },
//           },
//         }
//       )
//       .then((response) => {
//         return itemId;
//       });
//   }
//   getCart() {
//     const productsIdsArr = this.cart.items.map((item) => {
//       return item.productId;
//     });
//     const db = getDB();
//     return db
//       .collection("products")
//       .find({ _id: { $in: productsIdsArr } })
//       .toArray()
//       .then((products) => {
//         const newArr = products.map((product) => {
//           const index = this.cart.items.findIndex((item) =>
//             item.productId.equals(product._id)
//           );
//           return {
//             _id: this.cart.items[index]._id,
//             product,
//             selectedVariation: this.cart.items[index].selectedVariation,
//           };
//         });

//         return newArr;
//       });
//   }
//   removeShoppingCartItem(itemId) {
//     const db = getDB();
//     return db.collection("users").updateOne(
//       { _id: this._id },
//       { $pull: { "cart.items": { _id: mongodb.ObjectId(itemId) } } },
//       false, // Upsert
//       true // Multi
//     );
//   }

//   /**
//    * WishList
//    */
//   getWishlist() {
//     const productsIdsArr = this.wishlist.items.map((item) => {
//       return item.productId;
//     });
//     console.log(productsIdsArr);
//     const db = getDB();

//     return db
//       .collection("products")
//       .find({ _id: { $in: productsIdsArr } })
//       .toArray()
//       .then((products) => {
//         const newArr = products.map((product) => {
//           const index = this.wishlist.items.findIndex((item) =>
//             item.productId.equals(product._id)
//           );
//           return {
//             _id: this.wishlist.items[index]._id,
//             product,
//             selectedVariation: this.wishlist.items[index].selectedVariation,
//           };
//         });

//         return newArr;
//       });
//   }
//   addToWishlist(wishlistProductItem) {
//     const db = getDB();
//     const itemId = new mongodb.ObjectId();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: this._id },
//         {
//           $push: {
//             "wishlist.items": {
//               _id: itemId,
//               ...wishlistProductItem,
//               productId: new mongodb.ObjectId(wishlistProductItem.productId),
//             },
//           },
//         }
//       )
//       .then((result) => {
//         return itemId;
//       });
//   }
//   removeWishlistItem(itemId) {
//     const db = getDB();
//     return db.collection("users").updateOne(
//       { _id: this._id },
//       { $pull: { "wishlist.items": { _id: mongodb.ObjectId(itemId) } } },
//       false, // Upsert
//       true // Multi
//     );
//   }

//   /**
//    * Orders
//    */
//   addOrder() {
//     console.log("in model addOrder");

//     const db = getDB();
//     return this.getCart().then((items) => {
//       const order = {
//         items,
//         user: {
//           _id: new mongodb.ObjectId(this._id),
//           first_name: this.first_name,
//           last_name: this.last_name,
//           email: this.email,
//         },
//       };
//       console.log(order);
//       return db
//         .collection("orders")
//         .insertOne(order)
//         .then((result) => {
//           console.log("in order then", result);
//           this.cart = { items: [] };
//           return db
//             .collection("users")
//             .updateOne({ _id: this._id }, { $set: { cart: this.cart } });
//         });
//     });
//   }

//   getOrders() {
//     const db = getDB();
//     return db.collection('orders')
//             .find( { 'user._id': new mongodb.ObjectId(this._id)})
//             .toArray();
//   }

//   save() {
//     const db = getDB();
//     if (this._id) {
//       return db
//         .collection("users")
//         .updateOne({ _id: mongodb.ObjectId(this._id) }, { $set: this });
//     }
//     return db.collection("users").insertOne(this);
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db.collection("users").find().toArray();
//   }

//   static findById(userId) {
//     const db = getDB();
//     return db
//       .collection("users")
//       .find({ _id: new mongodb.ObjectId(userId) })
//       .next();
//   }

//   static findByEmail(email) {
//     const db = getDB();
//     return db
//       .collection("users")
//       .find({ email: email })
//       .next();
//   }

//   static deleteById(userId) {
//     const db = getDB();
//     return db
//       .collection("users")
//       .deleteOne({ _id: new mongodb.ObjectId(userId) });
//   }

//   static checkPassword(password, hashed){
//     return bcrypt.compareSync(password, hashed);
//   }
// }

// module.exports = User;
