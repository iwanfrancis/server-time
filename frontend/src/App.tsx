import React from 'react'
import MetricsPanel from './components/MetricsPanel/MetricsPanel'
import TimePanel from './components/TimePanel/TimePanel'

const App = () => (
	<div className='fixed h-full w-full overflow-scroll'>
		<div className='grid h-full w-full grid-cols-1 md:grid-cols-2'>
			<TimePanel />
			<MetricsPanel />
		</div>
	</div>
)

export default App
