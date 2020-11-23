var repos = [
  'FunctionalTableData',
  'Intro_to_GraphQL_Powered_by_Shopify',
  'active_fulfillment',
  'active_merchant',
  'active_shipping',
  'active_utils',
  'app_profiler',
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
  'packwerk',
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
  'kubernetes-deploy',
  'quilt',
  'graphql-tools-web'
];

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

var customRepoAvatar = {
  slate: '/images/repo-avatars/slate.svg',
  draggable: '/images/repo-avatars/draggable.png',
  dashing: '/images/repo-avatars/dashing.gif',
  superdb: '/images/repo-avatars/super-debugger.gif'
};

let repoQueries = repos.map(repo => {
  return `${repo.replace( /[.-]./g, '' )}: repository(owner:"shopify", name:"${repo}") {
    url
    name
    primaryLanguage {
      id
    }
    description
    stargazerCount
    forkCount
    homepageUrl
  }
`
})

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    'Authorization': 'bearer 8eacba627c8542c82d1f31cd32a98e918d7accec'
  },
  body: JSON.stringify({
    query: repoQueries.join('')
  }),
})
  .then(res => res.json())
  .then(res => console.log(res.data));
