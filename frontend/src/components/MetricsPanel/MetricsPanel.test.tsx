import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { server } from '../../mocks/server'
import setup from '../../testUtils'
import MetricsPanel from './MetricsPanel'

describe('Metrics Panel', () => {
	it('should show the data which comes back from the api', async () => {
		// Setup
		const mockMetrics = 'Metrics'
		server.use(
			rest.get('*/metrics', (req, res, ctx) => res(ctx.body(mockMetrics)))
		)
		setup(<MetricsPanel />)

		// Assert
		expect(await screen.findByText(mockMetrics)).toBeInTheDocument()
	})
})
