import { Dispatch } from 'redux';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export type ActionType =
  | { type: typeof FETCH_DATA_REQUEST }
  | { type: typeof FETCH_DATA_SUCCESS; payload: any }
  | { type: typeof FETCH_DATA_FAILURE; payload: string };

export const fetchData = () => async (dispatch: Dispatch<ActionType>) => {
  dispatch({ type: FETCH_DATA_REQUEST });
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
  }
};
