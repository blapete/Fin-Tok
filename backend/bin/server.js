const app = require('../app')
const db = require('../database/models')
const port = process.env.PORT || 8080

db.sequelize.sync().then(function () {
	app.listen(port, () => console.log(`listening on port ${port}`))
})
