import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';

import watchKtoContainerSaga, { requestKtaAnswers, checkKto, storeKto } from './saga';
import { REQUEST_KTA_ANSWERS, CHECK_KTO, STORE_KTO } from './constants';
import {
  requestKtaAnswersSuccess, requestKtaAnswersError,
  checkKtoSuccess, checkKtoError,
  storeKtoSuccess, storeKtoError
} from './actions';

describe('KtoContainer saga', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('requestKtaAnswers', () => {
    let gen;
    const answers = {
      results: [
        { is_satisfied: true, text: 'Antwoord JA' },
        { is_satisfied: false, text: 'Antwoord NEE' }
      ]
    };

    it('should success with JA', () => {
      gen = requestKtaAnswers({ payload: true });
      expect(gen.next().value).toEqual(call(request, 'https://acc.api.data.amsterdam.nl/signals/v1/public/feedback/standard_answers/'));
      expect(gen.next(answers).value).toEqual(put(requestKtaAnswersSuccess({ 'Antwoord JA': 'Antwoord JA' })));
    });

    it('should success with NEE', () => {
      gen = requestKtaAnswers({ payload: false });
      expect(gen.next().value).toEqual(call(request, 'https://acc.api.data.amsterdam.nl/signals/v1/public/feedback/standard_answers/'));
      expect(gen.next(answers).value).toEqual(put(requestKtaAnswersSuccess({ 'Antwoord NEE': 'Antwoord NEE' })));
    });

    it('should error', () => {
      gen = requestKtaAnswers({ payload: 'ja' });
      gen.next();
      expect(gen.throw().value).toEqual(put(requestKtaAnswersError()));
    });
  });

  describe.skip('checkKto', () => {
    let payload;
    let gen;

    beforeEach(() => {
      payload = 'abc-42';
      gen = checkKto({ payload });
    });

    it('should success', () => {
      expect(gen.next().value).toEqual(call(request, `https://acc.api.data.amsterdam.nl/signals/v1/public/feedback/forms/${payload}`));
      expect(gen.next().value).toEqual(put(checkKtoSuccess()));
    });

    it('should error with 404', () => {
      const error = new Error();
      error.response = {
        status: 404
      };
      gen.next();
      expect(gen.throw(error).value).toEqual(put(push('/niet-gevonden')));
      expect(gen.next().value).toEqual(put(checkKtoError(true)));
    });

    it('should error with json body', () => {
      const error = new Error();
      error.response = {
        jsonBody: {
          detail: 'too late'
        }
      };
      gen.next();
      expect(gen.throw(error).value).toEqual(put(checkKtoError('too late')));
    });

    it('should error with other errors', () => {
      gen.next();
      expect(gen.throw().value).toEqual(put(checkKtoError(true)));
    });
  });

  describe('storeKto', () => {
    let payload;
    let gen;

    beforeEach(() => {
      payload = {
        uuid: 'abc-42',
        form: {
          is_satisfied: true,
          text: 'foo',
          text_extra: 'bar',
          allows_contact: false
        }
      };
      gen = storeKto({ payload });
    });

    it('should success', () => {
      expect(gen.next().value).toEqual(call(request, `https://acc.api.data.amsterdam.nl/signals/v1/public/feedback/forms/${payload.uuid}`, {
        method: 'PUT',
        body: JSON.stringify(payload.form),
        headers: {
          'Content-Type': 'application/json'
        }
      }));
      expect(gen.next().value).toEqual(put(storeKtoSuccess()));
    });

    it('should error with other errors', () => {
      gen.next();
      expect(gen.throw().value).toEqual(put(storeKtoError()));
    });
  });

  it('should watchKtoContainerSaga', () => {
    const gen = watchKtoContainerSaga();
    expect(gen.next().value).toEqual(all([
      takeLatest(REQUEST_KTA_ANSWERS, requestKtaAnswers),
      takeLatest(CHECK_KTO, checkKto),
      takeLatest(STORE_KTO, storeKto)
    ]));
  });
});
