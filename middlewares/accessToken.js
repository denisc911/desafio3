async function accessToken (req, res, next) {
  try {
    const access = req.cookies.data;
    if (!access) return res.status(400).send({ message: 'Acceso no proporcionado' });

    jwt.verify(access, jwt_secret, (err, decoded) => {
      if (err) return res.status(401).send({ message: 'Token inválido' });   

      req.user = decoded
      next()
    });   

  } catch (error) {
    res.status(500).send({ message: 'ERROR controler access' })
    console.error(error)
  }
}

module.exports = { accessToken }
