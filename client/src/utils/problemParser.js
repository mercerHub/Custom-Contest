const problemParserCF = (problemStatement) =>{
    const problemLength = problemStatement.length;
    var parsedProblem = "";
    for(let char = 0 ; char < problemLength ; char ++){
        if(problemStatement[char] === '$'){
            var innerText = "";
            while(problemStatement[char] === '$') char ++;
            while(problemStatement[char] !== '$') innerText += problemStatement[char ++]
            while(problemStatement[char] === '$') char ++;
            char --;
            innerText = innerText.replaceAll("\\dots","... ");
            innerText = innerText.replaceAll("\\le","≤")
            var innerTextLength = innerText.length;
            var newInnerText = "";
            for(let c = 0 ; c < innerTextLength ; c ++){

                if(innerText[c] === '_'){
                    newInnerText += `<sub>${innerText[c + 1]} </sub>`;
                    c ++;
                }
                else if(innerText[c] === '^'){
                    newInnerText += `<super> ${innerText[c + 1]} </super>`;
                    c ++;
                }
                else {
                    newInnerText += innerText[c];
                }
            }
            parsedProblem += `<span class = "parsed-text"> ${newInnerText} </span>`;
        }
        else parsedProblem += problemStatement[char];
    }
    
    return parsedProblem;
}
export default problemParserCF;