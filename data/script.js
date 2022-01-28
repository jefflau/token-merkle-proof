const fs = require('fs')

const file = fs.readFileSync('./ens-erc721-token-holders-220128.json', {
  encoding: 'utf8',
})

const regex = /},,,/g

fs.writeFileSync(
  'ens-erc721-token-holders-220128.json',
  file.replace(regex, '},')
)
