const mongoose = require('mongoose');

const productsCollectionName = 'productos';

const productosSchema = new mongoose.Schema(
    {
        titulo: {type: String, required: true},
        precio: { type: Number, required: true},
    },
    { timestamps: true, versionKey: false}
)
const productosModel = mongoose.model(productsCollectionName,productosSchema)
module.exports = {
    productosModel
};