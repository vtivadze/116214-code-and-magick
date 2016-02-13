'use strict';

(function() {

  var reviewsSection = document.querySelector('.reviews');
  var reviewsAll = [];
  var activeFilter = 'reviews-all';

  var filters = document.querySelector('.reviews-filter').elements;
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var clickedFilterID = evt.target.id;
      setActiveFilter(clickedFilterID);
    };
  }

  getReviews();

  function renderReviews(reviews) {
    var reviewsList = document.querySelector('.reviews-list');
    reviewsList.innerHTML = '';
    var reviewsFragment = document.createDocumentFragment();
    var reviewListItem = null;
    reviews.forEach(function(review) {
      reviewListItem = getElementFromTemplate(review);
      reviewsFragment.appendChild(reviewListItem);
    });
    reviewsSection.classList.remove('reviews-list-loading');
    reviewsList.appendChild(reviewsFragment);
  }

  function setActiveFilter(id) {
    if (activeFilter === id) {
      return;
    }
    var sortedReviews = reviewsAll.slice(0);
    var filteredReviews = [];

    var PERIOD_DAY_COUNT = 14;
    var GOOD_RATING = 3;

    switch (id) {
      case 'reviews-all':
        filteredReviews = reviewsAll.slice(0);
        activeFilter = 'reviews-all';
        break;
      case 'reviews-recent':
        sortedReviews = sortedReviews.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        filteredReviews = sortedReviews.filter(function(el) {
          return new Date(el.date) > (new Date(sortedReviews[0].date) - (PERIOD_DAY_COUNT * 24 * 60 * 60 * 1000));
        });
        activeFilter = 'reviews-recent';
        break;
      case 'reviews-good':
        sortedReviews = sortedReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
        filteredReviews = sortedReviews.filter(function(el) {
          return el.rating >= GOOD_RATING;
        });
        activeFilter = 'reviews-good';
        break;
      case 'reviews-bad':
        sortedReviews = sortedReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });
        filteredReviews = sortedReviews.filter(function(el) {
          return el.rating < GOOD_RATING;
        });
        activeFilter = 'reviews-bad';
        break;
      case 'reviews-popular':
        sortedReviews = sortedReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        filteredReviews = sortedReviews;
        activeFilter = 'reviews-popular';
        break;
    }

    renderReviews(filteredReviews);
  }

  function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.timeout = 10000;

    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      var loadedReviews = JSON.parse(rawData);
      reviewsAll = loadedReviews;

      renderReviews(loadedReviews);
    };

    xhr.onerror = function() {
      reviewsSection.classList.remove('reviews-list-loading');
      reviewsSection.classList.add('reviews-load-failure');
    };

    xhr.ontimeout = function() {
      reviewsSection.classList.remove('reviews-list-loading');
      reviewsSection.classList.add('reviews-load-failure');
    };

    reviewsSection.classList.add('reviews-list-loading');
    xhr.send();
  }

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
