const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

async function fetchTags() {
  const baseUrl = 'https://bangumi.tv/game/tag'
  let currentPage = 1
  let allTags = []

  while (currentPage < 152) {
    console.log(`Fetching page ${currentPage}...`)
    const url = `${baseUrl}?page=${currentPage}`
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    })
    const $ = cheerio.load(data)

    $('#tagList a').each((i, element) => {
      const tagName = $(element).text().trim()
      const count = $(element)
        .next('small')
        .text()
        .replace(/[\(\)]/g, '')
        .trim()
      allTags.push({ tag: tagName, count: parseInt(count, 10) })
    })

    if ($('#tagList a').length > 0) {
      currentPage++
    }
  }

  fs.writeFileSync('tags.json', JSON.stringify(allTags, null, 2))
  console.log('Tags have been successfully saved to tags.json')
}

fetchTags()
