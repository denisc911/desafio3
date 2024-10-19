const bcrypt = require('bcryptjs');

// La contraseña en texto plano que deseas encriptar
const contraseña = 'Admin123';

// Generar un salt para la encriptación
const salt = bcrypt.genSaltSync(10);

// Encriptar la contraseña
const contraseñaEncriptada = bcrypt.hashSync(contraseña, salt);

// Imprimir la contraseña encriptada
console.log('Contraseña encriptada:', contraseñaEncriptada);
