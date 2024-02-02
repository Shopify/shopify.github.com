// Opt-in repos (case sensitive)
// - These are all children of Shopify and visible at https://github.com/Shopify
var optInRepos = [
  'FunctionalTableData',
  'active_fulfillment',
  'active_merchant',
  'active_utils',
  'app_profiler',
  'asset_cloud',
  'better-html',
  'browser_sniffer',
  'dukpt',
  'ejson',
  'ejson2env',
  'embedded-app-example',
  'flash-list',
  'go-lua',
  'goluago',
  'goreferrer',
  'grizzly_ber',
  'hydrogen',
  'identity_cache',
  'javy',
  'js-buy-sdk',
  'kubeaudit',
  'liquid',
  'magnet',
  'money',
  'omniauth-shopify-oauth2',
  'packwerk',
  'polaris-react',
  'polaris-icons',
  'polaris',
  'polaris-viz',
  'pyreferrer',
  'rails_parallel',
  'rbi',
  'rbi-central',
  'react-native-skia',
  'react-native-performance',
  'restyle',
  'rotoscope',
  'rubocop-sorbet',
  'ruby-lsp',
  'semian',
  'shipit-engine',
  'shopify_api',
  'shopify_app',
  'shopify_django_app',
  'shopify_python_api',
  'splunk-auth-proxy',
  'spoom',
  'statsd-instrument',
  'sync_app_demo',
  'sysv_mq',
  'tapioca',
  'toxiproxy',
  'toxiproxy-ruby',
  'turbograft',
  'voucher',
  'vscode-ruby-lsp',
  'vscode-shopify-ruby',
  'promise-kotlin',
  'krane',
  'quilt',
  'handy',
  'tracky',
  'bootsnap',
  'dawn',
  'graphql-batch',
  'shopify-ruby-api',
  'job-iteration',
  'atlas_engine',
  'product-taxonomy',
  'wasmprof',
  'cli',
  'worldwide'
];

// Add custom repos by full_name. Take the org/user and repo name
// - e.g. batmanjs/batman from https://github.com/batmanjs/batman
// Shopify originated open source projects hosted elsewhere now
var customRepos = [];

// Custom repo language, different than that defined by GitHub
var customRepoLanguage = {
  liquid: 'Liquid',
  'offsite-gateway-sim': 'Ruby',
  'shopify.github.com': 'JavaScript',
  rotoscope: 'C',
  handy: 'Unity'
};

// Custom repo avatars. Dimensions should be 40x40
// - Be sure a custom repo doesn't have the same name as a Shopify one, or a one will be overridden
var customRepoAvatar = {
  slate: '/images/repo-avatars/slate.svg',
  draggable: '/images/repo-avatars/draggable.png',
  superdb: '/images/repo-avatars/super-debugger.gif'
};
