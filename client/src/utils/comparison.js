export const compareStrings = (input, expected) => {
    const formattedInput = input.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const formattedOutput = expected.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return formattedInput === formattedOutput;
};
