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
		}
	}

	updateCatchCounter = () => {
		this.setState({
			catchCounter: this.state.catchCounter + 1,
		})
	}

	render() {
		let pokemon = null

		for (let i = 0; i < 4; i++) {
			const pokemonID = Math.floor(Math.random() * (21 - 1) + 1)
			getPokemon(pokemonID)
		}

		async function getPokemon(pokemonID) {
			const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonID)
			const data = await res.json()
			console.log(data.name)
		}

		return (
			<>
				<PokemonCard updateCatchCount={this.updateCatchCount} />
				<CounterCard catchCount={this.state.catchCount} />
				{pokemon}
			</>
		)
	}
}

// Exports
export default Home
