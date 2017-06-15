const express = require('express')

// Make a new Express Router
const router = express.Router()

// Data
let linkNextID = 4
let links = [
    {
        id: '1',
        title: 'ProgrammableWeb API Directory',
        url: 'https://www.programmableweb.com/apis/directory',
        tags: ['api']
    },
    {
        id: '2',
        title: 'Presentational and Container Components',
        url: 'https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0',
        tags: ['react', 'component']
    },
    {
        id: '3',
        title: 'Traversing Twists and Turns',
        url: 'https://medium.com/@vicalfieri/traversing-twists-and-turns-c298d9d4636',
        tags: ['vic', 'blog']
    }
]

// Read: when GET /links is received
router.get('/links', (req, res) => {
    const searchTitle = (req.query.title || '').toLowerCase()

    // Start with all links
    let foundLinks = links
    // If search for title
    if (searchTitle) {
        // Filter down where title includes the queried title
        foundLinks = foundLinks.filter((link) => {
            return link.title.toLowerCase().includes(searchTitle)
        })
    }
    
    // Send back JSON in the response
    res.json({
        items: foundLinks
    })
})

// Read single: when GET /links/2 is received
router.get('/links/:id', (req, res) => {
    const id = req.params.id
    const link = links.find((link) => link.id == id)
    // If not found
    if (!link) {
        res.status(404).json({ error: 'Link not found' })
        return
    }

    // Send back JSON in the response
    res.json(link)
})

// Create: when POST /links is received
router.post('/links', (req, res) => {
    let newLink = req.body
    // Check if request has valid data
    if (!newLink) {
        res.status(400).json({ error: 'Please provide a link' })
        return
    }

    // Copy and assign id (converted to string)
    newLink = Object.assign({}, newLink, { id: `${linkNextID}` })
    // Increment next id
    linkNextID += 1
    // Add to our in-memory database
    links.push(newLink)
    // Send back JSON in the response
    res.status(201).json(newLink)
})

// Update single: when PUT /links/2
router.put('/links/:id', (req, res) => {
    // :id in URL
    const id = req.params.id
    // JSON data
    const updatedPost = req.body
    // Find link in database
    const link = links.find((link) => link.id == id)

    // Error if not found
    if (!link) {
        res.status(404).json({ error: 'Link not found' })
        return
    }

    // Update correct properties of link
    link.title = updatedPost.title
    link.url = updatedPost.url
    link.tags = updatedPost.tags

    // Send back JSON in the response
    res.json(link)
})

// Delete single: when PUT /links/2
router.delete('/links/:id', (req, res) => {
    // :id in URL
    const id = req.params.id

    // Keep everything except the item with :id
    const newLinks = links.filter((link) => link.id != id)

    // Error if not found
    if (links.length === newLinks.length) {
        res.status(404).json({ error: 'Link not found' })
        return
    }

    // Replace database collection
    links = newLinks

    // Send back JSON in the response
    res.status(204).json({})
})

module.exports = router
// Same as: export default router