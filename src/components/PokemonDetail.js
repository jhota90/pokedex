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
        console.log(this.props.pokemonUrl, this.state.url);
        if (this.props.pokemonUrl !== this.state.url && this.props.pokemonUrl !== '' && this.props.pokemonUrl !== undefined) {
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
                            url: this.props.pokemonUrl,
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
            return an_ability.ability.name;
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
                <div className="card-header text-center">
                    <img src={this.state.sprites.front_default} alt="" />
                    <img src={this.state.sprites.back_default} alt="" />
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush text-capitalize">
                        <li className="list-group-item"><strong>Id:</strong> {this.state.id}</li>
                        <li className="list-group-item"><strong>Name:</strong> {this.state.name}</li>
                        <li className="list-group-item"><strong>Type:</strong> {this.state.type}</li>
                        <li className="list-group-item"><strong>Ability:</strong> {pokemon_abilities.join(', ')}</li>
                    </ul>
                </div>
            </div>
            
        );
    }
}

export default PokemonDetail;