import React, { Component } from 'react';
import { ENDPOINT, PA, PP } from '../../utils/const';
import './hero.scss';
import './../../utils/css/utils.scss';

class Hero extends Component {

    state = {
        id: 0,
        searchField: 'id',
        data: []
    }

    constructor(props) {
        super(props);
        this.state.id = this.props.match.params.id;
        this.state.searchField = isNaN(this.state.id) ? 'name' : 'id';
    }

    componentDidMount() {
        this.searchHeroesById();
    }

    searchHeroesById() {
        fetch(`${ENDPOINT}characters?ts=1&apikey=${PA}&hash=${PP}&${this.state.searchField}=${this.state.id}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);

                var items = data.data.results;
                var _renderPage = [];
                var _tags = [];

                items.forEach(element => {

                    var sectionStyle = {
                        backgroundImage: `url(${element.thumbnail.path + '.' + element.thumbnail.extension})`
                    };

                    element.comics.items.forEach(comic => {
                        _tags.push(
                            <span className="badge badge-primary">
                                {comic.name}
                            </span>
                        );
                    });

                    _renderPage.push(
                        <div className="Hero">
                            <div className="hero">
                                <div key={'i' + element.id} className="hero--image" style={sectionStyle} ></div>

                                <h2 className="hero--name">{element.name}</h2>
                            </div>

                            <div className="card hero--section">
                                <h3 className="hero--subtitle">Histórias que ele aparece: </h3>

                                {
                                    element.comics.items.length > 0
                                        ?
                                        <div className="badges">
                                            {_tags}
                                        </div>

                                        :   
                                        <div className="no--data">
                                            sem dados para exibir
                                        </div>
                                }   

                            </div>

                        </div>

                    );

                });

                this.setState({
                    data: _renderPage
                })

            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {this.state.data}
                    </div>
                </div>
            </div>
        )
    }
}

export default Hero;