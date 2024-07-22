import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // You can choose different styles from highlight.js

// Initialize MarkdownIt with highlight.js syntax highlighting
const md = new MarkdownIt({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // Use hljs.highlight with the new API
        return hljs.highlight(code, { language: lang }).value;
      } catch (__) {
        // If an error occurs, fall back to default
      }
    }
    return ''; // use external default escaping
  }
});

function SolutionComponent() {
  const [markdownContent, setMarkdownContent] = useState(`
# Problem Statement
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

### Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

# Plan
1. Use a hash map to store the complement of each element as we iterate through the array.
2. For each element, check if its complement exists in the hash map.
3. If it does, return the indices of the current element and the complement.
4. If it doesn't, add the current element and its index to the hash map.

# Code
\`\`\`c++
#include <iostream>
int main(){
    cout << "YES\n" << endl;
}
\`\`\`

# Explanation
1. We initialize an empty hash map \`complement_map\`.
2. We iterate through the array \`nums\` using \`enumerate\` to get both the index and the value of each element.
3. For each element \`num\`, we calculate its complement as \`target - num\`.
4. We check if this complement is already in \`complement_map\`. If it is, we have found our two numbers that add up to the target, and we return their indices.
5. If the complement is not in the map, we add the current element and its index to \`complement_map\`.

# Analysis
- Time Complexity: O(n), where n is the number of elements in \`nums\`. We traverse the list only once.
- Space Complexity: O(n), as we store at most n elements in the hash map.
`);

  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{ __html: md.render(markdownContent) }} />
    </React.Fragment>
  );
}

export default SolutionComponent;
