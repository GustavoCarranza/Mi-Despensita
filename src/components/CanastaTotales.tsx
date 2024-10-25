import { useCallback } from "react"
import { Canasta } from "../types"
import { formatCurrency } from "../helpers"

type CanastaTotalesProps = {
    canasta: Canasta[],
    guardar: () => void
}

export default function CanastaTotales({canasta, guardar} : CanastaTotalesProps) {

    const IVA = 0.16

    //Funcion para calcular el subtotal
    const subTotal = useCallback(() => canasta.reduce((total, item) => total + (item.cantidad * item.precio), 0), [canasta])
    //Funcion para calcular el IVA
    const totalIVA = useCallback(() => subTotal() * IVA, [canasta])
    //Funcion para calcular el total 
    const Total = useCallback(() => subTotal() + totalIVA(), [canasta])

    return (
        <> 
            <div className="space-y-3 mt-10">
                <p>
                    SubTotal a pagar: {' '}
                    <span className="font-bold">
                        {formatCurrency(subTotal())}
                    </span>
                </p>
                <p>
                    IVA 16%: {' '}
                    <span className="font-bold">
                        {formatCurrency(totalIVA())}
                    </span>
                </p>
                <p>
                    Total a pagar: {' '}
                    <span className="font-bold">
                        {formatCurrency(Total())}
                    </span>
                </p>
            </div>

            <button 
                className="w-full bg-black p-3 uppercase text-white mt-10"
                onClick={guardar}
            >
                Guardar Orden
            </button>
        </>
    )
}
