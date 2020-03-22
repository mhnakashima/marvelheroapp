import React, { Component } from 'react';
import './utils/css/utils.scss';
import './App.css';
import { ENDPOINT, PA, PP } from './utils/const';

const NumOfRegisters = 20;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    index: 0,
    isLoading: false,
    hasMoreData: true,
    heroes: [],
    contacts: [],
    form: {
      name: ''
    }
  }

  componentDidMount() {
    this.searchForHeroes();
  }

  setRoute(value) {
    this.props.history.push(`/heroes/${value}`);
  }

  searchForHeroes() {

    var heroPage = this.state.index * NumOfRegisters;

    this.setState(
      {
        isLoading: true
      }
    )

    fetch(`${ENDPOINT}characters?ts=1&apikey=${PA}&hash=${PP}&offset=${heroPage}`)
      .then(res => res.json())
      .then((data) => {

        var _heroes = [];
        console.log(data);

        data.data.results.forEach(item => {

          var sectionStyle = {
            backgroundImage: `url(${item.thumbnail.path + '.' + item.thumbnail.extension})`
          };

          _heroes.push(
            <div className="col-2 col-xs-2 col-sm-3 col-md-3 col-xl-4 element">
              <div key={'c' + item.id} className="card">
                <div key={'i' + item.id} className="card--avatar" style={sectionStyle} ></div>
                <div key={'d' + item.id} className="card--name">
                  {item.name}
                </div>

                <div className="card--actions">
                  <button className="btn btn-primary btn-sm" onClick={this.setRoute.bind(this, item.id)}>
                    View details
                  </button>
                </div>
              </div>
            </div>
          )
        });

        this.state.index++;

        this.setState({
          heroes: this.state.heroes.concat(_heroes),
          isLoading: false
        })

        if (this.state.index * NumOfRegisters >= data.data.total) {
          this.state.hasMoreData = false;
        }
      })
      .catch(console.log)
  }

  handleChange(event) {
    this.setState({
      form: {
        name: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setRoute(this.state.form.name);
  }

  render() {
    return (
      <div className="App">

        <div className="container">
          <div className="row">
            <div className="col-12 text-right">
              <form className="form-inline float-right" onSubmit={this.handleSubmit}>
                <input className="form-control mr-sm-2" value={this.state.form.name} type="search" placeholder="Search a Hero" aria-label="Search" onChange={this.handleChange} />
                <button className="btn btn-outline my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 col-xs-12">
              <h1 className="text--header">Marvel Heroes List</h1>
            </div>
          </div>

          <div className="row">
            {this.state.heroes}
          </div>
        </div>

        <div className="container more">
          <div className="row">
            <div className="col-12 col-xs-12">
              <button className="btn btn-primary " disabled={!this.state.hasMoreData} onClick={(e) => this.searchForHeroes()}>Carregar mais Herois</button>
            </div>
          </div>
        </div>

        {
          this.state.isLoading
            ? <div className="loading">Carregando Herois ... </div>
            : <div className="loading no-data">Loading</div>
        }

      </div>
    );
  }
}

export default App;

