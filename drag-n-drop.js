$(document).ready(function() {
  //grid variables
  var counter = 1
  var letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "_"
  ];

  var $container = $("#container"),
    gridWidth = 100,
    gridHeight = 100,
    gridRows = 5,
    gridColumns = 5,
    i,
    x,
    y;

  //loop through and create the grid (a div for each cell). Feel free to tweak the variables above
  for (i = 0; i < gridRows * gridColumns; i++) {
    y = Math.floor(i / gridColumns) * gridHeight;
    x = (i * gridWidth) % (gridColumns * gridWidth);
    $("<div/>")
      .css({
        position: "absolute",
        border: "1px solid #454545",
        width: gridWidth - 1,
        height: gridHeight - 1,
        top: y,
        left: x
      })
      .attr("ondrop", "drop(event)")
      .attr("ondragover", "allowDrop(event)")
      .prependTo($container);
  } //end of for loop

  for (var i = 0; i < letters.length; i++) {
    // Inside the loop...

    // 2. Create a variable named "letterBtn" equal to $("<button>");
    var letterBtn = $("<button>");

    // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
    letterBtn.addClass("letter-button letter letter-button-color");

    // 4. Then give each "letterBtn" a data-attribute called "data-letter".
    letterBtn.attr("data-letter", letters[i]);

    // 5. Then give each "letterBtns" a text equal to "letters[i]".
    letterBtn.text(letters[i]);

    // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
    $("#buttons").append(letterBtn);
  } //end of button for loop

  $(".letter-button").on("click", function() {
    // Inside the on-click event...

    // 8. Create a variable called "fridgeMagnet" and set the variable equal to a new div.
    var fridgeMagnet = $("<div>");

    // 9. Give each "fridgeMagnet" the following classes: "letter fridge-color".
    fridgeMagnet.addClass("letter fridge-color drag");

    // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))
    // attr acts as both a setter and a getter for attributes depending on whether we supply one argument or two
    // NOTE: There IS a $(data) jQuery method, but it doesn't do what you'd expect. So just use attr.
    fridgeMagnet.text($(this).attr("data-letter"));

    fridgeMagnet.attr("draggable", true);

	fridgeMagnet.attr("ondragstart", "drag(event)");
	
	fridgeMagnet.attr("id", counter++)
    // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);
    // Again you can see we use that find, and once its found we append the item
    $("#letter").append(fridgeMagnet);
  });
}); //End of document.ready
