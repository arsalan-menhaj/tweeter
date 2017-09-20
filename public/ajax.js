$(document).ready(function() {
  var $form = $('#new-tweet-submit');
  $form.on('submit', function (event) {
    console.log('Button clicked, performing ajax call...');
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: formData,
      success: function (data) {
        console.log('Success: ', this.data);
      }
    });
  });
});

