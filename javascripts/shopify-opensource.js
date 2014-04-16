window.SHOPIFYTIMBER = window.SHOPIFYTIMBER || {};

jQuery(function($){

  // requires jQuery 1.8
  (function ( app, undefined ) {

    var timber = {

      browserProperties: {
        touch: Modernizr.touch
      },
      $body: $('body'),
      $repoContainer: $('#repos'),
      $preventApiCalls: false,
      $ignoreForks: true,
      $useExternalApi: false,
      $externalAppUrl: 'http://shopify-opensourceify.herokuapp.com',

      init : function() {

        this.getRepos();
        this.addMembers();
        this.tracking();

        $('a[href="#"]').on('click',function(e){e.preventDefault()});

      },

      addMembers: function(members, page) {
        var o = this,
            members = members || [],
            page = page || 1,
            perPage = 100,
            callback = this.$useExternalApi ? 'foo' : '?';

        if (this.$preventApiCalls) return false;

        var uri = 'https://api.github.com/orgs/Shopify/members?callback='+callback
                + '&per_page='+perPage
                + '&page='+page;

        // First use the local IP for the API call. If the rate limit is hit, use our opensourcify app
        if (!this.$useExternalApi) {
          $.getJSON(uri, function(result) {
            // Set $useExternalApi to true and rerun this function if we are at rate limit for IP
            if (result.meta.status == 403) {
              // At API rate limit! Rerun this method with o.$useExternalApi=true
              o.$useExternalApi = true;
              o.addMembers();
              return;
            }

            // Add new members to local object
            members = members.concat(result.data);

            if (result.data && result.data.length == perPage) {
              // Pagination wall. Do another call on the next page
              o.addMembers(members, page+1);
            } else {
              $("#countMembers").removeClass('is-loading').text(members.length);
            }
          });
        } else {
          $.ajax({
            url: o.$externalAppUrl,
            type: 'GET',
            data: {url: uri},
          })
          .success(function(result) {
            // We get a semi-broken response (no idea why). Fix it up then parse it here.
            result = o.fixJson(result);

            // Add api data to members array
            members = members.concat(result.data);

            if (result.data && result.data.length == perPage) {
              // Pagination wall. Do another call on the next page
              o.addMembers(members, page+1);
            } else {
              $("#countMembers").removeClass('is-loading').text(members.length);
            }
          });
        }
      },

      getRepos: function(repos, page) {
        var o = this,
            repos = repos || [],
            page = page || 1,
            perPage = 100,
            callback = this.$useExternalApi ? 'foo' : '?';

        var uri = 'https://api.github.com/orgs/Shopify/repos?callback='+callback
                + '&per_page='+perPage
                + '&page='+page;

        if (this.$preventApiCalls) return false;

        // First use the local IP for the API call. If the rate limit is hit, use our opensourcify app
        if (!this.$useExternalApi) {
          $.getJSON(uri, function(result) {
            // Set $useExternalApi to true and rerun this function if we are at rate limit for IP
            if (result.meta.status == 403) {
              o.$useExternalApi = true;
              o.getRepos();
              return;
            }

            // Add api data to repos object
            repos = repos.concat(result.data);

            if (result.data && result.data.length == perPage) {
              // Pagination wall. Do another call on the next page
              o.getRepos(repos, page+1);
            } else {
              // We have all of Shopify's repos, now get the custom ones
              o.getCustomRepos(repos);
            }
          });
        } else {
          $.ajax({
            url: o.$externalAppUrl,
            type: 'GET',
            data: {url: uri},
          })
          .success(function(result) {
            // We get a semi-broken response (no idea why). Fix it up then parse it here.
            result = o.fixJson(result);

            // Add api data to repos array
            repos = repos.concat(result.data);

            if (result.data && result.data.length == perPage) {
              o.getRepos(repos, page+1);
            } else {
              if (result.meta.status == 403) {
                o.$repoContainer.addClass('is-loaded').append('<div class="limit-error">API Limit Reached from this IP. Please try again later.</div>')
              } else {
                // We have all of Shopify's repos, now get the custom ones
                o.getCustomRepos(repos);
              }
            }
          });
        }

      },

      getCustomRepos: function(repos) {
        var o = this,
            repos = repos || [],
            customApiCalls = 0,
            callback = this.$useExternalApi ? 'foo' : '?';

        for (var i = customRepos.length - 1; i >= 0; i--) {
          repo = customRepos[i];

          if (!this.$useExternalApi) {

            var uri = 'https://api.github.com/repos/'+ repo +'?callback='+callback;

            $.getJSON(uri, function(result) {
              // Set $useExternalApi to true and rerun this function if we are at rate limit for IP
              if (result.meta.status == 403) {
                // At API rate limit! Rerun this method with o.$useExternalApi=true
                o.$useExternalApi = true;
                o.getCustom(repos);
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
          } else {

            var uri = 'https://api.github.com/repos/'+ repo +'?callback='+callback;

            $.ajax({
              url: o.$externalAppUrl,
              type: 'GET',
              data: {url: uri},
            })
            .success(function(result) {
              // We get a semi-broken response (no idea why). Fix it up then parse it here.
              result = o.fixJson(result);

              // Add api data to repos array
              repos = repos.concat(result.data);

              customApiCalls++;
              if (customApiCalls == customRepos.length) {
                // If the custom repo ajax calls are done, move one
                o.addRepos(repos);
              }
            });
          }
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

        // Display public repo count of opt-in repos (minus forks)
        $('#countRepos').removeClass('is-loading').text(repoCount);

        // Setup isotope
        o.flowyGrid();
      },

      flowyGrid: function() {
        var o = this;

        this.$repoContainer.isotope({
          itemSelector: '.repo'
        });

        // bind filter button click
        var filterButtons = $('#filters button');
        filterButtons.on( 'click', function() {
          filterButtons.removeClass('is-active');
          $(this).addClass('is-active');

          var filterValue = $(this).attr('data-filter');
          o.$repoContainer.isotope({ filter: filterValue });
        });
      },

      fixJson: function(data) {
        data = data.replace('/**/foo(','');
        if (data.substring(data.length-1) == ")") {
          data = data.substring(0, data.length-1);
        }
        return JSON.parse(data);
      },

      tracking: function() {
        $('a[data-track]').on('click', function(e) {
          var data = $(this).data('track');
          // switch(data) {
          //  case 'Download':
          //    var version = $(this).data('version');
          //    _gaq.push(['_trackEvent', 'Open Source', 'Download', 'Version: ' + version]);
          //    break;
          //  case 'Demo':
          //    _gaq.push(['_trackEvent', 'Open Source', 'Click', 'Demo Store']);
          //    break;
          //  case 'Demo Empty':
          //    _gaq.push(['_trackEvent', 'Open Source', 'Click', 'Demo Store Empty']);
          //    break;
          // }
        });
      }

    };
    $.extend(app, timber);


  }( window.SHOPIFYTIMBER = window.SHOPIFYTIMBER || {} ));

  SHOPIFYTIMBER.init();
});