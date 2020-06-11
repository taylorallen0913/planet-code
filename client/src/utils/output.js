import { parseCode } from './parsing';
import { getLanguageFromID, getApiLanguageID } from './language';
import { compareStrings } from './comparison';

export const formatSolution = (currentLanguage, questionData, code) => {
  let template = parseCode(
    getCurrentLanguageTemplate(currentLanguage, questionData),
  );
  template = template.replace(
    '{code}',
    getCurrentLanguageSolution(currentLanguage, code),
  );
  template = template.split('{input}').join('3');
  console.log(template);
  return template;
};

export const checkOutput = (output, questionData) => {
  let passing = true;
  console.log(output);
  if (typeof questionData.expected === 'object') {
    questionData.expected.forEach((expected) => {
      passing = compareStrings(output.stdout, expected) || passing;
    });
  } else return compareStrings(output.stdout, questionData.expected);
  return passing;
};

export const getCurrentLanguageTemplate = (currentLanguage, questionData) => {
  let code;
  switch (currentLanguage) {
    case 1:
      code = questionData.code.templates.python;
      break;
    case 2:
      code = questionData.code.templates.java;
      break;
    case 3:
      code = questionData.code.templates['cpp'];
      break;
    case 4:
      code = questionData.code.templates.javascript;
      break;
    default:
      code = 'Please select a language.';
      break;
  }
  return code;
};

export const getCurrentLanguageSolution = (currentLanguage, code) => {
  let codeValue;
  switch (currentLanguage) {
    case 1:
      codeValue = parseCode(code.python);
      break;
    case 2:
      codeValue = parseCode(code.java);
      break;
    case 3:
      codeValue = parseCode(code['cpp']);
      break;
    case 4:
      codeValue = parseCode(code.javascript);
      break;
    default:
      codeValue = 'Please select a language.';
      break;
  }
  return codeValue;
};
