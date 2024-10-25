import { formatCurrency } from "../helpers"
import { Products, Canasta } from "../types"

type CanastaProductosProps = {
  canasta: Canasta[],
  eliminarProductos: (id: Products['id']) => void
}

export default function CanastaProductos({canasta, eliminarProductos} : CanastaProductosProps) {
  return (
    <>
        <h2 className="text-center font-bold text-3xl">
            Productos Canasta
        </h2>   
        <div className="space-y-3 mt-10 ">
          {canasta.map(producto => (
            <div
              key={producto.id}
              className="flex justify-between items-center border-t border-slate-600 py-5 last-of-type:border-b mt-5"
            >
              <div className="">
                <p className="font-bold text-xl">
                  {producto.nombre} - {formatCurrency(producto.precio)}
                </p>
                <p className="font-black text-md">
                  Cantidad: {producto.cantidad} - {formatCurrency(producto.precio * producto.cantidad)}
                </p>
              </div>

              <div>
                <button 
                  className="bg-red-500 w-8 h-8 text-white rounded-full shadow-xl font-bold hover:bg-red-300"
                  onClick={() => eliminarProductos(producto.id)}
                  >
                    X
                </button>
              </div>
      
              
            </div>
          ))}
        </div>
    </>
  )
}
