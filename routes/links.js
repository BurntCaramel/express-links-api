const express = require('express')

// Make a new Express Router
const router = express.Router()

// Data
let links = [
    {
        title: 'ProgrammableWeb API Directory',
        url: 'https://www.programmableweb.com/apis/directory',
        tags: ['api']
    },
    {
        title: 'Presentational and Container Components',
        url: 'https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0',
        tags: ['react', 'component']
    },
    {
        title: 'Traversing Twists and Turns',
        url: 'https://medium.com/@vicalfieri/traversing-twists-and-turns-c298d9d4636',
        tags: ['vic', 'blog']
    }
]

// Read: when GET /links is received
router.get('/links', (req, res) => {
    // Send back JSON in the response
    res.json({
        items: links
    })
})

// Create: when POST /links is received
router.post('/links', (req, res) => {
    const newLink = req.body
    // Check if request has valid data
    if (!newLink) {
        res.status(400).json({ error: 'Please provide a link' })
        return
    }

    // Add to our in-memory database
    links.push(newLink)
    // Send back JSON in the response
    res.status(201).json(newLink)
})

module.exports = router
// Same as: export default router