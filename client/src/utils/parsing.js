export const parseCode = (code) => {
  let parsedCode = code;
  parsedCode = parsedCode.split('\\n').join('\n');
  parsedCode = parsedCode.split('\\t').join('\t');
  return parsedCode;
};
