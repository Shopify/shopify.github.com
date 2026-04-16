window.SHOPIFYTIMBER = window.SHOPIFYTIMBER || {};

jQuery(function($){

  // requires jQuery 1.8
  (function ( app, undefined ) {

    var timber = {

      browserProperties: {
        touch: 'ontouchstart' in window
      },
      $body: $('body'),
      $repoContainer: $('#repos'),
      $preventApiCalls: false,
      $ignoreForks: true,

      init : function() {

        $('html').removeClass('no-js').addClass('js');

        repos = repos ? repos : [];

        this.getShopifyRepos();

        $('a[href="#"]').on('click',function(e){e.preventDefault()});

      },

      getShopifyRepos: function(page) {
        var o = this;
        page = page || 1;

        var uri = 'https://api.github.com/orgs/Shopify/repos?callback=?'
                + '&type=public&per_page=100&page=' + page;

        $.getJSON(uri, function(result) {
          if (result.meta.status == 403) {
            o.getCustomRepos();
            return;
          }

          repos = repos.concat(result.data);

          if (result.data && result.data.length == 100) {
            o.getShopifyRepos(page + 1);
          } else {
            o.getCustomRepos();
          }
        });
      },

      getCustomRepos: function() {
        var o = this,
            customApiCalls = 0;

        if (customRepos.length == 0) {
          o.addRepos(repos);
          return;
        }

        for (var i = customRepos.length - 1; i >= 0; i--) {
          repo = customRepos[i];

          var uri = 'https://api.github.com/repos/'+ repo +'?callback=?';

          $.getJSON(uri, function(result) {
            if (result.meta.status == 403) {
              // If we hit the limit, just pass on the current repos we have
              o.addRepos(repos);
              return;
            }

            // Add api data to repos array
            repos = repos.concat(result.data);

            customApiCalls++;
            if (customApiCalls == customRepos.length) {
              // If the custom repo ajax calls are done, move one
              o.addRepos(repos);
            }
          });
        };

      },

      addRepos: function(repos) {
        var o = this,
            repoCount = 0;

        var items = [],
            item = {},
            data = {}
            source   = $('#repoTemplate').html(),
            template = Handlebars.compile(source);

        $.each(repos, function (i, repo) {

          // Ignore forked repos
          if (o.$ignoreForks && repo.fork) {
            return;
          }

          // Opt-in repos (name) and custom repos (full_name) only
          if ( optInRepos.indexOf(repo.name) > -1 || customRepos.indexOf(repo.full_name) > -1) {
            repoCount = repoCount + 1;
          } else {
            return;
          }

          // Update repo language if manually defined
          if ( repo.name in customRepoLanguage ) {
            repo.language = customRepoLanguage[repo.name];
            repo.languageClass = (customRepoLanguage[repo.name] || '').toLowerCase();
          } else {
            repo.languageClass = (repo.language || '').toLowerCase();
          }

          // Make sure homepage URLs start with http. If not, add them
          if (repo.homepage && repo.homepage.substring(0, 4) != "http") {
            repo.homepage = 'http://' + repo.homepage;
          }

          item = {
            url: repo.html_url,
            name: repo.name,
            language: repo.language,
            languageClass: repo.languageClass,
            description: repo.description,
            stars: repo.stargazers_count ? repo.stargazers_count : 0,
            forks: repo.forks_count ? repo.forks_count : 0,
            avatar: repo.name in customRepoAvatar ? customRepoAvatar[repo.name] : null,
            homepage: repo.homepage
          };

          items.push(item);
        });

        // Sort by stars
        items.sort(function(a,b) {
          if (a.stars < b.stars) return 1;
          if (b.stars < a.stars) return -1;
          return 0;
        });

        // Create handlebars.js data
        data = { items: items };

        // Append handlebars templates
        o.$repoContainer.addClass('is-loaded').append(template(data));

        // Setup isotope
        o.flowyGrid();
      },

      flowyGrid: function() {
        var o = this;

        // bind filter button click
        var filterButtons = $('.filter-bar--right button');
        filterButtons.on( 'click', function() {
          filterButtons.removeClass('is-active');
          $(this).addClass('is-active');

          var filterValue = $(this).attr('data-filter');
          o.$repoContainer.isotope({ filter: filterValue });
        });
      }

    };
    $.extend(app, timber);

  }( window.SHOPIFYTIMBER = window.SHOPIFYTIMBER || {} ));

  SHOPIFYTIMBER.init();
});
