import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

class PokemonList extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            pokemons: [],
            newUrl: ''
        }
        this.selectPokemon = this.selectPokemon.bind(this);
    }

    selectPokemon(index) {
        this.props.onSelectPokemon(this.state.pokemons[index].url);
    }

    componentDidMount() {
        this.fetchMorePokemons();
    }

    fetchMorePokemons = () => {
        if (this.state.loading) {
            return;
        }

        this.setState({
            loading: true,
        });
        let url = "https://pokeapi.co/api/v2/pokemon/";
        if (this.state.newUrl !== '') {
            url = this.state.newUrl;
        }

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    loading: false,
                    pokemons: this.state.pokemons.concat(result.results),
                    newUrl: result.next
                });
            },
                (error) => {
                    console.log(error);
                }
            );
    };

    render() {
        return (
            <InfiniteScroll
            dataLength={this.state.pokemons.length}
            next={this.fetchMorePokemons}
            hasMore={true}
            loader={<h4>Cargando...</h4>}
            scrollableTarget={this.props.onScrollableTarget}
            >
                {this.state.pokemons.map((a_pokemon, index) => (
                    <div className="card mt-2" key={index}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-10 text-left text-capitalize">
                                    <h5>{a_pokemon.name}</h5>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-md btn-info" onClick={() => this.selectPokemon(index)}>
                                        Ver
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        );
    }
}

export default PokemonList;