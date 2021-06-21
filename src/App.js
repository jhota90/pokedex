import './App.css';
import { Component } from 'react';
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail';

class App extends Component {

  constructor() {
    super();
    this.state = {
      pokemonUrlSelected : null
    }
    this.selectPokemon = this.selectPokemon.bind(this);
  }

  selectPokemon(url) {
    this.setState({
      pokemonUrlSelected: url
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-8 text-center pokemon-list">
            <PokemonList onSelectPokemon={this.selectPokemon} />
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
