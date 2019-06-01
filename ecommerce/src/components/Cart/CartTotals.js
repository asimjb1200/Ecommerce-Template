import React from 'react'
import {Link} from 'react-router-dom'

export default function CartTotals({value}) {
    const {cartSubtotal, cartTax, cartTotal, clearCart} = value;
    return (
        <React.Fragment>
            <div className="container-fluid">
            <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-right">
                <Link to="/">
                    <button className="btn btn-outline-danger mb-3 px-5" type="button" onClick={() => clearCart()}>
                        Clear Cart
                    </button>
                </Link>
                <h5><span className="text-title">Subtotal:</span><strong>$ {cartSubtotal}</strong></h5>
                <h5><span className="text-title">Taxes:</span><strong>$ {cartTax}</strong></h5>
                <h5><span className="text-title">Total:</span><strong>$ {cartTotal}</strong></h5>
            
            </div>
            </div>    
            </div>         
        </React.Fragment>
    );
}