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
		return (
			<>
				<PokemonCard updateCatchCount={this.updateCatchCount} />
				<CounterCard catchCount={this.state.catchCount} />
			</>
		)
	}
}

// Exports
export default Home
