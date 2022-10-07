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
			caughtList: [],
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

	setCaughtList = async (data) => {
		await this.setState({ caughtList: [...this.state.caughtList, data] })
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
					<li className='w-full md:w-1/2 flex flex-col items-center justify-center'>
						<PokemonCard
							setCaughtList={this.setCaughtList}
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
					<li className='py-3 px-5 bg-gray-100 flex-grow rounded-md hover:bg-gray-200 active:bg-gray-300'>
						<button className='hover:underline capitalize' onClick={() => this.getTypePokemon(type.name)}>
							{type.name}
						</button>
					</li>
				</>
			)
		})

		return (
			<>
				<div className='flex flex-col md:flex-row min-h-screen h-full p-8 gap-8 bg-gray-100'>
					<section className='w-full md:w-1/2 bg-white p-8 h-full items-center text-center rounded-md'>
						<h1 className='mb-8 text-3xl font-bold'>Reactomon</h1>
						<h2 className='mb-6'>Select pokemon type:</h2>
						<ul className='mb-16 flex flex-wrap gap-6'>{typesList}</ul>
						<ul className='flex flex-wrap justify-between gap-y-16 items-center'>{pokemonList}</ul>
					</section>
					<section className='w-full md:w-1/2 bg-white p-8 text-3xl font-bold rounded-md'>
						<CounterCard catchCount={this.state.catchCount} caughtList={this.state.caughtList} />
					</section>
				</div>
			</>
		)
	}
}

// Exports
export default Home
