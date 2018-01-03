module.exports = {
    'extends': 'stylelint-config-standard',
    'plugins': [
      'stylelint-scss'
    ],
    'rules': {
      'no-empty-source': null,
      'color-no-invalid-hex': true,
      'color-hex-length': 'long',
      'max-empty-lines': 2,
      'no-extra-semicolons': true,
      'indentation': [2, { 'severity': 'warning' } ]
    }
}