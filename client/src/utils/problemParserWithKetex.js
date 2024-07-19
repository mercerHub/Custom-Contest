import katex from 'katex';

const problemParserWithKatex = (problemStatement) => {
    const regex = /\$\$\$(.*?)\$\$\$/g;
    let match;
    let parsedString = problemStatement;

    while ((match = regex.exec(problemStatement)) !== null) {
        const [fullMatch, captureGroup] = match;
        const katexRendered = katex.renderToString(captureGroup, {
            throwOnError: false
        });
        parsedString = parsedString.replace(fullMatch, katexRendered);
    }

    return parsedString;
};

export default problemParserWithKatex;
