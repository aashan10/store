import React from 'react';
import {Badge, Button, Dropdown, Layout} from "antd";
import {Cart} from "../";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {CartConsumer, Cart as CartContext} from '../../providers/cart/cart-provider';
import Link from 'next/link';

const {Header} = Layout;

const cart = (
    <Cart/>
)

class GuestHeader extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {}
    }


    render = () => {
        return (
            <Header>
                <div className={'header-left'}>
                    <Link href={'/'}>Store</Link>
                </div>
                <div className={'header-center'}>

                </div>
                <div className={'header-right'}>
                    <Button type={'primary'}>Login</Button>
                    <Button type={'ghost'}>Register</Button>
                    <CartConsumer>
                        {
                            cartContext => (
                                <Dropdown arrow placement={'bottomRight'} overlay={cart} trigger={['click']}>
                                    <Badge count={cartContext.items.length} className={'cart-trigger'}
                                           dot={cartContext.items.length > 0}>
                                        <Button type={'link'} icon={<ShoppingCartOutlined/>}>Cart </Button>
                                    </Badge>
                                </Dropdown>
                            )
                        }
                    </CartConsumer>
                </div>
            </Header>
        )
    }

}

GuestHeader.contextType = CartContext;

export default GuestHeader;