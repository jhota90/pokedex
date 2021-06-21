import React, { Component } from 'react';

class PokemonList extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            pokemons: []
        }
        this.selectPokemon = this.selectPokemon.bind(this);
    }

    selectPokemon(index) {
        this.props.onSelectPokemon(this.state.pokemons[index].url);
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
        fetch("https://pokeapi.co/api/v2/pokemon/")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    loading: false,
                    pokemons: result.results
                });
            },
            (error) => {
                this.setState({
                    loading: false                    
                });
            }
        );
    }

    render() {
        const pokemons = this.state.pokemons.map((a_pokemon, i) => {
            return (
                <div className="col-3" key={i}>
                    <div className="card mt-4">
                        <div className="card-header text-capitalize">
                            <h5>{a_pokemon.name}</h5>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-md btn-info" onClick={() => this.selectPokemon(i)}>
                                Ver
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="row">
                {pokemons}
            </div>
        );
    }
}

export default PokemonList;