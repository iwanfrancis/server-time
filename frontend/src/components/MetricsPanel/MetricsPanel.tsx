import clsx from 'clsx'
import React from 'react'
import useMetricsQuery from '../../hooks/useMetricsQuery'

const MetricsPanel = () => {
	const { data: metrics, isFetching: isFetchingMetrics } = useMetricsQuery()

	return (
		<div
			className={clsx(
				'flex h-full overflow-scroll bg-slate-100 p-4 transition-opacity',
				{
					'opacity-30': isFetchingMetrics
				}
			)}
		>
			<code className='block whitespace-pre'>{metrics?.data}</code>
		</div>
	)
}

export default MetricsPanel
