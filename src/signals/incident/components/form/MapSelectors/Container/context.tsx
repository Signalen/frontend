// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2021 Gemeente Amsterdam
import type { FunctionComponent } from 'react'
import { createContext } from 'react'
import type { ContainerSelectValue } from './types'

export const initialValue: ContainerSelectValue = {
  selection: [],
  location: [0, 0],
  meta: { endpoint: '', featureTypes: [], wfsFilter: '' },
  message: undefined,
  update: /* istanbul ignore next */ () => {},
  edit: /* istanbul ignore next */ () => {},
  close: /* istanbul ignore next */ () => {},
  setMessage: /* istanbul ignore next */ () => {},
}

const ContainerSelectContext = createContext(initialValue)

interface ContainerSelectProviderProps {
  value: ContainerSelectValue
}

export const ContainerSelectProvider: FunctionComponent<ContainerSelectProviderProps> =
  ({ value, children }) => (
    <ContainerSelectContext.Provider value={value}>
      {children}
    </ContainerSelectContext.Provider>
  )

export default ContainerSelectContext
