import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import editorReducer from './editorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  editor: editorReducer,
});
