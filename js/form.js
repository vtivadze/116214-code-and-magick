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




  var reviewName = document.getElementById('review-name');
  reviewName.setAttribute('required', 'required');

  var reviewFields = document.getElementsByClassName('review-fields')[0];
  var reviewFieldsName = document.getElementsByClassName('review-fields-name')[0];
  var reviewFieldsText = document.getElementsByClassName('review-fields-text')[0];

  var isReviewFieldsNameEmpty = true;
  var isReviewFieldsTextEmpty = true;
  var isReviewTextRequired = false;

  var button = document.querySelector('button[type="submit"');
  button.setAttribute('disabled', 'disabled');

  var reviewText = document.getElementById('review-text');
  reviewFieldsText.style.display = 'none';

  var reviewMarkInputList = document.querySelectorAll('[name="review-mark"]');

  for (var i = 0; i < reviewMarkInputList.length; i++) {
    reviewMarkInputList[i].onchange = function(evt) {

      var reviewMarkInputValue = evt.target.getAttribute('value');

      if (reviewMarkInputValue < 3) {

        reviewText.setAttribute('required', 'required');
        isReviewTextRequired = true;

        if (isReviewFieldsTextEmpty === true) {
          if (reviewFields.style.display === 'none') {
            reviewFields.style.display = 'inline-block';
          }
          reviewFieldsText.style.display = 'inline';
        }

      } else {
        reviewText.removeAttribute('required');
        isReviewTextRequired = false;
        reviewFieldsText.style.display = 'none';

        if (reviewFieldsName.style.display === 'none') {
          reviewFields.style.display = 'none';
        }

      }
      buttonDisableChecking();
    };
  }



  reviewName.oninput = function(evt) {
    if (evt.target.value) {
      isReviewFieldsNameEmpty = false;
      reviewFieldsName.style.display = 'none';
      if (reviewFieldsText.style.display === 'none') {
        reviewFields.style.display = 'none';
      }
    } else {
      isReviewFieldsNameEmpty = true;
      if (reviewFields.style.display === 'none') {
        reviewFields.style.display = 'inline-block';
      }
      reviewFieldsName.style.display = 'inline';
    }
    buttonDisableChecking();
  };

  reviewText.oninput = function(evt) {

    if (evt.target.value) {
      isReviewFieldsTextEmpty = false;
      if (isReviewTextRequired) {
        reviewFieldsText.style.display = 'none';
        if (reviewFieldsName.style.display === 'none') {
          reviewFields.style.display = 'none';
        }
      }
    } else {
      isReviewFieldsTextEmpty = true;
      if (isReviewTextRequired) {
        if (reviewFields.style.display === 'none') {
          reviewFields.style.display = 'inline-block';
        }
        reviewFieldsText.style.display = 'inline';
      }
    }
    buttonDisableChecking();
  };

  function buttonDisableChecking() {
    if (isReviewFieldsNameEmpty === false && (isReviewTextRequired === false || isReviewTextRequired === true && isReviewFieldsTextEmpty === false)) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

})();
