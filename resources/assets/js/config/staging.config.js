var config = {
  env: 'staging',
  api: {
    base_url: 'https://api.staging.alternativet.io/api',
    defaultRequest: {
      headers: {
        'X-Requested-With': 'rest.js',
        'Content-Type': 'application/json'
      }
    }
  },
  social: {
    facebook: '',
    twitter: '',
    github: ''
  },
  debug: true
}
module.exports = config
