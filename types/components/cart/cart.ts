interface CartStateInterface {
    items: Array<CartItemInterface>
}

interface CartPropsInterface {

}

interface CartItemInterface {
    id: string|number,
    sku: string,
    base_price: number,
    quantity: number,
    name: string,
    image: string,
    description: string
}

export type { CartStateInterface, CartPropsInterface, CartItemInterface };