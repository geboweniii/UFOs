//************************************************ */
// 11.2.4 - Storyboarding
//************************************************ */

// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select('tbody');


//************************************************ */
// 11.5.1 - Introduction to Dynamic Tables
//************************************************ */
function buildTable(data) {
  // init table data
  tbody.html('');

  // 11.5.2 - Add forEach to Your Table
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append('tr'); //html

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) =>{
      let cell = row.append('td'); //html
      cell.text(val);
      }
    );
  });
}

// EXTRA: Create a variable to keep track of all the filters as an object.
var clearEntries = d3.select("#clear-btn");
clearEntries.on("click", function() {
  location.reload();
});

// 1. Create a variable to keep track of all the filters as an object.
var filters = {
};

// 3. Use this function to update the filters. 
function updateFilters() {

  // 4a. Save the element that was changed as a variable.
  let inputElement = d3.select(this);

  // 4b. Save the value that was changed as a variable.
  let inputValue = inputElement.property("value");

  // 4c. Save the id of the filter that was changed as a variable.
  let inputID = inputElement.attr("id");

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.

    if (inputValue) {
      filters[inputID] = inputValue;
  } else{filters ={};};


  // 6. Call function to apply all filters and rebuild the table
  filterTable(filters);
};

// 7. Use this function to filter the table when data is entered.
function filterTable(obj) {
  
  // 8. Set the filtered data to the tableData.
  let filteredData = tableData;

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(obj).forEach(([fkey, fval]) =>{
      
    filteredData = filteredData.filter((row) => row[fkey] === fval)
        

});

  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
};

// //************************************************ */
// // 11.5.2 - Add forEach to Your Table
// //************************************************ */
// data.forEach((dataRow) => {
//     let row = tbody.append("tr");
//     Object.values(dataRow).forEach((val) => {
//       let cell = row.append("td");
//       cell.text(val);
//       }
//     );
//   });

// //************************************************ */
// // 11.5.3 - Add Filters
// //************************************************ */
// function handleClick() {
//     let date = d3.select("#datetime").property("value");
//     let filteredData = tableData;

//     //************************************************ */
//     //11.5.4 - Use the “If” Statement
//     //************************************************ */
//    // Check to see if a date was entered and filter the
//     // data using that date.
//     if (date) {
//     // Apply `filter` to the table data to only keep the
//     // rows where the `datetime` value matches the filter value
//         filteredData = filteredData.filter(row => row.datetime === date);
//     };

//     // Rebuild the table using the filtered data
//     // @NOTE: If no date was entered, then filteredData will
//     // just be the original tableData.
//     buildTable(filteredData);
// }

// // Attach an event to listen for the form button
// d3.selectAll("#filter-btn").on("click", handleClick);

// // Build the table when the page loads
// buildTable(tableData);


// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change",updateFilters);

// Build the table when the page loads
buildTable(tableData);