// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2021 Gemeente Amsterdam
import { SnapPoint } from '@amsterdam/arm-core/lib/components/MapPanel/constants'
import { render, screen } from '@testing-library/react'
import { withAppContext } from 'test/utils'
import { MapPanelProvider } from '@amsterdam/arm-core'

import ViewerContainer from '..'

describe('ViewerContainer', () => {
  const button = <button type="button">Legend</button>

  it('should render drawer (mobile) variant of viewer container', () => {
    render(
      withAppContext(
        <MapPanelProvider variant="drawer" initialPosition={SnapPoint.Closed}>
          <ViewerContainer topLeft={button} />
        </MapPanelProvider>
      )
    )

    const viewerContainer = screen.getByTestId('viewer-container')
    expect(viewerContainer).toHaveStyle('left: 0')
    expect(viewerContainer).toHaveStyle('height: calc(100% - 70px)')
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render panel (desktop) variant of viewer container', () => {
    render(
      withAppContext(
        <MapPanelProvider variant="panel" initialPosition={SnapPoint.Closed}>
          <ViewerContainer topLeft={button} />
        </MapPanelProvider>
      )
    )

    const viewerContainer = screen.getByTestId('viewer-container')
    expect(viewerContainer).toHaveStyle('left: 30px')
    expect(viewerContainer).toHaveStyle('height: 100%')
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
