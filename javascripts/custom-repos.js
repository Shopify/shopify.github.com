// Global variables that hold custom attributes for repos, keyed by repo name

// Custom repo language, different than that defined by GitHub
var customRepoLanguage = {
  'liquid': 'Liquid',
  'Timber': 'Liquid',
  'skeleton-theme': 'Liquid',
  'dashing': 'Ruby',
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

// Set featured repos (currently unused, sort by stars)
var featuredRepos = {
  'Timber': true,
  'liquid': true,
  'active_merchant': true
}

// Manually ignore repos
var ignoreRepos = {
  'dmca': true
}

// Add custom repos (currently unused)
// To do this properly, each repo requires a separate API request, and as
// a non-authenticated app this could potentially hit GitHub's rate too quickly.
// To enable (without API integration):
//  - Uncomment lines (approx.) 95-97 in shopify-opensource.js
//  - Must manually enter data below
var customRepos = [
  {
    'name': 'batman',
    'html_url': 'https://github.com/batmanjs/batman',
    'description': 'The best JavaScript framework for Rails developers.',
    'homepage': 'http://batmanjs.org',
    'forks_count': 170,
    'stargazers_count': 1672
  }
]
