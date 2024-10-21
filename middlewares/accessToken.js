const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET; 

async function accessToken (req, res, next) {
  try {
    const access = req.cookies.token;
    if (!access) return res.status(400).send({ message: 'Acceso no proporcionado' });

    jwt.verify(access, jwt_secret, (err, decoded) => {
      if (err.name === 'TokenExpiredError') return res.status(401).send({ message: 'El token ha expirado, por favor inicia sesión de nuevo.' });
      if (err) return res.status(401).send({ message: 'Token inválido', access });

      req.user = decoded
      next()
    });   

  } catch (error) {
    res.status(500).send({ message: 'ERROR controler access', error })
    console.error(error)
  }
}

module.exports = { accessToken }
