import { useEffect, useState } from 'react'

const getDifferenceTimestamp = (serverTimeEpoch: number) => {
	const currentLocalTime = new Date()
	const currentServerTime = new Date(serverTimeEpoch * 1000)
	const difference = Math.round(
		currentLocalTime.getTime() - currentServerTime.getTime()
	)
	const diffTimestamp = new Date(difference).toISOString().substring(11, 19)
	return diffTimestamp
}

const useTimeDifference = (serverTimeEpoch?: number) => {
	const [differenceTimestamp, setDifferenceTimestamp] = useState<
		string | undefined
	>()

	useEffect(() => {
		if (serverTimeEpoch) {
			setDifferenceTimestamp(getDifferenceTimestamp(serverTimeEpoch))
		}

		const interval = setInterval(() => {
			if (serverTimeEpoch) {
				setDifferenceTimestamp(getDifferenceTimestamp(serverTimeEpoch))
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [serverTimeEpoch])

	return differenceTimestamp
}

export default useTimeDifference
