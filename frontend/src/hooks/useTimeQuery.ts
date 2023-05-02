import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

type TimeResponse = {
	epoch: number
}

const useTimeQuery = () => {
	const getTime = () =>
		axios<TimeResponse>({
			method: 'get',
			url: 'http://localhost:3000/time',
			headers: { Authorization: process.env.REACT_APP_AUTH_TOKEN }
		})

	return useQuery<AxiosResponse<TimeResponse, any>>(['time'], getTime, {
		refetchInterval: 30000,
		refetchIntervalInBackground: true,
		staleTime: Infinity
	})
}

export default useTimeQuery
