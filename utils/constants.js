const COOKIE_OPTIONS = {
  httpOnly: true, // Solo accesible a través del servidor
  secure: process.env.NODE_ENV === 'production', // Cookies seguras solo en producción
  maxAge: 24 * 60 * 60 * 1000 // Duración de un día
};