// Imports
import express from 'express'
import gradesRoutes from './routes/gradesRoutes.js'

// Setups
const app = express()
const PORT = 3000

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use('/api/grades', gradesRoutes)

// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
