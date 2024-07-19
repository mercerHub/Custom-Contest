import katex from 'katex';


const problemParserCF = (problemStatement) =>{
    const problemLength = problemStatement.length;
    //console.log(problemStatement);
    var parsedProblem = "";
    for(let char = 0 ; char < problemLength ; char ++){
        if(problemStatement[char] === '$'){
            var innerText = "";
            while(problemStatement[char] === '$') char ++;
            while(problemStatement[char] !== '$') innerText += problemStatement[char ++]
            while(problemStatement[char] === '$') char ++;
            char --;
            
            innerText = innerText.replaceAll('&gt;','>'); 
            innerText = innerText.replaceAll('&lt;','<');
            innerText = innerText.replaceAll('&le;','≤');
            
                try {
                    const katexRendered = katex.renderToString(innerText, {
                        throwOnError: true,
                        output: "mathml"
                    });
                    innerText = katexRendered;
                } catch (error) {
                    console.error(`Katex rendering error for '${innerText}':`, error);
                    innerText = `<span class='katex'>${innerText}</span>`;
                }
            

            parsedProblem += innerText;

        } else {
            parsedProblem += problemStatement[char];
        }
    }
    
    
    return parsedProblem;
}
export default problemParserCF;