/* global docCookies: true */
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



  var form = document.forms['review-form'];
  var reviewMarks = form['review-marks'].elements;

  //get cookies
  form['review-name'].value = docCookies.getItem('reviewName') ? docCookies.getItem('reviewName') : '';
  reviewMarks[docCookies.getItem('reviewMark') - 1].checked = docCookies.getItem('reviewMark') ? true : false;

  //set cookies
  form.onsubmit = function(evt) {
    evt.preventDefault();

    for (var i = 0; i < reviewMarks.length; i++) {
      if (reviewMarks[i].checked === true) {
        var reviewMark = reviewMarks[i].value;
        break;
      }
    }
    var reviewName = form['review-name'].value;

    var BIRTHDAY_MONTH = 3;
    var BIRTHDAY_DAY = 1;

    var today = new Date();
    var curYear = today.getFullYear();
    var curYearBirtday = new Date(curYear, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    var lastBirthday = today > curYearBirtday ? curYearBirtday : new Date(curYear - 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);

    var expires = new Date(+today + today - lastBirthday);

    docCookies.setItem('reviewMark', reviewMark, expires);
    docCookies.setItem('reviewName', reviewName, expires);

  };



  //form validation
  var reviewFields = document.getElementsByClassName('review-fields')[0];
  var reviewFieldsName = document.getElementsByClassName('review-fields-name')[0];
  var reviewFieldsText = document.getElementsByClassName('review-fields-text')[0];

  var isReviewFieldsNameEmpty = true;
  var isReviewFieldsTextEmpty = true;
  var isReviewTextRequired = false;

  var button = document.querySelector('button[type="submit"');
  button.setAttribute('disabled', 'disabled');

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
