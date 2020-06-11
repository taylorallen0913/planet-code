import {
  SET_OUTPUT_VALUE,
  CLEAR_OUTPUT_VALUE,
  SET_OUTPUT_LOADING_STATUS,
  SET_OUTPUT_ERRORS,
  CLEAR_OUTPUT_ERRORS,
} from './types';

export const setOutput = (output) => (dispatch) => {
  dispatch({
    type: SET_OUTPUT_VALUE,
    payload: output,
  });
};

export const clearOutput = () => (dispatch) => {
  dispatch({
    type: CLEAR_OUTPUT_VALUE,
  });
};

export const setOutputLoadingStatus = (status) => (dispatch) => {
  dispatch({
    type: SET_OUTPUT_LOADING_STATUS,
    payload: status,
  });
};

export const setOutputErrors = (errors) => (dispatch) => {
  dispatch({
    type: SET_OUTPUT_ERRORS,
    payload: errors,
  });
};

export const clearOutputErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_OUTPUT_ERRORS,
  });
};
