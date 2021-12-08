import './style.css'
import * as d3 from 'd3';

console.log('app.js is running');
//#region ----- FIRST EXAMPLE -----
// d3.select('div')
//     // Select all 'p' elements inside that div (in the beginning there won't be any)
//     // We can bind elements which don't exist yet to the data so that we automatically
//     //  generate them when data is there.  I think this concept becomes fully realized
//     //  when we also call ".enter()"" below.
//     .selectAll('p')
//     // The above call returns another selection, so we could in-turn call selectAll('span') to select stuff inside the 'p' tags
//     //.selectAll('span')
    
//     // Usually pass an array.
//     // Now all 'p' tags in the div are bound to this data
//     .data([1, 2, 3]) 
//     // "Give me the 'missing elements'"
//     .enter()
//     // "For each 'missing element', render a new 'p' tag"
//     .append('p')
//     // For every created 'p' tag, set the text
//     .text(data => data);
//#endregion

//#region ------ SECOND EXAMPLE: BAR CHART ----
/*
const data = [
  { id: 'd1', value: 10, region: 'USA' },
  { id: 'd2', value: 17, region: 'India' },
  { id: 'd3', value:  6, region: 'China' },
  { id: 'd4', value: 22, region: 'Germany' },
];

const maxValue = d3.max(data, item => item.value);
const minValue = d3.min(data, item => item.value);

const svgWidth = 250,
  svgHeight = 200;

// Our xScale function allows us to calculate a POSITION on the X axis.
// scaleBand() will basically give us an ordinal scale: 
//   a scale where every element will have the same width.  That is, a uniform distribution.
// From: https://observablehq.com/@d3/d3-scaleordinal:
//   "A scale is said to be categorical if its domain is a discrete set, and ordinal if
//    that set is ordered."
// From: https://observablehq.com/@d3/d3-scaleband:
//   "Band scales are convenient for charts with an ordinal or categorical dimension."
//   It then shows a helpful bar chart example.
const xScale = 
  d3.scaleBand()
  // Tells D3 how many items need to be scaled (or what the items are since we give it an array)
  .domain(data.map(item => item.region))
  // From 0 to the entire visual width we have available.  This in-turn tells D3 how much 
  //  space it has to work with, thus how much space each item should have.
  // rangeRound() is similar to range(), but rounds values to an integer. https://github.com/d3/d3-scale/blob/main/README.md#band_rangeRound
  .rangeRound([0, svgWidth])
  // A percentage of space between bars.
  .padding(0.1);


const yScale =
  d3.scaleLinear()
  // What the min and max value we want to map into our chart
  // "Zero-based" approach
  //.domain([0, maxValue + maxValue * 0.1])
  // "Vertical stretch" mode
  .domain([minValue - minValue * 0.2, maxValue + maxValue * 0.08])
  // Make the first value the max b/c D3's coordinate system starts in the upper left
  .range([svgHeight, 0]);


const container = d3.select('svg.chart')
    .classed('container', true)
    .attr('width', svgWidth)
    .attr('height', svgHeight);

const barClassName = 'bar';

const bars = container
    // See this section of the video for a 1-minute explanation about why we need to have 
    //  the selectAll() in here: https://youtu.be/TOJ9yjvlapY?t=2612
    //  It basically tells D3 which DOM items will be tied to the data.  The container
    //   cannot serve that purpose.
    //  It needs to know what DOM items it has to compare with when we later call things 
    //   like enter() or exit().
    .selectAll(`.${barClassName}`)
    .data(data)
    .enter() // "Give me the data items that have not been rendered yet"
    .append('rect')
    .classed(barClassName, true)

    .attr('width', xScale.bandwidth())
    // Must subtract the height of each scaled item height from the overall svg height 
    //  because D3's coordinate system starts in the upper left corner.
    //  Furthermore, the value returned by yScale() is the y position for this data item.
    //  That is, the starting point from which the item will get drawn downward from.
    //  Another way to think about this is "Subtrack the blank space (above the bar) from the total height"
    .attr('height', data => svgHeight - yScale(data.value))
    .attr('x', item => xScale(item.region))
    .attr('y', item => yScale(item.value));


setTimeout(() => {
  bars
    .data(data.slice(0, 2))
    // exit() is the opposite of enter()
    // It gives you the elements that should be REMOVED based on the new data
    //  (items that were rendered but now don't have a corresponding data item now)
    .exit()
    .remove();
}, 1500);
*/
//#endregion


//#region ----- THIRD EXAMPLE: Data-binding lesson ------
// From this video: https://www.youtube.com/watch?v=ZOeWdkq-L90&list=PL55RiY5tL51r1NlkJLzVhui1S480gnuNG&index=4
/*
const countryData = {
  items: ['China', 'India', 'USA'],
  addItem(item) {
    this.items.push(item);
  },
  removeItem(index) {
    this.items.splice(index, 1);
  },
  updateItem(index, newItem) {
    this.items[index] = newItem;
  }
};

const itemSelector = 'li';

const countryElements = d3
  .select('.list')
  .selectAll(itemSelector)
  // The second argument to .data() specifies a unique key that should be associated with each
  //  data item so that d3 can identify it later when comparing data changes.  If that key function
  //  is not provided, then d3 just considers items in their index position, which usually leads
  //  to problems.
  .data(countryData.items, item => item)
  .enter()
  .append(itemSelector)
  .text(item => item);

setTimeout(() => {
  countryData.addItem('Australia');
  countryElements
  .data(countryData.items, item => item)
    .enter()
    .append(itemSelector)
    .classed('added', true)
    .text(item => item);
}, 1500);

setTimeout(() => {
  countryData.removeItem(0);

  // This approach did not work here
  // countryElements
  //   .data(countryData.items)
  //   .exit()
  //   .classed('redundant', true);

  d3
    .select('.list')
    .selectAll(itemSelector)
    .data(countryData.items, item => item)
    .exit()
    .classed('redundant', true);
}, 3000);

setTimeout(() => {
  countryData.updateItem(1, 'Russia');
  d3
    .select('.list')
    .selectAll(itemSelector)
    .data(countryData.items, item => item)
    .exit()
    .classed('updated', true)
    //.text(item => item);
    .text('Russia');
}, 5000);
*/

//#endregion

//#region ------- JOIN EXAMPLE by Mike Bostock --------
// From: https://bost.ocks.org/mike/join/

const data = [
  { name: 'Chester', x:  5, y: 19 },
  { name: 'Linda',   x: 15, y:  8 },
  { name: 'Mike',    x:  2, y:  5 },
  { name: 'Sara',    x: 18, y: 12 }
];

const maxX = d3.max(data, item => item.x);
const minX = d3.min(data, item => item.x);
const maxY = d3.max(data, item => item.y);
const minY = d3.min(data, item => item.y);

const circleRadius = 3;

const domainMinX = minX - minX * 0.5;
const domainMinY = minY - minY * 0.5;


const svgWidth = 250,
      svgHeight = 200;

const xScale = d3.scaleLinear()
  //.domain([0, maxX + maxX * 0.1])
  .domain([domainMinX, maxX + maxX * 0.1])
  .range([0, svgWidth]);

const yScale = d3.scaleLinear()
  .domain([domainMinY, maxY + maxY *0.1])
  .range([0, svgHeight]);

const container = d3
  .select('.chart')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

const renderCircles = () => {
  const circles = container
    .selectAll('circle')
    .data(data);
  
  circles.exit().remove();
  
  circles.enter().append('circle').attr('r', circleRadius)
    .merge(circles)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y));
      // .append('span')
      // .text(item => item.name);
}

renderCircles();

setTimeout(() => {
  data[1] = { name: 'Larry', x: 8, y: 15 };
  renderCircles();
  console.log('setTimeout func done');
}, 1500);

//#endregion