// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2021 Gemeente Amsterdam
import styled from 'styled-components'
import { subWeeks } from 'date-fns'
import { FunctionComponent, useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import AreaMap from 'components/AreaMap'
import { Feature } from 'components/AreaMap/types'
import { INCIDENT_URL } from 'signals/incident-management/routes'
import useGetIncidentContextGeography from 'hooks/api/useGetContextGeography'
import useGetIncident from 'hooks/api/useGetIncident'
import Filter from './components/Filter'
import IncidentDetail from './components/IncidentDetail'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Sidebar = styled.div`
  width: 540px;
  position: relative;
`

export const AreaContainer: FunctionComponent = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [selection, setSelection] = useState<Feature | null>(null)

  const { data: area } = useGetIncidentContextGeography(Number(id))
  const { data: incident } = useGetIncident(Number(id))
  const { data: selectedIncident, isLoading: isLoadingSelectedIncident } =
    useGetIncident(selection?.properties.id)

  const handleClose = useCallback(
    () => history.push(`${INCIDENT_URL}/${id}`),
    [history, id]
  )

  const startDate = subWeeks(new Date(), 12).toISOString()

  if (!area?.features || !incident) return null

  const incidentSidebar =
    selection && selectedIncident && !isLoadingSelectedIncident ? (
      <IncidentDetail
        incident={selectedIncident}
        onBack={() => setSelection(null)}
      />
    ) : (
      <LoadingIndicator />
    )

  const sidebar = selection ? (
    incidentSidebar
  ) : (
    <Filter
      startDate={startDate}
      subcategory={incident.category?.sub}
      departments={incident.category?.departments}
    />
  )

  return (
    <Wrapper>
      <Sidebar>{sidebar}</Sidebar>
      <AreaMap
        geoData={area}
        onClose={handleClose}
        center={incident.location.geometrie.coordinates}
        selectedFeature={selection}
        onClick={setSelection}
      />
    </Wrapper>
  )
}

export default AreaContainer
