import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';

export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm  px-sm-5">
                {/* https://www.iconfinder.com/icons/1243689/call_phone_icon Creative Commons (Attribution 3.0 Unported); https://www.iconfinder.com/Makoto_msk */}
            
                <Link to='/'> <img src={logo} alt="store" className="navbar-brand" /> </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">Products</Link>
                    </li>
                </ul>
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">
                        <i className="fas fa-cart-plus" />
                        </span>
                        My cart
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
background: var(--mainDark);
.nav-link{
    color: var(--mainWhite);
    font-size: 1.1rem;
}
`

//Making a styled button component
export const ButtonContainer = styled.button`
text-transfrom: capitalize;
font-size: 1.4rem;
background-color: transparent

border-color: ${props => props.cart ? "var(--mainBlue)":"var(--lightBlue)"};
color: ${prop => prop.cart ? "var(--mainBlue)": "var(--lightBlue)"};
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor:pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
transition: all 0.3s ease-in-out;

&:hover{
    background: ${prop => prop.cart ? "var(--mainBlue)": "var(--lightBlue)"};
    color: var(--mainWhite);
}
&:focus{
    outline:none;
}
`


