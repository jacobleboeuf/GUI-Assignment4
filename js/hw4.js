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
*/
$(function() {
    /**
      * Validator compare() function
      * - Throws error message if minimum column/row value
      *   is larger than maximum column/row value
    */
    jQuery.validator.addMethod("compare", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return n1 <= n2;
          } else {
              return n1 >= n2;
          }
    }, "<p>Mininum {1} value must be <= Maximum {1} value!</p>");
    /**
      * Validator checkRange() function
      * - Throws error message if column/row value
      *   range exceeds 200
    */
    jQuery.validator.addMethod("checkRange", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return Math.abs(n2 - n1) <= 200;
          } else {
              return Math.abs(n1 - n2) <= 200;
          }
    },"<p>{1} range cannot exceed 200</p><p>between minimum and maximum values!</p>");
    /**
     * JQuery validation function:
     * - Throws error messages if user enters invalid inputs
     * - Creates the Multiplication table upon valid inputs
    */
    $("#inputs").validate({
        rules: {
            minCol : {
                required: true,
                number: true,
                compare: ['maxCol', 'Column', true],
                checkRange: ['maxCol', 'Column', true]
            },
            maxCol : {
                required: true,
                number: true,
                compare: ['minCol', 'Column', false],
                checkRange: ['minCol', 'Column', false]
            },
            minRow : {
                required: true,
                number: true,
                compare: ['maxRow', 'Row', true],
                checkRange: ['maxRow', 'Row', true]
            },
            maxRow : {
                required: true,
                number: true,
                compare: ['minRow', 'Row', false],
                checkRange: ['minRow', 'Row', false]
            }
        },
        messages: {
            minCol: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            },
            maxCol: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            },
            minRow: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            },
            maxRow: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            }
        },
        // Places error messages in desired places
        errorPlacement: function(error, element) {
            if (element.attr("name") == "minCol") {
                error.appendTo($("#minColText"));
            } else if (element.attr("name") == "maxCol") {
                error.appendTo($("#maxColText"));
            } else if (element.attr("name") == "minRow") {
                error.appendTo($("#minRowText"));
            } else if (element.attr("name") == "maxRow") {
                error.appendTo($("#maxRowText"));
            }
        },
        // Rounds decimal values and calls createTable function
        submitHandler: function(form, e) {
            e.preventDefault();
            minCol = Math.round(document.getElementById("minCol").value);
            maxCol = Math.round(document.getElementById("maxCol").value);
            minRow = Math.round(document.getElementById("minRow").value);
            maxRow = Math.round(document.getElementById("maxRow").value);
            infotext.innerHTML = "<p>Decimal numbers are rounded to whole numbers.</p>";
            table.innerHTML = createTable(minCol, maxCol, minRow, maxRow);
        }
    })
});
