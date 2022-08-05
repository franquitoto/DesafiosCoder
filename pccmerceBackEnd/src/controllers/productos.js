import ApiProductos from '../apis/productos';
import Logger from '../services/logger';

export default class ControladorProductos {
  constructor() {
    this.ApiProductos = new ApiProductos();
  }

  obtenerProductos = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productos = await this.ApiProductos.obtenerProductos(id);

      res.json({
        data: productos,
      })
    } catch (err) {
      Logger.error('Error obtener productos');
      next(err);
    }

  }

  guardarProducto = async (req, res, next) =>{
    try{
      const nuevoProducto = req.body;
      const productoGuardado = await this.ApiProductos.guardarProducto(
        nuevoProducto
        );
      res.json({
        mgs: 'Producto guardado',
        data: productoGuardado,
      });
    }catch(err){
      Logger.error('Error al guardar producto');
      next(err)
    }
  }
}