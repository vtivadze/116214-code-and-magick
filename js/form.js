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

  var REVIEW_FIELDS_NAME_EMPTY = true;
  var REVIEW_FIELDS_TEXT_EMPTY = true;
  var REVIEW_TEXT_REQUIRED = false;

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
        REVIEW_TEXT_REQUIRED = true;

        if (REVIEW_FIELDS_TEXT_EMPTY === true) {
          if (reviewFields.style.display === 'none') {
            reviewFields.style.display = 'inline-block';
          }
          reviewFieldsText.style.display = 'inline';
        }

      } else {
        reviewText.removeAttribute('required');
        REVIEW_TEXT_REQUIRED = false;
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
      REVIEW_FIELDS_NAME_EMPTY = false;
      reviewFieldsName.style.display = 'none';
      if (reviewFieldsText.style.display === 'none') {
        reviewFields.style.display = 'none';
      }
    } else {
      REVIEW_FIELDS_NAME_EMPTY = true;
      if (reviewFields.style.display === 'none') {
        reviewFields.style.display = 'inline-block';
      }
      reviewFieldsName.style.display = 'inline';
    }
    buttonDisableChecking();
  };

  reviewText.oninput = function(evt) {

    if (evt.target.value) {
      REVIEW_FIELDS_TEXT_EMPTY = false;
      if (REVIEW_TEXT_REQUIRED) {
        reviewFieldsText.style.display = 'none';
        if (reviewFieldsName.style.display === 'none') {
          reviewFields.style.display = 'none';
        }
      }
    } else {
      REVIEW_FIELDS_TEXT_EMPTY = true;
      if (REVIEW_TEXT_REQUIRED) {
        if (reviewFields.style.display === 'none') {
          reviewFields.style.display = 'inline-block';
        }
        reviewFieldsText.style.display = 'inline';
      }
    }
    buttonDisableChecking();
  };

  function buttonDisableChecking() {
    if (REVIEW_FIELDS_NAME_EMPTY === false && REVIEW_TEXT_REQUIRED === false) {
      button.disabled = false;
    } else if (REVIEW_FIELDS_NAME_EMPTY === false && REVIEW_TEXT_REQUIRED === true && REVIEW_FIELDS_TEXT_EMPTY === false) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

})();
