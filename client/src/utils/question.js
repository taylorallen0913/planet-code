export const parseText = (input) => {
  let parsedInput = input;
  parsedInput = parsedInput.split('\\n').join('\n');
  parsedInput = parsedInput.split('\\t').join('\t');
  return parsedInput;
};
