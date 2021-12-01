console.log('app.js is running');


d3.select('div')
    // Select all 'p' elements inside that div (in the beginning there won't be any)
    // We can bind elements which don't exist yet to the data so that we automatically
    //  generate them when data is there.  I think this concept becomes fully realized
    //  when we also call ".enter()"" below.
    .selectAll('p')
    // The above call returns another selection, so we could in-turn call selectAll('span') to select stuff inside the 'p' tags
    //.selectAll('span')
    
    // Usually pass an array.
    // Now all 'p' tags in the div are bound to this data
    .data([1, 2, 3]) 
    // "Give me the 'missing elements'"
    .enter()
    // "For each 'missing element', render a new 'p' tag"
    .append('p')
    // For every created 'p' tag, set the text
    .text(data => data);

