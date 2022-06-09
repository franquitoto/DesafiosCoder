import mongoose from "mongoose";
const productsCollectionName = 'productos';
const productossSchema = new mongoose.Schema(
    {
        titulo: {type: String, required: true},
        precio: { type: Number, required: true},
    },
    { timestamps: true, versionKey: false}
);

const productosModel = mongoose.model(productsCollectionName,productossSchema);

export default productosModel;