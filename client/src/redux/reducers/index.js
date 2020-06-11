import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import editorReducer from './editorReducer';
import outputReducer from './outputReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  editor: editorReducer,
  output: outputReducer,
});
