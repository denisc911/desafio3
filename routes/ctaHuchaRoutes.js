const { tb_cta_hucha } = require('../models');

// Function to list a tb_cta_hucha entry by id
const listarCuentaHuchaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cuenta = await tb_cta_hucha.findByPk(id);
        if (!cuenta) {
            return res.status(404).json({ error: 'Cuenta de hucha no encontrada' });
        }
        res.status(200).json(cuenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar la cuenta de hucha' });
    }
};

// Function to list all tb_cta_hucha entries
const listarTodasLasCuentasHucha = async (req, res) => {
    try {
        const cuentas = await tb_cta_hucha.findAll();
        res.status(200).json(cuentas);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar todas las cuentas de hucha' });
    }
};

module.exports = {
    listarCuentaHuchaPorId,
    listarTodasLasCuentasHucha
};
