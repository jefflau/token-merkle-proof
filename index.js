const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

const file = require('./data/ens-erc721-token-holders-220128.json')

//console.log(file)
const leaves = file.map((x) => {
  return SHA256(JSON.stringify(x).replace(/\s/g, ''))
})
const tree = new MerkleTree(leaves, SHA256)
const root = tree.getRoot().toString('hex')
const leaf = SHA256(
  '{"address":"0xaf31ebcb4a20545f848036e0d718d611f7890eec","total":"1"}'.replace(
    /\s/g,
    ''
  )
)
const proof = tree.getProof(leaf)
console.log(tree.verify(proof, leaf, root)) // true

const badLeaves = ['a', 'x', 'c'].map((x) => SHA256(x))
const badTree = new MerkleTree(badLeaves, SHA256)
const badLeaf = SHA256('x')
const badProof = tree.getProof(badLeaf)
console.log(tree.verify(badProof, leaf, root)) // false
