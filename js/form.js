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




  var reviewFields = document.getElementsByClassName('review-fields')[0];
  var reviewFieldsName = document.getElementsByClassName('review-fields-name')[0];
  var reviewFieldsText = document.getElementsByClassName('review-fields-text')[0];

  var isReviewFieldsNameEmpty = true;
  var isReviewFieldsTextEmpty = true;
  var isReviewTextRequired = false;

  var button = document.querySelector('button[type="submit"');
  button.setAttribute('disabled', 'disabled');

  var form = document.querySelector('.review-form');
  form.elements['review-name'].setAttribute('required', 'required');
  reviewFieldsText.classList.add('invisible');



  var reviewMarkInputList = document.querySelectorAll('[name="review-mark"]');

  for (var i = 0; i < reviewMarkInputList.length; i++) {
    reviewMarkInputList[i].onchange = function() {
      buttonDisableChecking();
    };
  }

  form.elements['review-name'].oninput = function() {
    buttonDisableChecking();
  };

  form.elements['review-text'].oninput = function() {
    buttonDisableChecking();
  };



  function buttonDisableChecking() {

    for (var j = 0; j < reviewMarkInputList.length; j++) {
      if (reviewMarkInputList[j].checked) {
        var reviewMarkInputValue = reviewMarkInputList[j].value;
      }
    }

    if (reviewMarkInputValue < 3) {
      form.elements['review-text'].setAttribute('required', 'required');
      isReviewTextRequired = true;
    } else {
      form.elements['review-text'].removeAttribute('required');
      isReviewTextRequired = false;
    }


    isReviewFieldsTextEmpty = form.elements['review-text'].value ? false : true;
    isReviewFieldsNameEmpty = form.elements['review-name'].value ? false : true;

    reviewFieldsName.classList.toggle('invisible', form.elements['review-name'].value);
    reviewFieldsText.classList.toggle('invisible', !isReviewTextRequired || !isReviewFieldsTextEmpty);
    reviewFields.classList.toggle('invisible', !(isReviewFieldsNameEmpty || isReviewTextRequired && isReviewFieldsTextEmpty));

    button.disabled = isReviewFieldsNameEmpty || isReviewTextRequired && isReviewFieldsTextEmpty;

  }

})();
