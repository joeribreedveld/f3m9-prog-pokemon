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
			types: [],
		}
	}

	updateCatchCount = () => {
		this.setState({
			catchCount: this.state.catchCount + 1,
		})
	}

	async getPokemon() {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
		const data = await res.json()
		const pokemons = await data.results

		let shuffledPokemons = pokemons.sort(function () {
			return Math.random() - 0.5
		})

		shuffledPokemons.length = 10

		for (let i = 0; i < 10; i++) {
			const res = await fetch(shuffledPokemons[i].url)
			const data = await res.json()
			this.setState({ pokemons: [...this.state.pokemons, data] })
		}
	}

	async getTypes() {
		const res = await fetch("https://pokeapi.co/api/v2/type")
		const data = await res.json()
		const types = await data.results
		types.length = 18
		this.setState({ types: types })
	}

	async getTypePokemon(type) {
		await this.setState({ pokemons: [] })
		const res = await fetch("https://pokeapi.co/api/v2/type/" + type)
		const data = await res.json()
		const pokemons = await data.pokemon

		let shuffledPokemons = pokemons.sort(function () {
			return Math.random() - 0.5
		})

		shuffledPokemons.length = 10

		for (let i = 0; i < 10; i++) {
			const res = await fetch(shuffledPokemons[i].pokemon.url)
			const data = await res.json()
			this.setState({ pokemons: [...this.state.pokemons, data] })
		}
	}

	componentDidMount() {}

	UNSAFE_componentWillMount() {
		this.getPokemon()
		this.getTypes()
	}

	render() {
		const pokemonList = this.state.pokemons.map((pokemon) => {
			return (
				<>
					<li className='w-full md:w-1/2'>
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

		const typesList = this.state.types.map((type) => {
			return (
				<>
					<li>
						<button className='hover:underline' onClick={() => this.getTypePokemon(type.name)}>
							{type.name}
						</button>
					</li>
				</>
			)
		})

		return (
			<>
				<div className='flex flex-col md:flex-row justify-around min-h-screen items-center p-8 gap-8 bg-gray-100'>
					<section className='w-full md:w-1/2 bg-white p-8 min-h-screen items-center text-center'>
						<ul className='mb-8'>{typesList}</ul>
						<ul className='flex flex-wrap justify-between'>{pokemonList}</ul>
					</section>
					<section className='w-full md:w-1/2 bg-white p-8 min-h-screen flex justify-center items-center flex-col text-3xl font-bold'>
						<CounterCard catchCount={this.state.catchCount} />
					</section>
				</div>
			</>
		)
	}
}

// Exports
export default Home
