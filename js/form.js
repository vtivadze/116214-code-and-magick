'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };



  var buttonReviewSubmit = document.getElementsByClassName('review-submit')[0];
  buttonReviewSubmit.onsubmit = function(evt) {
    evt.preventDefault();
    var reviewMark = document.querySelectorAll('.review-form-group-mark input[checked]')[0].getAttribute('value');
    var reviewName = document.querySelector('#review-name').value;
    debugger;
  };

})();
