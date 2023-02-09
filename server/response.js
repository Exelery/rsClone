export const status = (stat, values, res) => {
  const data = {
    'status': stat,
    'value': values
  }
  
  res.status(data.status)
  res.json(data)
  res.end()
}