$(document).ready(function() {
  var counter = 1;
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

  var $snap = $("#snap"),
    $liveSnap = $("#liveSnap"),
    $container = $("#container"),
    gridWidth = 100,
    gridHeight = 100,
    gridRows = 6,
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
      .prependTo($container);
  }

  //set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
  TweenLite.set($container, {
    height: gridRows * gridHeight + 1,
    width: gridColumns * gridWidth + 1
  });
  TweenLite.set(".box", {
    width: gridWidth,
    height: gridHeight,
    lineHeight: gridHeight + "px"
  });

  //the update() function is what creates the Draggable according to the options selected (snapping).
  function update() {
    var snap = $snap.prop("checked"),
      liveSnap = $liveSnap.prop("checked");
    Draggable.create(".box", {
      bounds: $container,
      edgeResistance: 0.65,
      type: "x,y",
      throwProps: true,
      autoScroll: true,
      liveSnap: liveSnap,
      snap: {
        x: function(endValue) {
          return snap || liveSnap
            ? Math.round(endValue / gridWidth) * gridWidth
            : endValue;
        },
        y: function(endValue) {
          return snap || liveSnap
            ? Math.round(endValue / gridHeight) * gridHeight
            : endValue;
        }
      }
    });
  } //end of update function

  //when the user toggles one of the "snap" modes, make the necessary updates...
  $snap.on("change", applySnap);
  $liveSnap.on("change", applySnap);

  function applySnap() {
    if ($snap.prop("checked") || $liveSnap.prop("checked")) {
      $(".box").each(function(index, element) {
        TweenLite.to(element, 0.5, {
          x: Math.round(element._gsTransform.x / gridWidth) * gridWidth,
          y: Math.round(element._gsTransform.y / gridHeight) * gridHeight,
          delay: 0.1,
          ease: Power2.easeInOut
        });
      });
    }
  } //end of applySnap function
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
    fridgeMagnet.addClass("box");

    // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))
    // attr acts as both a setter and a getter for attributes depending on whether we supply one argument or two
    // NOTE: There IS a $(data) jQuery method, but it doesn't do what you'd expect. So just use attr.
    fridgeMagnet.text($(this).attr("data-letter"));

    fridgeMagnet.attr("id", counter++);

    fridgeMagnet.css({ color: getRandomColor() });

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);
    // Again you can see we use that find, and once its found we append the item
    $("#container").append(fridgeMagnet);
    update();
  });
  update();
}); //end of document ready
