import React from 'react'
import YourComponent from './YourComponent'

export default function App() {
	return (
		<div className='h-[100vh]'>
			<h1 className='text-center text-3xl pb-10 pt-4'>
				Financial Time Series Plotting with React and Chart.js
			</h1>

			<div className='w-3/4 m-auto p-10 border-4 border-dashed'>
				<YourComponent ticker="AAPL" concept="Revenues" />
			</div>
		</div>
	)
}
