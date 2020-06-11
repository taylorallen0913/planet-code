import {
  CLEAR_EDITOR_DATA,
  SET_QUESTION_DATA,
  SET_CURRENT_LANGUAGE,
  UPDATE_CURRENT_CODE,
  UPDATE_EDITOR_MENU_SELECTION,
} from '../actions/types';

const initialState = {
  questionData: '',
  code: {},
  currentLanguage: 1,
  editorMenuSelection: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_EDITOR_DATA:
      return {};
    case SET_QUESTION_DATA:
      return {
        ...state,
        code: action.payload.code.placeholders,
        questionData: action.payload,
      };
    case SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
      };
    case UPDATE_CURRENT_CODE:
      return {
        ...state,
        code: { ...state.code, ...action.payload },
      };
    case UPDATE_EDITOR_MENU_SELECTION:
      return {
        ...state,
        editorMenuSelection: action.payload,
      };
    default:
      return state;
  }
};
