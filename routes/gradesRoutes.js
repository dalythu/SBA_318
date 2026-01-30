import express from 'express'
import grades from '../db/grades.js'

const router = express.Router()

// GET all grades
router.get('/', (req, res) => {
  const { student } = req.query

  if (!student) {
    return res.json(grades)
  }

  const filtered = grades.filter((g) =>
    g.student.toLowerCase().includes(student.toLowerCase()),
  )

  res.json(filtered)
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

router.post('/', (req, res) => {
  const { student, assignment, score } = req.body

  if (!student || !assignment || score === undefined) {
    return res.status(400).json({
      error: 'student, assignment, and score are required',
    })
  }

  const newGrade = {
    id: grades.length ? grades[grades.length - 1].id + 1 : 1,
    student,
    assignment,
    score: Number(score),
  }

  grades.push(newGrade)

  // send them back to homepage so they can SEE the new grade
  res.redirect('/')
})
export default router
