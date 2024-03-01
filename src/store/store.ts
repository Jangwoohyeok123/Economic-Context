import { createStore } from 'redux';
import combinedReducers from '@/reducers/reducer';

const store = createStore(combinedReducers);

export default store;
