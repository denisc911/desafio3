const { tb_cta_hucha } = require('../models'); // Assuming you have a model for this table

// Function to list all tb_cta_hucha entries
const listarCuentasHucha = async (req, res) => {
    try {
        const cuentas = await tb_cta_hucha.findAll();
        // Add any calculations you need to perform on the data here
        res.status(200).json(cuentas);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar las cuentas de hucha' });
    }
};

// Function to modify an existing tb_cta_hucha entry
const modificarCuentaHucha = async (req, res) => {
    const { id } = req.params;
    const { saldo, descripcion } = req.body;
    try {
        const cuenta = await tb_cta_hucha.findByPk(id);
        if (!cuenta) {
            return res.status(404).json({ error: 'Cuenta de hucha no encontrada' });
        }

        cuenta.saldo = saldo !== undefined ? saldo : cuenta.saldo;
        cuenta.descripcion = descripcion !== undefined ? descripcion : cuenta.descripcion;
        
        await cuenta.save();
        res.status(200).json(cuenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar la cuenta de hucha' });
    }
};

// Function to delete an existing tb_cta_hucha entry
const eliminarCuentaHucha = async (req, res) => {
    const { id } = req.params;
    try {
        const cuenta = await tb_cta_hucha.findByPk(id);
        if (!cuenta) {
            return res.status(404).json({ error: 'Cuenta de hucha no encontrada' });
        }

        await cuenta.destroy();
        res.status(200).json({ message: 'Cuenta de hucha eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la cuenta de hucha' });
    }
};

module.exports = {
    listarCuentasHucha,
    modificarCuentaHucha,
    eliminarCuentaHucha
};
