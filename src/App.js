import './App.css';
import { Component } from 'react';
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail';

class App extends Component {

  constructor() {
    super();
    this.state = {
      pokemonUrlSelected : '',
      filtroPokemon: ''
    }
    this.selectPokemon = this.selectPokemon.bind(this);
    this.filtrarPokemon = this.filtrarPokemon.bind(this);
  }

  selectPokemon(url) {
    this.setState({
      pokemonUrlSelected: url
    });
  }

  filtrarPokemon(e) {
    const { value } = e.target;
    if (value !== '') {
      this.setState({
        pokemonUrlSelected: "https://pokeapi.co/api/v2/pokemon/" + value
      });
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light text-center">
          <h1 className="text-center">Pokedex</h1>
        </nav>
        <hr />
        <div className="row mt-2">
          <div className="col-md-12 mb-4">
            <input className="form-control" type="text" name="filtroPokemon" placeholder="Filtro pokemon" onChange={this.filtrarPokemon} />
          </div>
          <div id="pokemon-list" className="col-md-8 text-center pokemon-list">
            <PokemonList onSelectPokemon={this.selectPokemon} onScrollableTarget="pokemon-list" />
          </div>
          <div className="col-md-4">
            <PokemonDetail pokemonUrl={this.state.pokemonUrlSelected} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
