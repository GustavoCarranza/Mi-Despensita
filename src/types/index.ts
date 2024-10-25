export type Products = {
    id: number,
    nombre: string,
    precio: number,
}

export type Canasta = Products & {
    cantidad: number
}