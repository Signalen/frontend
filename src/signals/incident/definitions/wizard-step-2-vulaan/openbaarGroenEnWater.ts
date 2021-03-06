// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2018 - 2021 Gemeente Amsterdam
import { FIELD_TYPE_MAP } from 'signals/incident/containers/IncidentContainer/constants'
import * as caterpillarIcons from './caterpillar-icons'

export const controls = {
  extra_eikenprocessierups: {
    meta: {
      options: { validators: ['required'] },
      ifAllOf: {
        subcategory: 'eikenprocessierups',
      },
      label: 'Kies de boom waarin u de eikenprocessierupsen hebt gezien',
      shortLabel: 'Boom',
      pathMerge: 'extra_properties',
      endpoint:
        'https://services9.arcgis.com/YBT9ZoJBxXxS3cs6/arcgis/rest/services/EPR_2021_SIA_Amsterdam/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson&geometryType=esriGeometryEnvelope&geometry={{east},{south},{west},{north}}',
      legendItems: [
        {
          label: 'Eikenboom',
          iconId: 'oak',
          id: 'oak',
        },
        {
          label: 'Is gemeld',
          iconId: 'isReported',
          id: 'isReported',
        },
      ],
      icons: [
        {
          id: 'oak',
          icon: caterpillarIcons.oak,
        },
        {
          id: 'oakIsReported',
          icon: caterpillarIcons.oakIsReported,
        },
        {
          id: 'isReported',
          icon: caterpillarIcons.reported,
        },
        {
          id: 'isSelected',
          icon: caterpillarIcons.select,
        },
        {
          id: 'isSelectedAndReported',
          icon: caterpillarIcons.isSelectedAndReported,
        },
        {
          id: 'unknown',
          icon: caterpillarIcons.unknown,
        },
      ],
      featureTypes: [
        {
          label: 'Eikenboom',
          description: 'Eikenboom',
          iconId: 'oak',
          iconIsReportedId: 'oakIsReported',
          idField: 'OBJECTID',
          typeValue: 'Eikenboom',
          isReportedField: 'AMS_Meldingstatus',
          isReportedValue: 1,
        },
        {
          label: 'Onbekend',
          description: 'De boom staat niet op de kaart',
          iconId: 'unknown',
          typeValue: 'not-on-map',
        },
      ],
      extraProperties: ['GlobalID'],
    },
    render: FIELD_TYPE_MAP.caterpillar_select,
  },
  extra_nest_grootte: {
    meta: {
      ifAllOf: {
        subcategory: 'eikenprocessierups',
      },
      label: 'Wat hebt u op de boom gezien?',
      shortLabel: 'Op de boom gezien',
      pathMerge: 'extra_properties',
      values: {
        klein: 'Nest is zo groot als een tennisbal',
        groot: 'Nest is zo groot als een voetbal',
        deken: 'Rupsen bedekken de stam als een deken',
        geen_nest: 'De rupsen in de boom hebben nog geen nest gevormd',
      },
    },
    options: { validators: ['required'] },
    render: FIELD_TYPE_MAP.radio_input,
  },
}

export default controls
