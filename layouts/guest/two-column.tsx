import React from 'react';
import {Layout} from "antd";
import {GuestHeader} from "../../components";
import {CartProvider} from "../../providers/cart/cart-provider";
import {ProductListProvider} from "../../providers/product-list/product-list";

interface TwoColumnLayoutProps {
    children: React.ReactNode,
    sidebar?: React.ReactNode
}

export default class GuestTwoColumnLayout extends React.Component<TwoColumnLayoutProps, any> {

    constructor(props) {
        super(props);
    }


    render = () => {
        return (
            <ProductListProvider>
                <CartProvider>
                    <Layout>
                        <GuestHeader/>
                        <Layout.Content>
                            {
                                this.props.children
                            }
                        </Layout.Content>
                        <Layout.Footer>
                            &copy; {new Date().getFullYear()} - Ashan Ghimire
                        </Layout.Footer>
                    </Layout>
                </CartProvider>
            </ProductListProvider>
        )
    }
}