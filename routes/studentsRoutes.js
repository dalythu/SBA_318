import express from 'express'
import students from '../db/students.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json(students)
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const student = students.find((s) => s.id === id)

  if (!student) {
    return res.status(404).json({ error: 'Student not found' })
  }

  res.json(student)
})

export default router
