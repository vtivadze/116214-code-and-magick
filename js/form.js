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

  var reviewMarkLabelList = document.querySelectorAll('.review-mark-label');

  for (var i = 0; i < reviewMarkLabelList.length; i++) {
    reviewMarkLabelList[i].onclick = function(evt) {

      var reviewMarkId = evt.target.getAttribute('for');
      var reviewMark = document.getElementById(reviewMarkId);
      var reviewMarkValue = reviewMark.getAttribute('value');

      if (reviewMarkValue < 3) {

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
    };
  }



  reviewName.onblur = function(evt) {
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

  reviewText.onblur = function(evt) {
    if (REVIEW_TEXT_REQUIRED) {
      if (evt.target.value) {
        REVIEW_FIELDS_TEXT_EMPTY = false;
        reviewFieldsText.style.display = 'none';
        if (reviewFieldsName.style.display === 'none') {
          reviewFields.style.display = 'none';
        }
      } else {
        REVIEW_FIELDS_TEXT_EMPTY = true;
        if (reviewFields.style.display === 'none') {
          reviewFields.style.display = 'inline-block';
        }
        reviewFieldsText.style.display = 'inline';
      }
    }
    buttonDisableChecking();
  };

  function buttonDisableChecking() {
    if (!REVIEW_FIELDS_NAME_EMPTY && !REVIEW_TEXT_REQUIRED) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }

})();
