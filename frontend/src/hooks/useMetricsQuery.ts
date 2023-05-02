import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

const useMetricsQuery = () => {
	const getMetrics = () =>
		axios<string>({
			method: 'get',
			url: 'http://localhost:3000/metrics',
			headers: { Authorization: process.env.REACT_APP_AUTH_TOKEN }
		})

	return useQuery<AxiosResponse<string, any>>(['metrics'], getMetrics, {
		refetchInterval: 30000,
		refetchIntervalInBackground: true,
		staleTime: Infinity
	})
}

export default useMetricsQuery
