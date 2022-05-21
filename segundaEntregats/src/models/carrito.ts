import mongoose from "mongoose";


// Exportamos el nombre de la coleccion
export const carritoCollectionName = 'carrito';

export interface IProduct {
    productos: string;
    
}

const carritoSchema = new mongoose.Schema<IProduct>(
    {
    productos: {type: String, required: false},
    },
    { timestamps: true, versionKey: false}
)

export const carritoModel = mongoose.model<IProduct>(
    carritoCollectionName,
    carritoSchema
);