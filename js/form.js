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
  reviewFieldsText.classList.add('invisible');

  var reviewMarkInputList = document.querySelectorAll('[name="review-mark"]');

  for (var i = 0; i < reviewMarkInputList.length; i++) {
    reviewMarkInputList[i].onchange = function(evt) {

      var reviewMarkInputValue = evt.target.getAttribute('value');

      if (reviewMarkInputValue < 3) {

        reviewText.setAttribute('required', 'required');
        isReviewTextRequired = true;

        if (isReviewFieldsTextEmpty === true) {
          reviewFieldsText.classList.remove('invisible');
        }

      } else {
        reviewText.removeAttribute('required');
        isReviewTextRequired = false;
        reviewFieldsText.classList.add('invisible');
      }
      buttonDisableChecking();
    };
  }



  reviewName.oninput = function(evt) {
    buttonDisableChecking('name', evt.target.value);
  };

  reviewText.oninput = function(evt) {
    buttonDisableChecking('text', evt.target.value);
  };



  function buttonDisableChecking(fieldName, fieldValue) {

    switch (fieldName) {
      case 'name':

        if (fieldValue) {
          isReviewFieldsNameEmpty = false;
          reviewFieldsName.classList.add('invisible');
        } else {
          isReviewFieldsNameEmpty = true;
          reviewFieldsName.classList.remove('invisible');
        }


        break;
      case 'text':

        if (fieldValue) {
          isReviewFieldsTextEmpty = false;
          if (isReviewTextRequired) {
            reviewFieldsText.classList.add('invisible');
          }
        } else {
          isReviewFieldsTextEmpty = true;
          if (isReviewTextRequired) {
            reviewFieldsText.classList.remove('invisible');
          }
        }

        break;
    }

    if (reviewFieldsName.classList.contains('invisible') && reviewFieldsText.classList.contains('invisible')) {
      reviewFields.classList.add('invisible');
    } else {
      reviewFields.classList.remove('invisible');
    }

    button.disabled = isReviewFieldsNameEmpty || isReviewTextRequired && isReviewFieldsTextEmpty;

  }

})();
