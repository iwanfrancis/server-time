import clsx from 'clsx'
import React from 'react'
import useTimeDifference from '../../hooks/useTimeDifference'
import useTimeQuery from '../../hooks/useTimeQuery'

const TimePanel = () => {
	const { data: serverTime, isFetching: isFetchingTime } = useTimeQuery()
	const differenceTimestamp = useTimeDifference(serverTime?.data.epoch)

	return (
		<div
			className={clsx(
				'flex h-full flex-col items-center justify-center space-y-4 border-b border-r p-4 transition-opacity',
				{ 'opacity-30': isFetchingTime }
			)}
		>
			<div className='text-center'>
				<span className='block text-lg'>Last server time (epoch seconds):</span>
				<span className='block h-8 text-2xl'>{serverTime?.data.epoch}</span>
			</div>
			<div className='text-center'>
				<span className='block text-lg'>Difference from server time:</span>
				<span className='block h-8 text-2xl'>{differenceTimestamp}</span>
			</div>
			<span
				className={clsx({
					invisible: !isFetchingTime
				})}
			>
				Fetching fresh data...
			</span>
		</div>
	)
}

export default TimePanel
