import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { dataReducer } from './reducer';

// RootReducer 타입을 정의
const rootReducer = combineReducers({
  data: dataReducer,
});

// 미들웨어 설정
const middleware = [thunk as unknown as ThunkMiddleware];

// Store 설정
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
