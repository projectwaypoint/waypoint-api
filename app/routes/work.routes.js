module.exports = (app) => {
    const works = require('../controllers/work.controller.js');

    // Create a new Work
    app.post('/works', works.create);

    // Retrieve all Works
    app.get('/works', works.findAll);

    // Retrieve a single Work with workId
    app.get('/works/:workId', works.findOne);

    // Update a Work with workId
    app.put('/works/:workId', works.update);

    // Delete a Work with workId
    app.delete('/works/:workId', works.delete);
}