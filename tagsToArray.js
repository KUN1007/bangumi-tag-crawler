const fs = require('fs')

const data = JSON.parse(fs.readFileSync('tags.json', 'utf8'))

const tagArray = data.map((item) => item.tag)

fs.writeFileSync('tagsOnly.json', JSON.stringify(tagArray, null, 2))
console.log('Tags array has been saved to tagsOnly.json')
