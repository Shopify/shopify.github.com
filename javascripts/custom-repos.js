// Global variables that hold custom attributes for repos, keyed by repo name

// Custom repo language, different than that defined by GitHub
var customRepoLanguage = {
  'liquid': 'Liquid',
  'Timber': 'Liquid',
  'skeleton-theme': 'Liquid',
  'shopify_theme': 'Ruby',
  'Shopify-Developer-Book': 'Ruby',
  'offsite-gateway-sim': 'Ruby'
}

// Custom repo avatars. Dimensions should be 40x40
var customRepoAvatar = {
  'Timber': '/images/repo-avatars/timber.gif',
  'dashing': '/images/repo-avatars/dashing.gif',
  'superdb': '/images/repo-avatars/super-debugger.gif'
}

// Set featured repos (currently unused)
var featuredRepos = {
  'Timber': true,
  'liquid': true,
  'active_merchant': true
}

// Manually ignore repos
var ignoreRepos = {

}

// Add custom repos. Each requires a separate API request, so use sparingly.
var customRepos = [
  {
    'name': 'batman',
    'html_url': 'https://github.com/batmanjs/batman',
    'description': 'The best JavaScript framework for Rails developers.',
    'homepage': 'http://batmanjs.org'
  },
  {
    'name': 'twitter bootstrap',
    'html_url': 'https://github.com/twbs/bootstrap',
    'description': 'A bootstrapped thing by Twitter',
    'homepage': 'http://getbootstrap.come'
  },
  {
    'name': 'javascript facebook photo selector',
    'html_url': 'https://github.com/cshold/jQuery-Facebook-Photo-Selector',
    'description': 'get your facebook photos'
  }
]