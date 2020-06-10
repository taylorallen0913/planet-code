import {
  CLEAR_EDITOR_DATA,
  SET_QUESTION_DATA,
  SET_CURRENT_LANGUAGE,
  UPDATE_CURRENT_CODE,
} from '../actions/types';
import { getQuestionData } from '../../utils/question';
import { getReduxLanguageByID } from '../../utils/editor';

export const clearEditorData = () => (dispatch) => {
  dispatch({
    type: CLEAR_EDITOR_DATA,
  });
};

export const setQuestionData = (questionID) => (dispatch) => {
  getQuestionData(questionID).then((data) => {
    dispatch({
      type: SET_QUESTION_DATA,
      payload: data,
    });
  });
};

export const setCurrentLanguage = (language) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_LANGUAGE,
    payload: language,
  });
};

export const updateCurrentCode = (language, code) => (dispatch) => {
  let obj = {};
  obj[getReduxLanguageByID(language)] = code;
  console.log(obj);
  dispatch({
    type: UPDATE_CURRENT_CODE,
    payload: obj,
  });
};
