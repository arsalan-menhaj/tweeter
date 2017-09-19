$("document").ready(function () {
  let counter = 140;
  let counterView = $("#counter");

  function handleTextChange(element) {
    if (counter < 0) {
      element.addClass("text-too-long");
    } else {
      element.removeClass("text-too-long");
    }
  }

  $("#new-tweet-input").on("keyup", function() {
    let inputLength = +$(this).val().length;
    counter = 140 - inputLength;
    handleTextChange($("#counter"));
    $("#counter").text(counter);
  });
});