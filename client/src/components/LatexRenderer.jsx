import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const LatexRenderer = ({ latex }) => {
    // Ensure latex is a string
    const latexString = typeof latex === 'string' ? latex : '';

    const html = katex.renderToString(latexString, {
        throwOnError: false,
    });

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default LatexRenderer;
