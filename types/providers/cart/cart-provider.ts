import { type } from "os";
import { CartStateInterface, CartItemInterface } from "../../components/cart/cart";

interface CartProviderProps extends CartStateInterface {
    addToCart: (item: CartItemInterface) => void;
    emptyCart: () => void;
    removeFromCart: (item: CartItemInterface) => void;
    modifyCartItem: (item: CartItemInterface) => void;
}


export type { CartProviderProps };