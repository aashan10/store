import React from 'react';
import GuestTwoColumnLayout from "../../layouts/guest/two-column";
import {withRouter} from 'next/router';
import {Button, Card, Col, message, Row} from "antd";
import {CartConsumer} from '../../providers/cart/cart-provider';
import {ShoppingCartOutlined} from '@ant-design/icons';

class ProductViewPage extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            product: null
        }
    }

    componentDidMount() {

        const {id} = this.props.router.query;

        console.log(id);
        console.log('lmao');

        fetch('https://5ff74dede7164b0017e1a755.mockapi.io/api/v1/products/' + id).then(res => res.json()).then(product => {
            this.setState({product: product, loading: false});
        }).catch(err => {
            message.error('There was a problem loading the product data. Please try refreshing the page');
        });
    }

    render = () => {
        return (
            <GuestTwoColumnLayout>
                <Row>
                    <Col span={18} offset={3}>
                        <Row>
                            <Col span={12} sm={24} xs={24} lg={12} xl={12} style={{padding: 10}}>
                                <Card style={{width: '100%'}} hoverable={true} cover={
                                    <img alt={this.state.product ? this.state.product.sku : ''}
                                         src={this.state.product ? this.state.product.image : ''}/>
                                } bodyStyle={{padding: 0}}>
                                </Card>
                            </Col>
                            <Col span={12} sm={24} xs={24} lg={12} xl={12} style={{padding: 10}}>
                                <Card style={{width: '100%'}} title={this.state.product ? this.state.product.name : ''}
                                      headStyle={{border: 0}}>
                                    <div>
                                        {this.state.product ? this.state.product.description : ''}
                                    </div>

                                    <div>
                                        <CartConsumer>
                                            {
                                                cart => (
                                                    <Button type={'primary'} onClick={() => {
                                                        cart.addToCart({...this.state.product, quantity: 1})
                                                    }} icon={<ShoppingCartOutlined/>}>
                                                        Add to cart
                                                    </Button>
                                                )
                                            }
                                        </CartConsumer>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </GuestTwoColumnLayout>
        )
    }
}

export default withRouter(ProductViewPage);