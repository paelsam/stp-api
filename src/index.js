import express from 'express';
import cors from 'cors';

import { database } from './database/database.js';
import clientes from './routes/cliente.routes.js';
import servicios from './routes/servicio.routes.js';
import empleados from './routes/empleado.routes.js';
import turnos from './routes/turno.routes.js';

const app = express(); // Creando la aplicación
const port = process.env.PORT || 8080; // Puerto de la app

(async () => {
    try {
        await database.sync({ force: true });
        console.log("Conectado a la base de datos");
    } catch (error) {
        throw new Error(error);
    }
})()

// Middlewares
app.use(express.json()); // Recibir información en JSON
app.use(cors()); // Habilitar otras aplicaciones para realizar solicitudes al server

app.use('/clientes', clientes);
app.use('/servicios', servicios);
app.use('/empleados', empleados);
app.use('/turnos', turnos);

app.listen(port, () => {
    console.log('Servidor ejecutándose en el puerto', port);
});