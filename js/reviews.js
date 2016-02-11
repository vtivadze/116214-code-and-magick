/* global reviews: true; */
'use strict';

(function() {

  var reviewsFilter = document.getElementsByClassName('reviews-filter')[0];
  reviewsFilter.classList.add('invisible');

  var reviewsList = document.getElementsByClassName('reviews-list')[0];

  var reviewListItem = null;
  reviews.forEach(function(review) {
    reviewListItem = getElementFromTemplate(review);
    reviewsList.appendChild(reviewListItem);
  });

  function getElementFromTemplate(data) {
    var template = document.querySelector('#review-template');

    var element = null;
    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }

    var REVIEW_RATING_WIDTH = 30;
    element.querySelector('.review-rating').style.width = REVIEW_RATING_WIDTH * data.rating + 'px';
    element.querySelector('.review-text').textContent = data.description;
    element.querySelector('.review-author').setAttribute('alt', data.author.name);
    element.querySelector('.review-author').setAttribute('title', data.author.name);

    var reviewAuthorImg = new Image();
    reviewAuthorImg.onload = function() {
      clearTimeout(imgLoadTimeout);
      element.querySelector('.review-author').src = reviewAuthorImg.src;
    };
    reviewAuthorImg.onerror = function() {
      element.querySelector('.review-author').classList.add('review-load-failure');
    };
    reviewAuthorImg.src = data.author.picture;

    var IMG_TIMEOUT = 10000;
    var imgLoadTimeout = setTimeout(function() {
      reviewAuthorImg.src = '';
      element.querySelector('.review-author').classList.add('review-load-failure');
    }, IMG_TIMEOUT);

    element.classList.add('review');

    return element;
  }

})();
