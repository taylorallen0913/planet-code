export const parseCode = (code) => {
  let parsedCode = code;
  parsedCode = parsedCode.split('\\n').join('\n');
  parsedCode = parsedCode.split('\\t').join('\t');
  return parsedCode;
};

export const getLanguage = (id) => {
  let language = '';
  switch (id) {
    case 1:
      language = 'Python';
      break;
    case 2:
      language = 'Java';
      break;
    case 3:
      language = 'C++';
      break;
    case 4:
      language = 'Javascript';
      break;
    default:
      language = 'Language';
      break;
  }
  return language;
};

export const getApiLanguageID = (id) => {
  let language = -1;
  switch (id) {
    case 1:
      // Python 3
      language = 71;
      break;
    case 2:
      // Java
      language = 62;
      break;
    case 3:
      // C++
      language = 54;
      break;
    case 4:
      // JS
      language = 63;
      break;
    default:
      language = -1;
      break;
  }
  return language;
};
