import katex from 'katex';
import 'katex/dist/katex.min.css';

const renderLaTeX = (text) => {
    if (typeof text !== 'string') return text;

    const regex = /\$\$\$(.*?)\$\$\$/g;
    let match;
    let lastIndex = 0;
    const parts = [];

    while ((match = regex.exec(text)) !== null) {
        const beforeMatch = text.substring(lastIndex, match.index);
        const latexCode = match[1];
        const renderedLatex = katex.renderToString(latexCode, {
            throwOnError: false,
        });

        // Push HTML content before the match
        if (beforeMatch) {
            parts.push(<span key={lastIndex} dangerouslySetInnerHTML={{ __html: beforeMatch }} />);
        }
        // Push the rendered LaTeX code
        parts.push(<span key={match.index} dangerouslySetInnerHTML={{ __html: renderedLatex }} />);
        lastIndex = regex.lastIndex;
    }

    // Push any remaining HTML content after the last match
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
        parts.push(<span key={lastIndex} dangerouslySetInnerHTML={{ __html: remainingText }} />);
    }

    return parts;
};

export default renderLaTeX;
