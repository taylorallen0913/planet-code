import {
  SET_OUTPUT_VALUE,
  CLEAR_OUTPUT_VALUE,
  SET_OUTPUT_LOADING_STATUS,
  SET_OUTPUT_ERRORS,
  CLEAR_OUTPUT_ERRORS,
} from '../actions/types';

const initialState = {
  value: '',
  loading: false,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OUTPUT_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    case CLEAR_OUTPUT_VALUE:
      return {
        ...state,
        value: '',
      };
    case SET_OUTPUT_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_OUTPUT_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    case CLEAR_OUTPUT_ERRORS:
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};
