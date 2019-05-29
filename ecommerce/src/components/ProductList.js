import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';

export default class ProductList extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="py-5">
            <div className="container-fluid">
                <Title name="our" title="products" />

            <div className="row">
                <ProductConsumer>
                    {(value) => {
                        return value.products.map( product => {//each item is stored in the object's 'products' array
                            return <Product key={product.id} product={product} /> //give each individual item "{product}" in the object to the product component for display
                        });
                    }}
                </ProductConsumer>
            </div>
            </div>
            </div>
            </React.Fragment>
        )
    }
}
