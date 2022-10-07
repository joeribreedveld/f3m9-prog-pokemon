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

	async componentWillMount() {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
		const data = await res.json()
		const pokemons = await data.results

		let shuffledPokemons = pokemons.sort(function () {
			return Math.random() - 0.5
		})

		for (let i = 0; i < 10; i++) {
			const res = await fetch(shuffledPokemons[i].url)
			const data = await res.json()
			console.log(data.name)
			this.setState({ pokemons: [...this.state.pokemons, data] })
		}
	}

	render() {
		const pokemonList = this.state.pokemons.map((pokemon) => {
			return (
				<>
					<li className='w-1/2'>
						<PokemonCard
							pokemonName={pokemon.name}
							pokemonType={pokemon.types}
							pokemonImage={pokemon.sprites.front_default}
							pokemonHP={pokemon.stats[0].base_stat}
							updateCatchCounter={this.updateCatchCount}
						/>
					</li>
				</>
			)
		})

		return (
			<>
				<div className='flex justify-around h-screen items-center p-8 gap-8 bg-gray-100'>
					<section className='w-1/2 bg-white p-8 h-full'>
						<ul className='flex flex-wrap justify-between'>{pokemonList}</ul>
					</section>
					<section className='w-1/2 bg-white p-8 h-full'>
						<CounterCard catchCount={this.state.catchCount} />
					</section>
				</div>
			</>
		)
	}
}

// Exports
export default Home
