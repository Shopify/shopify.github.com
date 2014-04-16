// Global variables that hold custom attributes for repos, keyed by repo name

// Custom repo language, different than that defined by GitHub
var customRepoLanguage = {
  'liquid': 'Liquid',
  'Timber': 'Liquid',
  'skeleton-theme': 'Liquid',
  'dashing': 'Ruby',
  'shopify_theme': 'Ruby',
  'Shopify-Developer-Book': 'Ruby',
  'offsite-gateway-sim': 'Ruby',
  'shopify.github.com': 'JavaScript'
}

// Custom repo avatars. Dimensions should be 40x40
var customRepoAvatar = {
  'Timber': '/images/repo-avatars/timber.gif',
  'dashing': '/images/repo-avatars/dashing.gif',
  'superdb': '/images/repo-avatars/super-debugger.gif'
}

// Opt-in repos (case sensitive)
var optInRepos = [
  'dashing',
  'active_merchant',
  'liquid',
  'superdb',
  'active_shipping',
  'shopify_app',
  'identity_cache',
  'skeleton_theme',
  'statsd-instrument',
  'shopify_theme',
  'shopify_api',
  'sarama',
  'Timber',
  'active_fulfillment',
  'vision',
  'shopify_python_api',
  'wolverine',
  'verdict',
  'shopify_php_api',
  'shopify_django_app',
  'browser_sniffer',
  'importer',
  'active_utils',
  'embedded-app-example',
  'connect-googleapps',
  'omniauth-shopify-oauth2',
  'shipping-fulfillment-app',
  'sysv_mq',
  'money',
  'sync_app_demo',
  'rails_parallel',
  'shopify.github.com',
  'dukpt',
  'splunk-auth-proxy',
  'magnet',
  'googleTrustedShopifyStores'
]

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
