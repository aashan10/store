import React from 'react';
import GuestTwoColumnLayout from "../../layouts/guest/two-column";
import {Row, Col, Card, Button} from 'antd';
import {CartConsumer} from '../../providers/cart/cart-provider'
import {ShoppingCartOutlined, LoadingOutlined} from '@ant-design/icons';
import Link from 'next/link';
import {ProductList, ProductListConsumer} from "../../providers/product-list/product-list";

class StoreHomePage extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }


    render = () => {
        return (
            <GuestTwoColumnLayout>
                <ProductListConsumer>
                    {
                        productList => (

                            <Row style={{margin: 10}}>

                                {
                                    productList.loading ? <LoadingOutlined/> : (
                                        <>
                                            <Col span={6} sm={24} xs={24} md={6} lg={4} xl={4}
                                                 style={{paddingRight: 0, marginBottom: 10}}>
                                                <Card hoverable={true}>
                                                    <strong> Filter Products </strong>
                                                </Card>
                                            </Col>
                                            <Col span={18} xs={24} sm={24} md={18} lg={20} xl={20}>
                                                <Row gutter={[16, 16]}>
                                                    {
                                                        productList.filteredProducts.map(product => {
                                                            return (
                                                                <Col span={4} xs={24} sm={12} md={8} lg={6} xl={4}>
                                                                    <Card
                                                                        hoverable
                                                                        style={{width: '100%'}}
                                                                        cover={<img alt={product.sku}
                                                                                    src={product.image}/>}
                                                                    >
                                                                        <Card.Meta title={<Link
                                                                            href={'/products/' + product.id}>{product.name}</Link>}
                                                                                   description={'Rs. ' + product.base_price}/>
                                                                        <div style={{marginTop: 20}}>
                                                                            <CartConsumer>
                                                                                {
                                                                                    cart => (
                                                                                        <Button onClick={() => {
                                                                                            cart.addToCart({
                                                                                                ...product,
                                                                                                quantity: 1
                                                                                            })
                                                                                        }} type={'default'} icon={
                                                                                            <ShoppingCartOutlined/>}>
                                                                                            Add to Cart
                                                                                        </Button>
                                                                                    )
                                                                                }
                                                                            </CartConsumer>
                                                                        </div>
                                                                    </Card>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            </Col>
                                        </>
                                    )
                                }
                            </Row>
                        )
                    }
                </ProductListConsumer>
            </GuestTwoColumnLayout>
        );
    }
}


StoreHomePage.contextType = ProductList;

export default StoreHomePage;