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

        if (customRepos.length > 0) {
          this.getCustomRepos();
        } else {
          this.addRepos(repos);
        }

        $('a[href="#"]').on('click',function(e){e.preventDefault()});

      },

      getCustomRepos: function() {
        var o = this,
            remaining = customRepos.length,
            rendered = false;

        if (remaining === 0) {
          o.addRepos(repos);
          return;
        }

        var renderOnce = function() {
          if (!rendered) {
            rendered = true;
            o.addRepos(repos);
          }
        };

        // Safety net: never leave the page spinning, even if a request hangs
        var fallbackTimer = setTimeout(renderOnce, 5000);

        $.each(customRepos, function(i, repo) {
          // CORS request (GitHub API supports it); JSONP is unreliable —
          // rate-limited 403 responses are not callback-wrapped, which used
          // to leave the page spinning forever.
          $.getJSON('https://api.github.com/repos/' + repo)
            .done(function(result) {
              // Add api data to repos array
              repos = repos.concat(result);
            })
            .always(function() {
              // Count failures too (rate limit, 404, network) so we always render
              remaining--;
              if (remaining === 0) {
                clearTimeout(fallbackTimer);
                renderOnce();
              }
            });
        });

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

          // Ignore forked repos, unless explicitly allowed
          if (o.$ignoreForks && repo.fork && allowedForks.indexOf(repo.full_name) === -1) {
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

        o.$repoContainer.isotope({
          layoutMode: 'vertical'
        });

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
