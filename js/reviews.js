'use strict';

(function() {

  var NO_MORE = '<h1>There is no more data!</h1>';
  var pageCount;
  var currentPage = 0;
  var ADD_PAGE_REGIME = true;
  var REVIEWS_PER_PAGE = 3;
  var filteredReviews = [];
  var reviewsSection = document.querySelector('.reviews');
  var reviewsAll = [];
  var activeFilter = 'reviews-all';

  var filter = document.querySelector('.reviews-filter');

  filter.onclick = function(evt) {
    var clickedElement = evt.target;
    if (clickedElement.classList.contains('reviews-filter-item')) {
      var clickedFilterID = evt.target.getAttribute('for');
      setActiveFilter(clickedFilterID);
    }
  };

  getReviews();

  var more = document.querySelector('.reviews-controls-more');
  more.onclick = function() {
    if (filteredReviews.length > 0) {
      renderReviews(filteredReviews);
    }
  };

  function renderReviews(reviews) {

    var reviewsList = document.querySelector('.reviews-list');
    if (currentPage === 0 || !ADD_PAGE_REGIME) {
      reviewsList.innerHTML = '';
    }
    var reviewsFragment = document.createDocumentFragment();
    var reviewListItem = null;

    if (currentPage < pageCount) {
      var currentPageReviews = reviews.slice(currentPage * REVIEWS_PER_PAGE, (currentPage + 1) * REVIEWS_PER_PAGE);
      currentPage++;

      currentPageReviews.forEach(function(review) {
        reviewListItem = getElementFromTemplate(review);
        reviewsFragment.appendChild(reviewListItem);
      });
    } else {
      reviewsList.innerHTML = NO_MORE;
      currentPage = 0;
      activeFilter = '';
      more.classList.add('invisible');
    }
    reviewsSection.classList.remove('reviews-list-loading');
    reviewsList.appendChild(reviewsFragment);
  }

  function setActiveFilter(id) {
    if (activeFilter === id) {
      return;
    }
    var sortedReviews = reviewsAll.slice(0);

    more.classList.remove('invisible');
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

    currentPage = 0;
    pageCount = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);

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
      filteredReviews = reviewsAll.slice(0);

      pageCount = Math.ceil(loadedReviews.length / REVIEWS_PER_PAGE);
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
