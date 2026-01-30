import express from 'express'
import assignments from '../db/assignments.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json(assignments)
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const assignment = assignments.find((a) => a.id === id)

  if (!assignment) {
    return res.status(404).json({ error: 'Assignment not found' })
  }

  res.json(assignment)
})

export default router
