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

router.post('/', (req, res, next) => {
  try {
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
    const accept = req.headers.accept || ''
    if (accept.includes('text/html')) {
      return res.redirect('/')
    }
    res.status(201).json(newGrade)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const grade = grades.find((g) => g.id === id)

  if (!grade) return res.status(404).json({ error: 'Grade not found' })

  const { student, assignment, score } = req.body

  if (student !== undefined) grade.student = student
  if (assignment !== undefined) grade.assignment = assignment
  if (score !== undefined) grade.score = Number(score)

  res.json(grade)
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = grades.findIndex((g) => g.id === id)

  if (index === -1) return res.status(404).json({ error: 'Grade not found' })

  const deleted = grades.splice(index, 1)[0]
  res.json(deleted)
})
export default router
