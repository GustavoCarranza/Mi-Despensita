//Este componente lo utilizamos para mostrar los productos en pantalla a traves de botones. Improtamos nuestro type de productos con los tipos de datos ya incluidos

import { formatCurrency } from "../helpers"
import { Products } from "../types"

//Como estamos pasando a via Props a nuestro template en el archivo App, creamos nuestro Type con los valores que tenemos en la renderizacion del nuestro componentes, en este caso ocupamos dos valores, producto que le pasamos "products" que es nuestro type y addProducto que seria nuestra funcion que creamos en nuestro hook 
type ProductosListaProps = {
    producto: Products
    addProducto: (producto: Products) => void
}

//Aqui aplicamos destructuring que nos permite extraer valores de arrays y objetos y asignarlos a variables de una manera mas concisa el destructuring siempre sera ente llaves y con : relacionamos nuestro type que creamos
export default function ProductosLista({producto, addProducto} : ProductosListaProps) {
    return (
        <>
        {/** Entonces en el boton creamos un onclick y le pasamos la funcion "addProdcuto y como le estamos pasando un parametro ocupamos un arrow function" */}
            <button className="mt-5 border-2 border-slate-700 hover:bg-slate-800 hover:text-white w-full p-3"
            onClick={() => addProducto(producto)}
            >

            {/**Y ya solo mandamos a llamar el parametro "producto y concatemos con las propiedades de nuestro arreglo de productos" */}
            <p>
                {producto.nombre}
            </p>
            <p>
                {formatCurrency(producto.precio)}
            </p>

            </button>
        </>
    )
}

