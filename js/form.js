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
  var buttonReviewSubmit = form.elements['review-submit'];

  buttonReviewSubmit.onclick = function(evt) {
    evt.preventDefault();

    var reviewMarks = form['review-marks'].elements;
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

    var expires = new Date(+today + +today - +lastBirthday);

    docCookies.setItem('reviewMark', reviewMark, expires);
    docCookies.setItem('reviewName', reviewName, expires);

  };

})();
