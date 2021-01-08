import React, {createContext} from 'react';
import {CartProviderProps, CartItemInterface} from '../../types';
import {message} from 'antd';


const Cart = createContext<Partial<CartProviderProps>>({});


class CartProvider extends React.Component<{ children: React.ReactNode }, CartProviderProps> {

    constructor(props: any) {
        super(props);

        let items = [];

        if (typeof window !== 'undefined') {
            items = JSON.parse(window.localStorage.getItem('cart'));
            console.log(items);
            if (!items) {
                items = [];
            }
        }

        this.state = {
            items: items,
            addToCart: this.addToCart,
            emptyCart: this.emptyCart,
            removeFromCart: this.removeFromCart,
            modifyCartItem: this.modifyCartItem

        }
    }

    setState<K extends keyof CartProviderProps>(state: ((prevState: Readonly<CartProviderProps>, props: Readonly<{ children: React.ReactNode }>) => (Pick<CartProviderProps, K> | CartProviderProps | null)) | Pick<CartProviderProps, K> | CartProviderProps | null, callback?: () => void) {
        super.setState(state, callback);
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                window.localStorage.setItem('cart', JSON.stringify(this.state.items));
            }, 10);
        }
    }

    addToCart = (item: CartItemInterface) => {
        const items = this.state.items;

        const exists = items.find(cartItem => cartItem.sku === item.sku);
        if (exists) {
            const index = items.indexOf(exists);
            exists.quantity++;
            items[index] = exists;
            this.setState({items: items});
        } else {
            this.setState({items: [...this.state.items, item]});
        }
        message.success('Product added to cart!');
    }

    modifyCartItem = (item: CartItemInterface) => {
        let items = this.state.items;
        const cartItem = items.find(inCart => item.sku === inCart.sku);

        if (cartItem) {
            const index = items.indexOf(cartItem);
            if (item.quantity > 0) {
                items[index] = item;
                this.setState({items: items});
            } else {
                let newState = [];
                items.map(cartItem => {
                    if (cartItem.sku !== item.sku) {
                        newState.push(cartItem);
                    }
                });
                this.setState({items: newState});
            }
            message.info('Cart items modified');
        }
    }

    emptyCart = () => {
        this.setState({items: []})
    }

    removeFromCart = (item: CartItemInterface) => {
        const items = this.state.items;

        const newItems = [];

        items.map(cartItem => {
            if (item.sku !== cartItem.sku) {
                newItems.push(cartItem);
            }
        });

        this.setState({items: newItems});


    }


    render = () => {
        return (
            <Cart.Provider value={this.state}>
                {this.props.children}
            </Cart.Provider>
        );
    }
}

const CartConsumer = Cart.Consumer;

export {CartConsumer, CartProvider, Cart};