import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../actions';
import { RootState } from '../store'; // RootState 타입 정의 필요

const Component = () => {
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const data = useSelector((state: RootState) => state.data.data);
  const error = useSelector((state: RootState) => state.data.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data && (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Component;