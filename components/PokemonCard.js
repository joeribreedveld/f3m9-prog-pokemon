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
			ran: false,
			caught: false,
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
			this.setState({ caught: true })
		} else {
			this.setState({ ran: true })
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
					<ul className='flex gap-8 mt-4 lg:flex-row md:flex-col flex-row'>
						<li>
							<button className='py-4 px-4 rounded-md bg-blue-100 hover:bg-blue-200 active:bg-blue-300' onClick={this.catch}>
								Catch
							</button>
						</li>
						<li>
							<button className='py-4 px-4 rounded-md bg-orange-100 hover:bg-orange-200 active:bg-orange-300' onClick={this.attack}>
								Attack
							</button>
						</li>
					</ul>
				</>
			)
		}

		return (
			<>
				<article className='w-1/2 flex flex-col items-center justify-center'>
					<h2 className='font-bold capitalize text-lg'>{this.props.pokemonName}</h2>
					<img className='w-full h-full' src={this.props.pokemonImage} alt='' />
					<p className='mb-4'>Health: {this.state.hp}</p>
					{this.state.ran === true ? <p className='capitalize text-red-400'>{this.props.pokemonName} ran away!</p> : ""}
					{this.state.caught === true ? <p className='text-green-400'>You caught a {this.props.pokemonName}!</p> : ""}
					{buttons}
				</article>
			</>
		)
	}
}

// Exports
export default PokemonCard
