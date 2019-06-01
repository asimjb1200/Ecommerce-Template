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
        cartSubtotal: 0,
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
            () => {// Callback function to run after set state is done
                this.addTotals();
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
        let tempCart = [...this.state.cart];
        const selectedItem = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedItem);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.price * product.count;

        this.setState(() => {
            return {
                cart: [...tempCart] 
            }}, () => {//Call back
                this.addTotals();
            }
        );
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedItem = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedItem);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id);
        }
        product.total = product.price * product.count;
    }

    removeItem = (id) => {
        let tempProducts =[...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);//only return items that don't match the id we passed in
        
        //restore the product's default attributes when removing it from the cart
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],
            }
        }, () => {
            this.addTotals();//to make sure the totals are correct after each removal
            }
        );
    }

    clearCart = () => {
        this.setState(() => {
            return {cart: []}
        }, () => {
            this.setProducts();//give the program a fresh set of products with default attributes
            this.addTotals();//make sure the cart totals are back to 0
        });
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => { return (subTotal += item.total) } );
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total,
            }
        })
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