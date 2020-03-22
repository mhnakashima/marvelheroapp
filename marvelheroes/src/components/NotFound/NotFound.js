import React, { Component } from 'react';
import Mickey from './../../assets/images/mickey.png';
import './../../main.scss';
import './NotFound.scss';

class NotFound extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center holder">
                        <img src={Mickey} />
                        <h2 className="text text--notFound">
                            Não encontrado, arra! 
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;