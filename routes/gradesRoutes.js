import express from 'express'
import grades from '../db/grades.js'

const router = express.Router()

// GET all grades
router.get('/', (req, res) => {
  res.json(grades)
})
// GET one grade by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const grade = grades.find((g) => g.id === id)

  if (!grade) {
    return res.status(404).json({ error: 'Grade not found' })
  }

  res.json(grade)
})
export default router
