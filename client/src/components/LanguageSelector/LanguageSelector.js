import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { setCurrentLanguage } from '../../redux/actions/editorActions';
import { getLanguageFromID } from '../../utils/language';

const { Option } = Select;

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.editor.currentLanguage);

  const changeLanguage = (language) => {
    dispatch(setCurrentLanguage(language));
  };

  return (
    <Select
      bordered={false}
      value={getLanguageFromID(currentLanguage)}
      style={{
        width: 120,
        color: '#D3D3D3',
      }}
      onChange={(language) => changeLanguage(language)}
    >
      <Option value={1}>Python</Option>
      <Option value={2}>Java</Option>
      <Option value={3}>C++</Option>
      <Option value={4}>Javascript</Option>
    </Select>
  );
};

export default LanguageSelector;
