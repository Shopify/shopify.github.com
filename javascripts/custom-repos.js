// Opt-in repos (case sensitive)
// - These are all children of Shopify and visible at https://github.com/Shopify
var optInRepos = [
  'Intro_to_GraphQL_Powered_by_Shopify',
  'js-buy-sdk',
  'dashing',
  'draggable',
  'active_merchant',
  'liquid',
  'superdb',
  'active_shipping',
  'shopify_app',
  'identity_cache',
  'statsd-instrument',
  'shopify_theme',
  'shopify_api',
  'sarama',
  'slate',
  'shopify-css-import',
  'active_fulfillment',
  'shopify_python_api',
  'wolverine',
  'verdict',
  'shopify_django_app',
  'browser_sniffer',
  'active_utils',
  'embedded-app-example',
  'connect-googleapps',
  'omniauth-shopify-oauth2',
  'shopify-fulfillment-integration',
  'sysv_mq',
  'money',
  'sync_app_demo',
  'rails_parallel',
  'dukpt',
  'splunk-auth-proxy',
  'magnet',
  'goreferrer',
  'asset_cloud',
  'minesweeper',
  'toxiproxy',
  'toxiproxy-ruby',
  'grizzly_ber',
  'semian',
  'go-lua',
  'goluago',
  'shipit-engine',
  'pyreferrer',
  'themekit',
  'turbograft',
  'twine',
  'tslint-config-shopify',
  'rotoscope',
  'polaris',
  'kubeaudit',
  'FunctionalTableData',
]

// Add custom repos by full_name. Take the org/user and repo name
// - e.g. batmanjs/batman from https://github.com/batmanjs/batman
var customRepos = [
]

// Custom repo language, different than that defined by GitHub
var customRepoLanguage = {
  'liquid': 'Liquid',
  'slate': 'Liquid',
  'dashing': 'Ruby',
  'shopify_theme': 'Ruby',
  'Shopify-Developer-Book': 'Ruby',
  'offsite-gateway-sim': 'Ruby',
  'shopify.github.com': 'JavaScript',
  'rotoscope': 'C',
}

// Custom repo avatars. Dimensions should be 40x40
// - Be sure a custom repo doesn't have the same name as a Shopify one, or a one will be overridden
var customRepoAvatar = {
  'slate': '/images/repo-avatars/slate.gif',
  'draggable': '/images/repo-avatars/draggable.png',
  'dashing': '/images/repo-avatars/dashing.gif',
  'superdb': '/images/repo-avatars/super-debugger.gif',
}
