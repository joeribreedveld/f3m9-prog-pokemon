// Imports

// Functions
function CounterCard({ catchCount, caughtList }) {
	const pokemonList = caughtList.map((pokemon) => {
		return (
			<>
				<li className='flex flex-col justify-center align-center'>
					<h2 className='text-lg capitalize'>{pokemon.name}</h2>
					<img src={pokemon.image} alt='' />
				</li>
			</>
		)
	})
	return (
		<>
			<article className='h-screen flex flex-col items-center justify-center text-center'>
				<h2 className='mb-4'>Pokemon Caught</h2>
				<p className='text-5xl mb-16'>{catchCount}</p>
				<ul className='flex flex-wrap justify-center items-center gap-8'>{pokemonList}</ul>
			</article>
		</>
	)
}

// Exports
export default CounterCard
