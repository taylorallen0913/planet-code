export const parseCode = (code) => {
    let parsedCode = code;
    parsedCode = parsedCode.replace('\\n', '\n');
    parsedCode = parsedCode.replace('\\t', '\t');
    return parsedCode;
};
