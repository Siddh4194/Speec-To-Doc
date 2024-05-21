const markdownPdf = require('markdown-pdf')

const markdownText = `
## This is a Markdown document

This is some text in the document.
`;

const pdf =  markdownPdf(markdownText);

// Save the PDF to a file
 pdf.save('my-document.pdf');