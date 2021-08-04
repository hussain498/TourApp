const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: { type: Number, required: true },
    description: {
      type: String, 
      trim: true,
      required: true,
    },
    offer: { type: Number },
    productPictures: [{ img: { type: String } }],
    ratings: [
      {
        userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        review:String
      },
    ],
  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
