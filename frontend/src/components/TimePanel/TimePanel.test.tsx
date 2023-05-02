import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { server } from '../../mocks/server'
import setup from '../../testUtils'
import TimePanel from './TimePanel'

describe('TimePanel', () => {
	it('should show a loading state whilst the data is being fetched', () => {
		// Setup
		server.use(
			rest.get('*/time', (req, res, ctx) => res(ctx.delay('infinite')))
		)
		setup(<TimePanel />)

		// Assert
		expect(screen.getByText('Fetching fresh data...')).toBeVisible()
	})

	it('should show 00:00:00 when the server time is the same as the local time', async () => {
		// Setup
		const mockDate = new Date('2023-01-01')
		const expectedTimestamp = '00:00:00'
		jest.useFakeTimers().setSystemTime(mockDate)
		server.use(
			rest.get('*/time', (req, res, ctx) =>
				res(ctx.json({ epoch: mockDate.getTime() / 1000 }))
			)
		)
		setup(<TimePanel />)

		// Assert
		expect(await screen.findByText(expectedTimestamp)).toBeInTheDocument()
	})

	it('should show 01:00:00 when the server time is 1 hour behind local time', async () => {
		// Setup
		const mockLocalDate = new Date('2023-01-01')
		const mockServerDate = mockLocalDate.getTime() / 1000 - 60 * 60
		const expectedTimestamp = '01:00:00'
		jest.useFakeTimers().setSystemTime(mockLocalDate)
		server.use(
			rest.get('*/time', (req, res, ctx) =>
				res(ctx.json({ epoch: mockServerDate }))
			)
		)
		setup(<TimePanel />)

		// Assert
		expect(await screen.findByText(expectedTimestamp)).toBeInTheDocument()
	})

	it('should update the difference timestamp once per second', async () => {
		// Setup
		const mockDate = new Date('2023-01-01')
		jest.useFakeTimers().setSystemTime(mockDate)
		server.use(
			rest.get('*/time', (req, res, ctx) =>
				res(ctx.json({ epoch: mockDate.getTime() / 1000 }))
			)
		)
		setup(<TimePanel />)

		// Assert
		expect(await screen.findByText('00:00:00')).toBeInTheDocument()

		jest.advanceTimersByTime(1000)
		expect(await screen.findByText('00:00:01')).toBeInTheDocument()

		jest.advanceTimersByTime(1000)
		expect(await screen.findByText('00:00:02')).toBeInTheDocument()
	})
})
