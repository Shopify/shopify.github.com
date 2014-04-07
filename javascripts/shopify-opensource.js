window.SHOPIFYTIMBER = window.SHOPIFYTIMBER || {};

jQuery(function($){

  // requires jQuery 1.8
  (function ( app, undefined ) {

    var timber = {

      browserProperties: {
        touch: Modernizr.touch
      },

      init : function() {

        this.$body = $('body');
        this.$repoContainer = $('#repos');

        this.addMembers();
        this.getRepos();
        this.tracking();

        $('a[href="#"]').on('click',function(e){e.preventDefault()});

      },

      addMembers: function(members, page) {
        var o = this,
            members = members || [],
            page = page || 1;

        return;

        var uri = 'https://api.github.com/orgs/Shopify/members?callback=?'
                + '&per_page=100'
                + '&page='+page;

        $.getJSON(uri, function(result) {
          if (result.data && result.data.length > 0) {
            members = members.concat(result.data);
            o.addMembers(members, page+1);
          } else {
            $("#countMembers").text(members.length);
          }
        });
      },

      getRepos: function(repos, page) {
        var o = this,
            repos = repos || [],
            page = page || 1;

        var uri = 'https://api.github.com/orgs/Shopify/repos?callback=?'
                + '&per_page=100'
                + '&page='+page;

        $.getJSON(uri, function(result) {
          if (result.data && result.data.length > 0) {
            repos = repos.concat(result.data);
            o.getRepos(repos, page+1);
          } else {
            if (result.meta.status == 403) {
              o.$repoContainer.append('<div class="limit-error">API Limit Reached from this IP. Please try again later.</div>')
            } else {
              o.addRepos(repos);
            }
          }
        });

      },

      addRepos: function(repos) {
        var o = this;

        $('#countRepos').text(repos.length);

        // Sort by highest # of watchers.
        repos.sort(function (a, b) {
          if (a.hotness < b.hotness) return 1;
          if (b.hotness < a.hotness) return -1;
          return 0;
        });

        var items = [],
            item = {},
            data = {}
            source   = $('#repoTemplate').html(),
            template = Handlebars.compile(source);

        $.each(repos, function (i, repo) {
          item = {
            url: repo.html_url,
            name: repo.name,
            language: repo.language,
            languageClass: (repo.language || '').toLowerCase(),
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count
          };

          items.push(item);
        });

        data = {
          items: items,
          test: 'test'
        };

        o.$repoContainer.append(template(data));

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