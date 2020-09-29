import categoriesFixture from 'utils/__tests__/fixtures/categories_private.json';
import * as catgorySelectors from 'models/categories/selectors';

import resolveClassification, { MINIMUM_CERTAINTY, DEFAULT_CLASSIFICATION, getCategory } from '.';

describe('The resolve classification service', () => {
  let hoofdrubriek;
  let subrubriek;
  const subcategories = categoriesFixture.results
    .filter(catgorySelectors.filterForSub)
    .filter(category => category.is_active)
    .map(item => ({
      ...item,
      id: item._links.self.public,
    }));

  const defaultCategory = getCategory(subcategories.find(s => s.slug === DEFAULT_CLASSIFICATION));

  beforeEach(() => {
    subrubriek = [
      [
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/schoon/sub_categories/uitwerpselen',
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-van-en-door-personen-of-groepen/sub_categories/wildplassen-poepen-overgeven',
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-van-dieren/sub_categories/duiven',
      ],
      [0.39, 0.1424216693948545, 0.04586915076913858],
    ];

    hoofdrubriek = [
      [
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-bedrijven-en-horeca',
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-in-de-openbare-ruimte',
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-van-en-door-personen-of-groepen',
      ],
      [0.39, 0.1424216693948545, 0.04586915076913858],
    ];
  });

  it('should return the default classifications', () => {
    expect(resolveClassification(subcategories)).toEqual(defaultCategory);

    expect(resolveClassification(subcategories, {})).toEqual(defaultCategory);
  });

  it('should return correct classification when minimum subcategory chance is met', () => {
    subrubriek[1][0] = MINIMUM_CERTAINTY;
    const testCategory = getCategory(subcategories.find(s => s.slug === 'uitwerpselen'));

    expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
  });

  it('should return Overig when minimum maincategory and subcategory chance are not met', () => {
    expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(defaultCategory);
  });

  describe('use main classification when sub category fails', () => {
    describe('afval', () => {
      it('should return overig-afval when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] = 'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/afval';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;

        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig-afval'));
        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('openbaar-groen-en-water', () => {
      it('should return overig-groen-en-water when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] =
          'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/openbaar-groen-en-water';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig-groen-en-water'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('overlast-bedrijven-en-horeca', () => {
      it('should return overig-horecabedrijven when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] =
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-bedrijven-en-horeca';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig-horecabedrijven'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('overlast-in-de-openbare-ruimte', () => {
      it('should return overig-openbare-ruimte when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] =
        'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-in-de-openbare-ruimte';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig-openbare-ruimte'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('overlast-op-het-water', () => {
      it('should return overig-boten when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] =
          'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-op-het-water';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig-boten'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('overlast-van-dieren', () => {
      it('should return overig-dieren when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] = 'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-van-dieren';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig-dieren'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('overlast-van-en-door-personen-of-groepen', () => {
      it('should return overige-overlast-door-personen when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] =
          'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/overlast-van-en-door-personen-of-groepen';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overige-overlast-door-personen'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('wegen-verkeer-straatmeubilair', () => {
      it('should return overig-wegen-verkeer-straatmeubilair when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] =
          'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/wegen-verkeer-straatmeubilair';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig-wegen-verkeer-straatmeubilair'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('wonen', () => {
      it('should return wonen-overig when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] = 'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/wonen';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'wonen-overig'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });

    describe('unknown-category', () => {
      it('should return overig when minimum subcategory chance is not met and maincategory chance is met', () => {
        hoofdrubriek[0][0] = 'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/unknown-category';
        hoofdrubriek[1][0] = MINIMUM_CERTAINTY;
        const testCategory = getCategory(subcategories.find(s => s.slug === 'overig'));

        expect(resolveClassification(subcategories, { subrubriek, hoofdrubriek })).toEqual(testCategory);
      });
    });
  });
});
