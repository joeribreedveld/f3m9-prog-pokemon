// Imports

// Functions
function CounterCard({ catchCount }) {
	return (
		<>
			<article className='h-screen flex flex-col items-center justify-center'>
				<h2 className='mb-4'>Pokemon Caught</h2>
				<p className='text-5xl'>{catchCount}</p>
			</article>
		</>
	)
}

// Exports
export default CounterCard
