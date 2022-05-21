import mongoose from "mongoose";


// Exportamos el nombre de la coleccion
export const productsCollectionName = 'productos';

export interface IProduct {
    titulo: string;
    precio: number;
}

const productsSchema = new mongoose.Schema<IProduct>(
    {
    titulo: {type: String, required: true},
    precio: {type: Number, required: true},    
    },
    { timestamps: true, versionKey: false}
)

export const producsModel = mongoose.model<IProduct>(
    productsCollectionName,
    productsSchema
);