export const logReq = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${req.requestTime || 'no-time-yet'}`)
  next()
}

export const addTime = (req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
}
