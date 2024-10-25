//Notita: Este archivo es un hook que nosotros creamos para separar la logica de un archivo con template y no amontonar todo en un solo archivo.
import { useState, useEffect } from "react";
//Aqui importamos nuestros types que los types solo son los tipos de datos que estamos manejando
import { Canasta, Products } from "../types";

//Aqui exportamos nuestra funcion useOrder para poder utilizarla en multiples componentes
export default function useOrder() {
  
    const iniciarCanasta = () => {
    const localStorageCanasta = localStorage.getItem("canasta");
    return localStorageCanasta ? JSON.parse(localStorageCanasta) : [];
  };
  
  //Aqui estamos creando nuestro useState, que el useState es un hook que nos va a permitir agregar estado local a los componentes funcionales. useState toma un valor inicial como argumento y devuelve un array con dos elementos "el valor actual del estado" y "una funcion para actualizar ese valor"
  //<Canasta> en un generic, los generics mantienen la tipificacion estricta, es decir, los tipos de datos que estamos manejando si un dato es de tipo string el generic mantiene ese tipo de datos asi estrictamente
  const [canasta, setCanasta] = useState<Canasta[]>(iniciarCanasta);

  useEffect(() => {
    localStorage.setItem("canasta", JSON.stringify(canasta));
  }, [canasta]);

  //Aqui creamos nuestra funcion addProductos que la utilizaremos en nuestro componente App, como vemos en un arrowFunction que nombramos como "producto" y le relacionamos a "Products" que es nuestro type
  const addProductos = (producto: Products) => {
    //Creamos una const para verificar si existe un producto, mandamos a llamar a nuestro valor inicial del useState y con la funcion .find nos va a permitir buscar un elementos de un array que cumpla una condicion especifica. Nombramos a la variable "Products" concatemas con un callback entonces decimos si "Products.id === a producto.id, es decir, a un numero en especifico" entonces validamos
    const productoExiste = canasta.find(
      (canastaItem) => canastaItem.id === producto.id
    );
    //Si se cumple esa condicion
    if (productoExiste) {
      //Creamos una const donde alcamendamos el codigo si resulta verdadero, el valor inicial de nuestro useState "canasta" utilizamos el metodo .map para iterar y que nos cree un nuevo arreglo "?" esto significa en caso constrario creamos un objeto y una copia de array de los elementos que tengamos y la cantidad se incrementa de 1 en uno
      const updateCanasta = canasta.map((canastaItem) =>
        canastaItem.id === producto.id
          ? { ...canastaItem, cantidad: canastaItem.cantidad + 1 }
          : canastaItem
      );
      //Y aqui lo que hacemos es actualizar el state con nuestro segundo valor del useState y le pasmos variable
      setCanasta(updateCanasta);
    } else {
      //En caso contrario que no existan productos se crea una copia del array de productos y la cantidad aumenta
      const newItem = { ...producto, cantidad: 1 };
      //Y nuevamente actualizamos el state
      setCanasta([...canasta, newItem]);
    }
  };

  //Funcion para elminar productos de la canasta
  const eliminarProductos = (id: Products["id"]) => {
    setCanasta(canasta.filter((producto) => producto.id !== id));
  };

  //Funcion para simular guardar nuestra compra
  const Guardar = () => {
    setCanasta([]);
  };
  //Y para utilizar los parametros y funciones en otros componentes las retornamos
  return {
    canasta,
    addProductos,
    eliminarProductos,
    Guardar,
  };
}
