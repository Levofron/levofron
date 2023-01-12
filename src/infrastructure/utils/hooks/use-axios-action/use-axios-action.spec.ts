import { act, renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@infrastructure/utils';

import { useAxiosAction } from './use-axios-action.hook';

describe('useAxiosAction hook', () => {
  functionImportTest(useAxiosAction);

  it('should return loading, error, data and mutate function', () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    expect(result.current).toEqual({
      data: expect.any(Object),
      error: expect.any(Object),
      reset: expect.any(Function),
      mutate: expect.any(Function),
      loading: expect.any(Boolean),
      mutateAsync: expect.any(Function),
    });
  });

  it('should call axios action', async () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    act(() => {
      result.current.mutate();
    });

    expect(axiosAction).toHaveBeenCalled();
  });

  it('should set loading to true when axios action is called', async () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    expect(result.current.loading).toBeFalsy();

    act(() => {
      result.current.mutate();
    });

    expect(result.current.loading).toBeTruthy();
  });

  it('should set loading to false when axios action is resolved', async () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    act(() => {
      result.current.mutate();
    });

    expect(result.current.loading).toBeTruthy();

    await act(async () => {
      await result.current.mutate();
    });

    expect(result.current.loading).toBeFalsy();
  });
});
