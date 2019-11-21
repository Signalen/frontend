import { renderHook, act , cleanup} from '@testing-library/react-hooks';
import userJSON from 'utils/__tests__/fixtures/user.json';
import { USERS_ENDPOINT } from 'shared/services/api/api';
import useFetchUser from '../useFetchUser';

describe('signals/settings/users/containers/Detail/hooks/useFetchUser', () => {
  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  it('should request user from API on mount', async () => {
    const userId = 45;
    fetch.mockResponseOnce(JSON.stringify(userJSON));
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUser(userId)
    );

    await act(async () => {
      await expect(result.current.isLoading).toEqual(true);
      await expect(result.current.data).toBeUndefined();

      await waitForNextUpdate();

      await expect(global.fetch).toHaveBeenCalledWith(
        `${USERS_ENDPOINT}/${userId}`,
        expect.objectContaining({ headers: {} })
      );

      await expect(result.current.isLoading).toEqual(false);
      await expect(result.current.data).toEqual(userJSON);
    });
  });

  it('should return errors that are thrown during fetch', async () => {
    const userId = 99;
    const error = new Error('fake error message');
    fetch.mockRejectOnce(error);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUser(userId)
    );

    expect(result.current.error).toEqual(false);

    await waitForNextUpdate();

    expect(result.current.error).toEqual(error);
    expect(result.current.isLoading).toEqual(false);
  });

  it('should abort request on unmount', () => {
    fetch.mockResponseOnce(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve(JSON.stringify(userJSON)), 100)
        )
    );

    const abortSpy = jest.spyOn(global.AbortController.prototype, 'abort');

    const { unmount } = renderHook(async () => useFetchUser());

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });

  it('should throw on error response', async () => {
    const userId = 13;
    const response = { status: 401, ok: false, statusText: 'Unauthorized' };

    fetch.mockImplementation(() => response);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchUser(userId)
    );

    expect(result.current.error).toEqual(false);

    await waitForNextUpdate();

    expect(result.current.error).toEqual(response);
  });

  describe('patch', () => {
    it('should send PATCH request', async () => {
      fetch.mockResponse(JSON.stringify(userJSON));

      const userId = 1;

      const {
        result,
        waitForNextUpdate,
      } = renderHook(() => useFetchUser(userId));

      // make sure the side effects are all done
      await waitForNextUpdate();

      fetch.resetMocks();

      const formData = { ...userJSON, is_active: false };

      fetch.mockResponseOnce(JSON.stringify(formData));

      expect(result.current.isSuccess).not.toEqual(true);

      act(() => {
        result.current.patch(formData);
      });

      await waitForNextUpdate();

      expect(global.fetch).toHaveBeenLastCalledWith(
        `${USERS_ENDPOINT}/${userId}`,
        expect.objectContaining({
          body: JSON.stringify(formData),
          method: 'PATCH',
        })
      );

      expect(result.current.isSuccess).toEqual(true);
    });

    it('should throw on error response', async () => {
      const response = { status: 401, ok: false, statusText: 'Unauthorized' };
      const formData = { ...userJSON, is_active: false };
      const userId = 13;
      const {
        result,
        waitForNextUpdate,
      } = renderHook(() => useFetchUser(userId));

      expect(result.current.error).not.toEqual(response);
      expect(result.current.isSuccess).not.toEqual(false);

      // make sure the side effects are all done
      await waitForNextUpdate();

      const { patch } = result.current;

      // set the result for the patch response
      fetch.mockImplementation(() => response);

      act(() => {
        patch(formData);
      });

      await waitForNextUpdate();

      expect(result.current.error).toEqual(response);
      expect(result.current.isSuccess).toEqual(false);
    });
  });
});
