// Opt-in repos (case sensitive)
// - These are all children of Shopify and visible at https://github.com/Shopify
var optInRepos = [
  'FunctionalTableData',
  'Intro_to_GraphQL_Powered_by_Shopify',
  'active_fulfillment',
  'active_merchant',
  'active_shipping',
  'active_utils',
  'asset_cloud',
  'browser_sniffer',
  'connect-googleapps',
  'dashing',
  'draggable',
  'dukpt',
  'ejson2env',
  'embedded-app-example',
  'go-lua',
  'goluago',
  'goreferrer',
  'grizzly_ber',
  'identity_cache',
  'js-buy-sdk',
  'kubeaudit',
  'liquid',
  'magnet',
  'minesweeper',
  'money',
  'omniauth-shopify-oauth2',
  'polaris-react',
  'polaris-icons',
  'pyreferrer',
  'rails_parallel',
  'rotoscope',
  'sarama',
  'semian',
  'shipit-engine',
  'shopify-css-import',
  'shopify-fulfillment-integration',
  'shopify_api',
  'shopify_app',
  'shopify_django_app',
  'shopify_python_api',
  'shopify_theme',
  'skeleton-theme',
  'slate',
  'splunk-auth-proxy',
  'starter-theme',
  'statsd-instrument',
  'superdb',
  'sync_app_demo',
  'sysv_mq',
  'themekit',
  'theme-scripts',
  'toxiproxy',
  'toxiproxy-ruby',
  'tslint-config-shopify',
  'turbograft',
  'twine',
  'verdict',
  'voucher',
  'vouch4cluster',
  'wolverine',
  'promise-kotlin',
  'promise-swift',
  'android-testify',
  'kubernetes-deploy'
];

// Add custom repos by full_name. Take the org/user and repo name
// - e.g. batmanjs/batman from https://github.com/batmanjs/batman
var customRepos = [];

// Custom repo language, different than that defined by GitHub
var customRepoLanguage = {
  liquid: 'Liquid',
  'starter-theme': 'Liquid',
  'skeleton-theme': 'Liquid',
  dashing: 'Ruby',
  shopify_theme: 'Ruby',
  'Shopify-Developer-Book': 'Ruby',
  'offsite-gateway-sim': 'Ruby',
  'shopify.github.com': 'JavaScript',
  rotoscope: 'C'
};

// Custom repo avatars. Dimensions should be 40x40
// - Be sure a custom repo doesn't have the same name as a Shopify one, or a one will be overridden
var customRepoAvatar = {
  slate: '/images/repo-avatars/slate.svg',
  draggable: '/images/repo-avatars/draggable.png',
  dashing: '/images/repo-avatars/dashing.gif',
  superdb: '/images/repo-avatars/super-debugger.gif'
};
