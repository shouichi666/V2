// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
<<<<<<< HEAD
  res.status(200).json({ name: 'John Doe' })
=======
  res.statusCode = 200
  res.json({ name: 'John Doe' })
>>>>>>> deploy/master
}
