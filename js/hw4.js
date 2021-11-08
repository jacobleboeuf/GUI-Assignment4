/**
 * File: hw4.js
 * GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table
 *
 * - This assignment uses HTML, CSS, and JavaScript to create a Multiplication
     table based off of solely user input via a form, done so completely dynamically
 *
 * - This file contains the JavaScript for the entire project, taking the
 *   inputted values by the user to create and display a Multiplication Table
 *   based on those values, or providing JQuery
 *
 * Jacob Leboeuf, UMass Lowell Computer Science, jacob_leboeuf@student.uml.edu,
 * Copyright (c) 2021 by Jacob. All rights reserved. May be freely copied or
 * excerpted for educational purposes with credit to the author.
 * updated by JL on November 7, 2021 at 9:30 PM
**/
const inputs = document.querySelector('.inputs');
const minColText = document.getElementById("minColText");
const maxColText = document.getElementById("maxColText");
const minRowText = document.getElementById("minRowText");
const maxRowText = document.getElementById("maxRowText");
const table = document.getElementById("table");
var minCol, maxCol, minRow, maxRow;
/**
  * This function checks if the values inputted within the form
  * are numbers, and converts math symbols, such as pi and e, into
  * their respective whole number values
  *
  * @param {string} value - input being checked
  *
  * @return {int} - Whole number equivalent for table
**/
function checkForMathVars(value) {
    if (isNaN(value) && (value == "e" || value == "pi")) {
        value = 3;
    } else if (isNaN(value) && (value == "-e" || value == "-pi")) {
        value = -3;
    } else if (!isNaN(value)) {
        return Math.round(value);
    }
    return value;
}
/**
  * This function creates an HTML table element, fills the tabke
  * with accurate Multiplication table values based off of the
  * parameters given, and returns the filled HTML table element
  *
  * @param {int} minCol - Minimum column value
  * @param {int} maxCol - Maximum column value
  * @param {int} minRow - Minimum row value
  * @param {int} maxRow - Maximum row value
  *
  * @return {string} - HTML equivalent of Multiplication Table
  *                    based on parameters
**/
function createTable(minCol, maxCol, minRow, maxRow) {
    var values = "";
    values += "<center><table>";
    //values += "<th>";
    values +="<tr><th id = \"space\"><center>x</center></th>"
    for (var a = minCol; a <= maxCol; a++) {
        values +="<th id=\"row\"><center>" + a + "</center></th>";
    }
    values += "</tr>";
    for (var i = minRow; i <= maxRow; i++) {
        values += "<tr>";
        values += "<th id=\"row\"><center>" + i + "</center></th>"
        for (var j = minCol; j <= maxCol; j++) {
          values += "<td><center>" + i * j + "</center></td>";
        }
        values += "</tr>";
    }

    values += "</table></center>";
    return values;
}
/**
  * This function essentially serves as the main 'function',
  * where upon user submission of the form it checks if the
  * inputs are valid, and proceeds to either inform the user of
  * where/how the inputs are invalid, or generate and display
  * a Multiplication table based upon valid inputs.
  *
**/
inputs.addEventListener('submit',(e) => {
    e.preventDefault();
    minCol = checkForMathVars(document.getElementById("minCol").value);
    maxCol = checkForMathVars(document.getElementById("maxCol").value);
    minRow = checkForMathVars(document.getElementById("minRow").value);
    maxRow = checkForMathVars(document.getElementById("maxRow").value);
    if (isNaN(minCol)) {
        infotext.innerHTML = "<p>Minimum Column Value is not a number!</p>";
    } else if (isNaN(maxCol)) {
        infotext.innerHTML = "<p>Maximum Column Value is not a number!</p>";
    } else if (isNaN(minRow)) {
        infotext.innerHTML = "<p>Minimum Row Value is not a number!</p>";
    } else if (isNaN(maxRow)) {
        infotext.innerHTML = "<p>Maximum Row Value is not a number!</p>";
    } else if (minCol > maxCol) {
        infotext.innerHTML = "<p>Minimum Column Value cannot be greater than the Maximum Column Value!</p>";
    } else if (minRow > maxRow) {
        infotext.innerHTML = "<p>Minimum Row Value cannot be greater than the Maximum Row Value!</p>";
    } else if ((maxCol - minCol) > 200) {
        infotext.innerHTML = "<p>Column range cannot exceed 200 between minimum and maximum values!<\p>";
    } else if ((maxRow - minRow) > 200) {
        infotext.innerHTML = "<p>Row range cannot exceed 200 between minimum and maximum values!<\p>";
    } else {
        infotext.innerHTML = "<p>Decimal numbers are rounded to whole numbers.</p>";
        infotext.innerHTML += "<p>Mathematical symbols 'e' and 'pi' are rounded to 3.</p>";
        table.innerHTML = createTable(minCol, maxCol, minRow, maxRow);
    }
});
