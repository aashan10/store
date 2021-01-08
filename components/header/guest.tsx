import React from 'react';
import {Button, Dropdown, Layout} from "antd";
import {Cart} from "../";
import {ShoppingCartOutlined} from '@ant-design/icons';

const {Header} = Layout;

const cart = (
    <Cart/>
)

export default class GuestHeader extends React.Component<any, any> {

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
                    <Dropdown overlay={cart} trigger={['click']}>
                        <Button className={'cart-button'} type='link' loading={false} icon={<ShoppingCartOutlined/>}>
                            Cart
                        </Button>
                    </Dropdown>
                    <Button type={'primary'}>Login</Button>
                    <Button type={'ghost'}>Register</Button>
                </div>
            </Header>
        )
    }

}