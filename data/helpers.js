export const serverError = (res, err) => {
  console.log(err)
  res.status(500).json({
    errorMessage: err
  })
}