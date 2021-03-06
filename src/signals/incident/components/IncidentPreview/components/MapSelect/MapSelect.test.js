// SPDX-License-Identifier: MPL-2.0
// Copyright (C)  - 2021 Gemeente Amsterdam
import { render, screen } from '@testing-library/react'

import incidentFixture from 'utils/__tests__/fixtures/incident.json'
import { withAppContext } from 'test/utils'
import MapSelect, { getLatlng, DEFAULT_COORDS } from './MapSelect'

describe('signals/incident/components/IncidentPreview/components/MapSelect/MapSelect', () => {
  it('renders correctly', () => {
    const value = ['foo', 'bar', 'baz']

    render(
      withAppContext(
        <MapSelect
          value={value}
          meta={{ endpoint: 'https://endpoint', idField: '' }}
          incident={incidentFixture}
        />
      )
    )

    expect(screen.getByText(value.join('; '))).toBeInTheDocument()
    expect(screen.getByTestId('mapSelect')).toBeInTheDocument()
  })

  it('returns a location', () => {
    expect(getLatlng(incidentFixture.location)).toEqual({
      latitude: incidentFixture.location.geometrie.coordinates[1],
      longitude: incidentFixture.location.geometrie.coordinates[0],
    })
  })

  it('returns default coords', () => {
    expect(getLatlng()).toEqual({
      latitude: DEFAULT_COORDS[1],
      longitude: DEFAULT_COORDS[0],
    })
  })
})
