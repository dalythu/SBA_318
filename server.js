// Imports
import express from 'express'

import gradesRoutes from './routes/gradesRoutes.js'
import assignmentsRoutes from './routes/assignmentsRoutes.js'
import studentsRoutes from './routes/studentsRoutes.js'
import grades from './db/grades.js'

import { logReq, addTime } from './middleware/middleware.js'
import { globalErr } from './middleware/errorHandler.js'

const app = express()
const PORT = 3000

// Views
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logReq)
app.use(addTime)

// Views
app.get('/', (req, res) => {
  res.render('index', {
    Title: 'Gradebook',
    Header: 'Gradebook',
    grades,
  })
})

// Routes
app.use('/api/grades', gradesRoutes)
app.use('/api/assignments', assignmentsRoutes)
app.use('/api/students', studentsRoutes)

// Error handling
app.use(globalErr)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
