import {Button, InputNumber, Card, List, Popconfirm, message, Avatar} from 'antd';
import React from 'react';
import {CartConsumer, Cart as CartContext} from '../../providers/cart/cart-provider';
import {CartItemInterface, CartProviderProps} from '../../types';
import {CloseCircleOutlined} from '@ant-design/icons';
import Link from 'next/link';

class Cart extends React.Component {

    renderCart(cart: CartProviderProps): React.ReactNode {
        return (
            <List>
                {
                    cart.items.map((item: CartItemInterface) => {
                        return (
                            <List.Item key={item.sku}>
                                <List.Item.Meta
                                    title={item.name}
                                    description={'Rs. ' + item.base_price}
                                    avatar={<Avatar src={item.image}/>}
                                />
                                <div>
                                    <InputNumber type='number' value={item.quantity} onChange={(text) => {
                                        const value = text.toString();
                                        if (value !== '' || value !== undefined || value !== null) {
                                            item.quantity = parseInt(value);
                                            cart.modifyCartItem(item);
                                        }
                                    }}/>
                                    <Popconfirm placement={'left'} title={'Remove this item from cart?'}
                                                onConfirm={() => {
                                                    cart.removeFromCart(item);
                                                    message.success('Removed product from cart!');
                                                }}>
                                        <Button danger={true} type={'link'} icon={<CloseCircleOutlined/>}>
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </List.Item>
                        )
                    })
                }
                <List.Item>
                    <strong>Subtotal</strong>
                    <h5>Rs. {this.getCartSubtotal(cart)}</h5>
                </List.Item>
                <List.Item>
                    <Button block={true} type={'primary'}>Checkout</Button>
                    <Link href={'/cart'}>
                        <Button block={true} type={'link'}>View Cart</Button>
                    </Link>
                </List.Item>
            </List>
        )
    }

    getCartSubtotal = (cart) => {
        let subtotal = 0;
        cart.items.map(item => {
            subtotal += item.base_price * item.quantity;
        })
        return subtotal;
    }

    constructor(props) {
        super(props);
    }


    render = () => {
        return (
            <CartConsumer>
                {
                    (cart: CartProviderProps) => (
                        <Card hoverable className={'minicart'}>
                            {
                                cart.items.length > 0
                                    ? this.renderCart(cart)
                                    : (
                                        <div>
                                            <strong>There are no items in the cart.</strong>
                                            <br/>
                                        </div>
                                    )
                            }
                        </Card>
                    )
                }
            </CartConsumer>
        )
    }

}

Cart.contextType = CartContext;

export default Cart;