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
      $noApiBuffer: true,
      $ignoreForks: true,
      $externalAppUrl: 'http://www.carsonshold.com/shopify-os',

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
            perPage = 100;

        if (this.$preventApiCalls) return false;

        var uri = 'https://api.github.com/orgs/Shopify/members?callback=foo'
                + '&per_page='+perPage
                + '&page='+page;

        if (this.$noApiBuffer) {
          // Overwrite URI with different callback
          uri = 'https://api.github.com/orgs/Shopify/members?callback=?'
              + '&per_page='+perPage
              + '&page='+page;
          $.getJSON(uri, function(result) {
            // Add api data to members array
            members = members.concat(result.data);

            if (result.data && result.data.length == perPage) {
              o.addMembers(members, page+1);
            } else {
              if (result.meta.status == 403) {
                o.$repoContainer.addClass('is-loaded').append('<div class="limit-error">API Limit Reached from this IP. Please try again later.</div>')
              } else {
                $("#countMembers").removeClass('is-loading').text(members.length);
              }
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
            perPage = 100;

        var uri = 'https://api.github.com/orgs/Shopify/repos?callback=foo'
                + '&per_page='+perPage
                + '&page='+page;

        if (this.$preventApiCalls) return false;

        if (this.$noApiBuffer) {
          // Overwrite URI with different callback
          uri = 'https://api.github.com/orgs/Shopify/repos?callback=?'
              + '&per_page='+perPage
              + '&page='+page;

          $.getJSON(uri, function(result) {
            // Add api data to repos array
            repos = repos.concat(result.data);

            if (result.data && result.data.length == perPage) {
              o.getRepos(repos, page+1);
            } else {
              if (result.meta.status != 403) {
                o.getCustomRepos(repos);
                $("#countRepos").removeClass('is-loading').text(repos.length);
              }
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
                $("#countRepos").removeClass('is-loading').text(repos.length);
              }
            }
          });
        }

      },

      getCustomRepos: function(repos) {
        // Fetching custom repos isn't active yet. But it's coming!

        // Add custom repos to data
        // for (var i = customRepos.length - 1; i >= 0; i--) {
        //   repos.push(customRepos[i]);
        // };

        // Let's just move on to adding the repos to the page.
        this.addRepos(repos);
      },

      addRepos: function(repos) {
        var o = this,
            repoCount = repos.length;

        var items = [],
            item = {},
            data = {}
            source   = $('#repoTemplate').html(),
            template = Handlebars.compile(source);

        $.each(repos, function (i, repo) {

          // Ignore forked repos
          if (o.$ignoreForks && repo.fork) {
            repoCount = repoCount - 1;
            return;
          }

          // Ignore manually defined repos
          if ( repo.name in ignoreRepos ) {
            repoCount = repoCount - 1;
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
            homepage: repo.homepage,
            featured: repo.name in featuredRepos ? true : false // unused right now
          };

          items.push(item);
        });

        items.sort(function(a,b) {
          if (a.stars < b.stars) return 1;
          if (b.stars < a.stars) return -1;
          return 0;
        });

        data = { items: items };

        // Append handlebars templates
        o.$repoContainer.addClass('is-loaded').append(template(data));

        // Display public repo count (minus forks)
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
      		// 	case 'Download':
      		// 		var version = $(this).data('version');
	      	// 		_gaq.push(['_trackEvent', 'Open Source', 'Download', 'Version: ' + version]);
      		// 		break;
      		// 	case 'Demo':
      		// 		_gaq.push(['_trackEvent', 'Open Source', 'Click', 'Demo Store']);
      		// 		break;
      		// 	case 'Demo Empty':
      		// 		_gaq.push(['_trackEvent', 'Open Source', 'Click', 'Demo Store Empty']);
      		// 		break;
      		// }
      	});
      }

    };
    $.extend(app, timber);


  }( window.SHOPIFYTIMBER = window.SHOPIFYTIMBER || {} ));

  SHOPIFYTIMBER.init();
});