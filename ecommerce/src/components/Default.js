import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <div className="container text-center my-5">
                <h3><strong>404 Error</strong> <br /> the requested page was not Found: <h2 className="text-danger">"{this.props.location.pathname}"</h2></h3>
            </div>
        )
    }
}
