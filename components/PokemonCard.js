// Imports
import React from "react"

// Functions
class PokemonCard extends React.Component {
	// Constructor
	constructor(props) {
		super(props)
		this.state = {
			hp: 0,
			caughtOrRan: false,
		}
	}

	// Component Did Mount
	componentDidMount() {
		this.setState({
			hp: this.props.pokemonHP,
		})
	}

	// Attack
	attack = () => {
		let randomNumber = Math.floor(Math.random() * (31 - 1) + 1)
		this.setState(
			{
				hp: this.state.hp - randomNumber,
			},
			function () {
				if (this.state.hp <= 0) {
					this.setState({
						hp: 0,
						caughtOrRan: true,
					})
				}
			}
		)
	}

	// Catch
	catch = () => {
		this.setState({ caughtOrRan: true })
		let damagePercentage = 100 - Math.floor((this.state.hp / this.props.pokemonHP) * 100)
		let dice = Math.floor(Math.random() * (100 - 1) + 1)
		if (damagePercentage > dice) {
			this.props.updateCatchCounter()
		}
	}

	// Render
	render() {
		// let types = this.props.pokemonType.map(function (type) {
		// 	return (
		// 		<span key={type} className={`pokemonCard__type pokemonCard__type--${type}`}>
		// 			{type}
		// 		</span>
		// 	)
		// })
		let buttons = null
		if (this.state.caughtOrRan === false) {
			buttons = (
				<>
					<button onClick={this.attack} className=''>
						Attack
					</button>
					<button onClick={this.catch} className=''>
						Catch
					</button>
				</>
			)
		}

		return (
			<>
				<article className='w-1/2'>
					<h2>{this.props.pokemonName}</h2>
					<img className='w-full h-full' src={this.props.pokemonImage} alt='' />
					<p>{this.state.hp}</p>
					{buttons}
				</article>
			</>
		)
	}
}

// Exports
export default PokemonCard
