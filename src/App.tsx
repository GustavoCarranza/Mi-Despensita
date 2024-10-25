import CanastaProductos from "./components/CanastaProductos"
import CanastaTotales from "./components/CanastaTotales"
import ProductosLista from "./components/ProductosLista"
import { productos } from "./data/data"
import useOrder from "./hooks/useOrder"

function App() {
  //En react nosotros podemos crear nuestros propios que hooks, lo que nos permite encapsular y reutilizar logica de estado y efectos que pueden ser compartidos entre multiples componentes.Entonces lo que estoy haciendo aqui es crear un const que va a hacer un objeto el cual por ahora tiene 2 valores, "canasta" que va a hacer nuestro useState y "addProductos" que sera nuestra funcion y lo relacionamos por asi decirlo con "useOrder" que seria nuestro hook en un archivo diferente y la ventaja de esto es que separamos la logica con los template y tenemos un mas ordenado. 
  const { canasta, addProductos, eliminarProductos, Guardar } = useOrder()

  return (
    <>
      <header className="bg-gray-600 p-10">
        <h1 className="text-center text-5xl font-bold text-white uppercase">
          Mi despensita
        </h1>
      </header>

      <main className="mx-auto grid md:grid-cols-2 gap-5 p-5">
        <div className="bg-slate-200 p-10">
          <h1 className="text-center font-bold text-3xl">
            Lista de productos
          </h1>
          <div className="grid grid-cols-2 gap-2">
            {/*Aqui lo que hacemos es que "productos" es la variable que creamos en nuestro archivo data que contiene la informacion de los productos, es decir, es un arreglo, entonces con .map lo que hacemos es iterar sobre los elementos de un array es decir sobre que la variable que contiene todos esos elementos. .map crea un nuevo arreglo con los resultados de dicha funcion.  */}
            {productos.map(producto => (
              //Dentro de la funcion pasamos el prop de "ProductosLista" que ese un componente que estamos renderizando dentro de nuestro template para tener separacion de codigo. Al prop tiene 3 propiedades un key que por defecto React lo pide para que no nos marque error, "producto" que le pasamos la variable "producto que contiene los elementos" y "addproducto" que va a hacer una funcion para agregar productos a nuestra canasta
              <ProductosLista
                key={producto.id}
                producto={producto}
                addProducto={addProductos}
                />
              ))}
          </div>
        </div>
        <div className="bg-slate-200 p-10">
          {/*//En este apartado tenemos otro componente que nos permitira agregar los elementos a la canaste, entonces en un componente mostramos los productos y otro cuando demos click en algun producto, van a aparecer en este componente. Si vemos mandamos a llamar a "canasta" que recordemos es nuestro useState, porque useState es nuestro estado, entonces cada vez que seleccionamos un producto el estado cambia. */}
          {canasta.length ? (
            <>
              <CanastaProductos
                canasta={canasta}
                eliminarProductos={eliminarProductos}
              />

              {/**Componente para calcular el subtotal y total de la lista de productos*/}
              <CanastaTotales
                canasta={canasta}
                guardar={Guardar}
              />
            </>
          ) : (
            <h2 className="text-center font-bold text-3xl">
              No hay productos en la canasta...
            </h2>
          )}
        </div>
      </main>
    </>
  )
}

export default App
