import React from 'react';
import {message} from "antd";

const ProductList = React.createContext<Partial<any>>({})


class ProductListProvider extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            allProducts: [],
            filteredProducts: [],
            loading: true,
            applyFilter: this.applyFilter
        }
    }


    componentDidMount() {
        fetch('https://5ff74dede7164b0017e1a755.mockapi.io/api/v1/products').then(response => response.json()).then(products => {
            this.setState({
                loading: false,
                allProducts: products,
                filteredProducts: products
            });
        }).catch(err => {
            message.error('There was a problem loading products! Please refresh the page.');
            this.setState({
                loading: false
            });
        });
    }


    applyFilter = (filters: [{ field: string, condition: string, value: string | number | boolean }]) => {
        const {allProducts} = this.state;
        const products = [];
        filters.map(filter => {
            const {field, condition, value} = filter;

            allProducts.map(product => {
                if (product[field]) {
                    switch (condition) {
                        case '=':
                            product[field] === value ? products.push(product) : '';
                            break;
                        case '>':
                            product[field] > value ? products.push(product) : '';
                            break;

                        case '<':
                            product[field] < value ? products.push(product) : '';
                            break;
                        default:
                            message.error('invalid filter applied');
                    }
                }
            });

            this.setState({filteredProducts: products});
        });
    }


    render = () => {
        return (
            <ProductList.Provider value={this.state}>
                {this.props.children}
            </ProductList.Provider>
        )
    }
}


const ProductListConsumer = ProductList.Consumer;


export {ProductListConsumer, ProductListProvider, ProductList};