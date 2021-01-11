import React from 'react';
import {GuestTwoColumnLayout} from "../layouts";
import {Avatar, Button, Card, Col, Image, List, Popconfirm, Row, Table} from "antd";
import {CartConsumer} from '../providers/cart/cart-provider';
import {CloseCircleFilled} from "@ant-design/icons";
import Link from 'next/link';

class CartPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <GuestTwoColumnLayout>
                <Row style={{marginTop: 15}}>
                    <Col offset={4} span={16}>
                        <CartConsumer>
                            {
                                cart => (
                                    <Card hoverable cover={<Table dataSource={cart.items} columns={[
                                        {
                                            title: '', dataIndex: 'id', key: 'id', render: (index, item) => {
                                                return (
                                                    <Image style={{height: 60, width: 60}} src={item.image}/>
                                                )
                                            }
                                        },
                                        {
                                            title: 'Product Name',
                                            dataIndex: 'name',
                                            key: 'id',
                                            render: (index, item) => {
                                                return (
                                                    <Link href={'/products/' + item.id}>{item.name}</Link>
                                                )
                                            }
                                        },
                                        {
                                            title: 'Quantity',
                                            dataIndex: 'quantity',
                                            key: 'id',
                                            render: (index, item) => {
                                                return (
                                                    <strong>{item.quantity}</strong>
                                                )
                                            }
                                        },
                                        {
                                            title: 'Price per Item',
                                            dataIndex: 'base_price',
                                            key: 'id',
                                            render: (index, item) => {
                                                return (
                                                    <strong>Rs. {item.base_price}</strong>
                                                )
                                            }
                                        },
                                        {
                                            title: 'Total',
                                            dataIndex: 'total_price',
                                            key: 'id',
                                            render: (index, item) => {
                                                return (
                                                    <strong>Rs. {item.base_price * item.quantity}</strong>
                                                )
                                            }
                                        },
                                        {
                                            title: 'Action',
                                            dataIndex: 'action',
                                            key: 'id',
                                            render: (index, item) => {
                                                return (
                                                    <Popconfirm onConfirm={() => {
                                                        cart.removeFromCart(item);
                                                    }} placement={'left'} title={'Remove ' + item.name + ' from cart?'}>
                                                        <Button icon={<CloseCircleFilled/>} type={'link'} danger/>
                                                    </Popconfirm>
                                                )
                                            }
                                        },
                                    ]} pagination={false} size={'large'}/>}>
                                        <List>
                                            {
                                                cart.items.length ? (
                                                    <List.Item>
                                                        <List.Item.Meta title={'Subtotal'}/>
                                                        <strong>
                                                            {'Rs. ' + cart.items.reduce((prev, curr) => {
                                                                return prev + (curr.base_price * curr.quantity);
                                                            }, 0)}
                                                        </strong>
                                                    </List.Item>
                                                ) : ''
                                            }
                                        </List>
                                    </Card>
                                )
                            }
                        </CartConsumer>
                    </Col>
                </Row>
            </GuestTwoColumnLayout>
        )
    }
}

export default CartPage;