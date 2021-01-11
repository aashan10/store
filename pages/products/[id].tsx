import React from 'react';
import GuestTwoColumnLayout from "../../layouts/guest/two-column";
import {withRouter} from 'next/router';
import {Button, Card, Col, Image, message, Row, Skeleton, Dropdown, List, Space} from "antd";
import {CartConsumer} from '../../providers/cart/cart-provider';
import {ShoppingCartOutlined, HeartOutlined, FacebookOutlined, ShareAltOutlined} from '@ant-design/icons';
import Head from 'next/head';
import {CartItemInterface} from "../../types";

interface ProductViewPageState {
    loading: boolean,
    product: CartItemInterface
}

class ProductViewPage extends React.Component<any, ProductViewPageState> {
    static getInitialProps: ({query: {id}}: { query: { id: any } }) => { id: any };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            product: null
        }
    }

    componentDidMount() {

        const {id} = this.props.router.query;

        fetch('https://5ff74dede7164b0017e1a755.mockapi.io/api/v1/products/' + id).then(res => res.json()).then(product => {
            setTimeout(() => {
                this.setState({product: product, loading: false});
            }, 1000);
        }).catch(err => {
            message.error('There was a problem loading the product data. Please try refreshing the page');
        });
    }

    render = () => {

        const {loading, product} = this.state;

        return (
            <GuestTwoColumnLayout>
                <Row style={{margin: 5}} className={'pdp-content'} gutter={[5, 5]}>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12} span={24}>
                        <Card className={'pdp-product-image-carousel'} bordered={false} hoverable headStyle={{height: 500}} style={{borderRadius: 10, overflow: "hidden"}}
                              cover={
                                  <Image
                                      src={loading ? '' : 'https://picsum.photos/800/500?text=' + product.name}
                                      placeholder={''}
                                      srcSet={'https://picsum.photos/300/200, https://picsum.photos/500/300, https://picsum.photos/800/500'}/>
                              }>
                            <Row>
                                <Skeleton loading={loading} active={loading}/>
                                <Skeleton loading={loading} active={loading}/>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} span={24}>
                        <Card bordered={false} hoverable actions={[
                            <CartConsumer>
                                {
                                    cart => (
                                        <Button disabled={loading} type={'link'} block onClick={() => {
                                            cart.addToCart({...product, quantity: 1});
                                        }} icon={<ShoppingCartOutlined/>}>
                                            Add to Cart
                                        </Button>
                                    )
                                }
                            </CartConsumer>,
                            <Button disabled={loading} type={'link'} block icon={<HeartOutlined/>}>Add To
                                Wishlist</Button>,
                            <Dropdown arrow placement={'bottomRight'} overlay={
                                <Card bordered={false}>
                                    <List>
                                        <List.Item onClick={() => {
                                            window.location.reload()
                                        }}>
                                            <Button type={'link'} icon={<FacebookOutlined/>}>Share to
                                                Facebook</Button>
                                        </List.Item>
                                    </List>
                                </Card>
                            }>
                                <Button type={'link'} block icon={<ShareAltOutlined/>}>Share</Button>
                            </Dropdown>,
                        ]}>
                            <Skeleton loading={loading} active={loading}/>

                            {
                                !loading ? (
                                    <div>
                                        <Card.Meta title={product.name} description={product.description}/>
                                    </div>
                                ) : ''
                            }
                        </Card>
                    </Col>
                </Row>
            </GuestTwoColumnLayout>
        )
    }
}

ProductViewPage.getInitialProps = ({query: {id}}) => {
    return {id}
}

export default withRouter(ProductViewPage);