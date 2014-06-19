var shopifyOpenSource = (function(module, $) {

  'use strict';

  // Functions
  var init, getStats;

  // Variables
  var settings;

  init = function (options) {

    // Default settings
    settings = {
      repo_name: null
    };

    // Override defaults with arguments
    $.extend(settings, options);

    // Remove links from images inside links
    $('a:has(img)').addClass('nounderline');
  };

  getStats = function () {

    var uri = 'https://api.github.com/repos/' + settings.repo_name + '?callback=?';

    $.getJSON(uri, function(result) {
      if (result.meta.status == 403) {
        // hit the request limit. damn.
        document.getElementById('starCount').innerHTML = '!';
        document.getElementById('forkCount').innerHTML = '!';
      } else {
        document.getElementById('starCount').innerHTML = result.data.stargazers_count;
        document.getElementById('forkCount').innerHTML = result.data.forks_count;
      }
    });
  };

  module = {
    init: init
  };

  return module;

}(shopifyOpenSource || {}, jQuery));
