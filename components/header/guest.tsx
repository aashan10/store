import React from 'react';
import {Badge, Button, Dropdown, Layout} from "antd";
import {Cart} from "../";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {CartConsumer, Cart as CartContext} from '../../providers/cart/cart-provider';

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

                </div>
                <div className={'header-center'}>

                </div>
                <div className={'header-right'}>
                    <Button type={'primary'}>Login</Button>
                    <Button type={'ghost'}>Register</Button>
                    <CartConsumer>
                        {
                            cartContext => (
                                <Dropdown overlay={cart} trigger={['click']}>
                                    <Badge count={cartContext.items.length} dot={cartContext.items.length > 0}>
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