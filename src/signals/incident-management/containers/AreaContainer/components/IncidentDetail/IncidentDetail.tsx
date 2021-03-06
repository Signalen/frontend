import { Link } from 'react-router-dom'
import {
  Heading,
  themeSpacing,
  Link as AscLink,
  themeColor,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'
import BackLink from 'components/BackLink'
import { string2date, string2time } from 'shared/services/string-parser'
import type { Incident } from 'types/api/incident'
import { isStatusEnd } from 'signals/incident-management/definitions/statusList'

interface IncidentDetailProps {
  incident: Incident
  onBack: () => void
}

const Wrapper = styled.section`
  padding: ${themeSpacing(4)};
`

const StyledBackLink = styled(BackLink)`
  margin-bottom: ${themeSpacing(4)};
`

const StyledLink = styled(AscLink)`
  margin-bottom: ${themeSpacing(4)};
  text-decoration: underline;
  display: block;

  :hover {
    cursor: pointer;
    & > * {
      color: ${themeColor('secondary')};
    }
  }
`

const DefinitionList = styled.div`
  margin-top: ${themeSpacing(4)};
`

const SectionTerm = styled.dt`
  color: ${themeColor('tint', 'level5')};
  margin-bottom: ${themeSpacing(1)};
`

const SectionDescription = styled.dd`
  margin-bottom: ${themeSpacing(4)};
`

const Status = styled.div<{ isEnded: boolean }>`
  font-family: Avenir Next LT W01 Demi, arial, sans-serif;
  color: ${({ isEnded }) =>
    themeColor('support', isEnded ? 'valid' : 'invalid')};
`

const formatDate = (date: string): string => {
  return `${string2date(date)} ${string2time(date)}`
}

const getIncidentTitlePrefix = (incident: Incident) => {
  const parentId = incident._links?.['sia:parent']?.href?.split('/').pop()
  const hasChildren = incident._links?.['sia:children']?.length

  if (hasChildren) {
    return 'Hoofd'
  }

  if (parentId) {
    return 'Deel'
  }

  return 'Standaard'
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({
  onBack,
  incident,
}) => {
  return (
    <Wrapper>
      <StyledBackLink to="#" onClick={() => onBack()}>
        Terug naar filter
      </StyledBackLink>
      <StyledLink
        forwardedAs={Link}
        to={`/manage/incident/${incident.id}`}
        target="_blank"
      >
        <Heading data-testid="incident-heading" as="h2" styleAs="h6">
          {`${getIncidentTitlePrefix(incident)}melding ${incident.id}`}
        </Heading>
      </StyledLink>
      <Heading as="h2" styleAs="h3" data-testid="text">
        {incident.text}
      </Heading>
      <DefinitionList>
        <SectionTerm data-testid="location-label">Locatie</SectionTerm>
        <SectionDescription>
          <span data-testid="location">
            {incident.location?.address_text || 'Locatie is gepind op de kaart'}
          </span>
        </SectionDescription>
        <SectionTerm data-testid="date-label">Gemeld op</SectionTerm>
        <SectionDescription>
          <span data-testid="date">
            {incident.created_at && formatDate(incident.created_at)}
          </span>
        </SectionDescription>
        <SectionTerm data-testid="status-label">Status</SectionTerm>
        <SectionDescription>
          <Status isEnded={isStatusEnd(incident.status.state)}>
            <span data-testid="status">{incident?.status.state_display}</span>
          </Status>
        </SectionDescription>
        <SectionTerm data-testid="subcategory-label">Subcategorie (verantwoordelijke afdeling)</SectionTerm>
        <SectionDescription>
          <span data-testid="subcategory">{incident.category?.sub} </span>
          <span data-testid="departments">
            ({incident.category?.departments})
          </span>
        </SectionDescription>
      </DefinitionList>
    </Wrapper>
  )
}

export default IncidentDetail
