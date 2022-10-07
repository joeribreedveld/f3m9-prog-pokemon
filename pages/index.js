// Imports
import CounterCard from "../components/CounterCard"
import PokemonCard from "../components/PokemonCard"
import React from "react"

// Functions
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			catchCount: 0,
			pokemons: [],
		}
	}

	updateCatchCount = () => {
		this.setState({
			catchCount: this.state.catchCount + 1,
		})
	}

	componentDidMount() {
		this.fetchPokemons()
	}

	async fetchPokemons() {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
		const data = await res.json()
		const pokemons = data.results

		pokemons.forEach(async (pokemon) => {
			const res = await fetch(pokemon.url)
			const data = await res.json()
			console.log(data.name)
			this.setState({ pokemons: [...this.state.pokemons, data] })
		})
	}

	render() {
		const pokemonList = this.state.pokemons.map((pokemon) => {
			return (
				<>
					<PokemonCard
						pokemonName={pokemon.name}
						pokemonType={pokemon.types}
						pokemonImage={pokemon.sprites.front_default}
						pokemonHP={pokemon.stats[0].base_stat}
						updateCatchCounter={this.updateCatchCount}
					/>
				</>
			)
		})

		return (
			<>
				{pokemonList}
				<CounterCard catchCount={this.state.catchCount} />
			</>
		)
	}
}

// Exports
export default Home
