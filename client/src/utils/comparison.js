export const compareStrings = (input, expected) => {
    let passing;
    try {
        const formattedInput = input.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const formattedOutput = expected
            .replace(/[^a-zA-Z]/g, '')
            .toLowerCase();
        passing = formattedInput === formattedOutput;
    } catch (err) {
        passing = null;
    }
    return passing;
};
