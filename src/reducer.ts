import { Reducer } from 'redux';
import { DataState } from './types'; // './types' 파일에서 DataState를 임포트합니다.

import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, ActionType } from './actions';

const initialState: DataState = {
  isLoading: false,
  data: null,
  error: null,
};

export const dataReducer: Reducer<DataState, ActionType> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null };
    case FETCH_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
