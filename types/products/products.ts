interface ProductInterface {
    name: string,
    sku: string,
    base_price: number,
    images: Array<string>,
    videos: Array<string>,
    description: string,
    size?: Array<ProductInterface>
    min_qty: number,
    max_qty: number,
    thumbnail: string
}

export type {ProductInterface}