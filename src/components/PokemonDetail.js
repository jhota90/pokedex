import React, { Component } from 'react';

class PokemonDetail extends Component {

    constructor() {
        super();
        this.state = {
            url: '',
            sprites: '',
            id: '',
            name: '',
            type: '',
            abilities: []
        }
    }

    componentDidUpdate() {
        if (this.filtroPokemon !== this.props.filtroPokemon && this.props.filtroPokemon !== '' && this.props.filtroPokemon !== undefined) {
            this.filtroPokemon = this.props.filtroPokemon;
            let url = "https://pokeapi.co/api/v2/pokemon/" + this.filtroPokemon;
            fetch(url)
                .then(res => res.json())
                .then((result) => {
                    const { id, name, abilities, types, sprites } = result;
                    this.setState({
                        sprites: sprites,
                        id: id,
                        name: name,
                        url: this.filtroPokemon,
                        type: types[0].type.name,
                        'abilities': abilities
                    });
                },
                    (error) => {
                        this.setState({
                            url: '',
                            sprites: '',
                            id: '',
                            name: '',
                            type: '',
                            abilities: []
                        });
                    }
                );
        } else if (this.props.pokemonUrl !== this.state.url && this.props.pokemonUrl !== '' && this.props.pokemonUrl !== undefined) {
            fetch(this.props.pokemonUrl)
                .then(res => res.json())
                .then((result) => {
                    const { id, name, abilities, types, sprites } = result;
                    this.setState({
                        sprites: sprites,
                        id: id,
                        name: name,
                        url: this.props.pokemonUrl,
                        type: types[0].type.name,
                        'abilities': abilities
                    });
                },
                    (error) => {
                        this.setState({
                            url: '',
                            sprites: '',
                            id: '',
                            name: '',
                            type: '',
                            abilities: []
                        });
                    }
                );
        }
    }

    render() {
        const pokemon_abilities = this.state.abilities.map((an_ability, key_ability) => {
            return (
                <li key={key_ability} className="list-group-item text-capitalize">{an_ability.ability.name}</li>
            );
        });

        if (!this.state.url) {
            return (
            <div className="card mt-2">
                <div className="card-header">
                    <h3 className="text-center">Selecciona un Pokemon</h3>
                </div>
            </div>);
        } else  return (
            <div className="card mt-2">
                <div className="card-header">
                    <img src={this.state.sprites.front_default} alt="" />
                    <img src={this.state.sprites.back_default} alt="" />
                    <h3 className="text-capitalize">{this.state.id}. {this.state.name}</h3>
                </div>
                <div className="card-body">
                    <h5>Habilidades</h5>
                    <ul className="list-group list-group-flush">
                        {pokemon_abilities}
                    </ul>
                </div>
                <div className="card-footer">
                    <p className="text-capitalize">{this.state.type}</p>
                </div>
            </div>
            
        );
    }
}

export default PokemonDetail;