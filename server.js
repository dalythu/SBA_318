// Imports
import express from 'express'
import gradesRoutes from './routes/gradesRoutes.js'
import { logReq, addTime } from './middleware/middleware.js'
import { globalErr } from './middleware/errorHandler.js'

const app = express()
const PORT = 3000

// Setup view engine and static files
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Middleware
app.use(express.json())
app.use(logReq)
app.use(addTime)

// Views
app.get('/', (req, res) => {
  res.render('index')
})

// Routes
app.use('/api/grades', gradesRoutes)

// Error handling
app.use(globalErr)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
