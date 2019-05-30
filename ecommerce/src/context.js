import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider - will provide all info/data for the application
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProd: detailProduct,
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

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, //adding the whole state object to the value prop
                detailProduct: this.state.detailProduct,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer =ProductContext.Consumer;

export {ProductProvider, ProductConsumer};