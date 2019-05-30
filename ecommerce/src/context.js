import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider - will provide all info/data for the application
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: storeProducts,
        modalOpen: false,
        modalProd: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };

    componentDidMount() {
        this.setProducts();//once the component mounts, pass the data by value instead of reference
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};//copy each item from the original data set
            tempProducts = [...tempProducts, singleItem];//this array will hold all of the copied values
        })
        this.setState(() =>{
            return {products: tempProducts}//now we've passed the items by value instead of reference to save the original data
        })
    }

    getItem = (id) => {
        //only return the item who's id matches the one that was passed in
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() =>{
            return {detailProduct: product}//give the entire product object to the detail attribute, we can parse for the object's info attribute later
        })
    }

    addToCart =(id) => {
        let tempProducts = [...this.state.products]; //fill array with all of the existing products, passing by value to avoid the original data
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        //now change values in state
        this.setState( () => {
            return {products: tempProducts,
                    cart: [...this.state.cart, product] };
        },
        () => {
            console.log(this.state);
        }

        );
    }

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProd: product, modalOpen: true}
        })
    }

    closeModal = () => {
        this.setState( () => {
            return {modalOpen: false}
        })
    }

    increment = (id) => {
        console.log('this is increment method');
    }

    decrement = (id) => {
        console.log('Decrement Method');
    }

    removeItem = (id) => {
        console.log('item removed');
    }

    clearCart = () => {
        console.log('cart was cleared');
    }
    
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, //adding the whole state object to the value prop (functions have to be manually stated below)
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer =ProductContext.Consumer;

export {ProductProvider, ProductConsumer};