import { some } from 'lodash';
import { Validators } from 'react-reactive-form';

import IncidentNavigation from '../components/IncidentNavigation';
import FormComponents from '../components/IncidentForm/components/';

export default {
  label: 'Beschrijf uw melding',
  getNextStep: (wizard, { subcategory, category }) => {
    if (!some(wizard.vulaan.form.controls, (control) => control.meta && control.meta.ifAllOf && (control.meta.ifAllOf.subcategory === subcategory || control.meta.ifAllOf.category === category))) {
      return 'incident/telefoon';
    }
    return false;
  },
  form: {
    controls: {
      source: {
        meta: {
          cols: 6,
          label: 'Hoe komt de melding binnen?',
          path: 'source',
          watch: true,
          updateIncident: true,
          values: {
            '': 'Vul bron in',
            'Telefoon – CCA': 'Telefoon – CCA',
            'Telefoon – ASC': 'Telefoon – ASC',
            'Telefoon – Interswitch': 'Telefoon – Interswitch',
            'Telefoon – Stadsdeel': 'Telefoon – Stadsdeel',
            'E-mail – CCA': 'E-mail – CCA',
            'E-mail – ASC': 'E-mail – ASC',
            'E-mail – Stadsdeel': 'E-mail – Stadsdeel',
            'Webcare – CCA': 'Webcare – CCA',
            'Eigen organisatie': 'Eigen organisatie',
            'Meldkamer burger/ondernemer': 'Meldkamer burger/ondernemer',
            'Meldkamer Handhaver': 'Meldkamer Handhaver',
            'Meldkamer Politie': 'Meldkamer Politie'
          }
        },
        options: {
          validators: Validators.required
        },
        authenticated: true,
        render: FormComponents.SelectInput
      },
      location: {
        meta: {
          label: 'Waar is het?',
          subtitle: 'Typ de locatie in of of klik op de kaart',
          path: 'location',
          watch: true
        },
        options: {
          validators: Validators.required
        },
        render: FormComponents.MapInput
      },
      description: {
        meta: {
          label: 'Waar gaat het om?',
          path: 'text',
          placeholder: 'Beschrijving'
        },
        options: {
          validators: [
            Validators.required,
            Validators.maxLength(3000)
          ]
        },
        render: FormComponents.DescriptionWithClassificationInput
      },
      category: {
        meta: {
          label: 'Categorie',
          path: 'category.main',
          type: 'text',
          watch: true
        },
        options: {
          validators: Validators.required
        },
        render: FormComponents.HiddenInput
      },
      subcategory: {
        meta: {
          label: 'Subcategorie',
          path: 'category.sub',
          type: 'text',
          watch: true
        },
        options: {
          validators: Validators.required
        },
        render: FormComponents.HiddenInput
      },
      datetime: {
        meta: {
          cols: 6,
          label: 'Geef het tijdstip aan',
          values: {
            Nu: 'Nu',
            Eerder: 'Eerder'
          },
          updateIncident: true
        },
        options: {
          validators: Validators.required
        },
        render: FormComponents.RadioInput
      },
      incident_date: {
        meta: {
          ifAllOf: {
            datetime: 'Eerder'
          },
          updateIncident: true,
          watch: true
        },
        render: FormComponents.DateTimeInput,
        strict: false
      },
      incident_time_hours: {
        meta: {
          label: 'Incident time hours',
          readOnly: true,
          watch: true
        },
        render: FormComponents.HiddenInput
      },
      incident_time_minutes: {
        meta: {
          label: 'Incident time minutes',
          readOnly: true,
          watch: true
        },
        render: FormComponents.HiddenInput
      },
      image: {
        meta: {
          label: 'Wilt u een foto meesturen?',
          submitLabel: 'Foto kiezen',
          watch: true
        },
        render: FormComponents.FileInput
      },
      $field_0: {
        isStatic: false,
        render: IncidentNavigation
      }
    }
  }
};
