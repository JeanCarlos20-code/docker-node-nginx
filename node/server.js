import express from 'express';
import { CreateSql, SelectSql, CloseConnection } from './sql.js';

const app = express();
const port = 3000;

CreateSql();
SelectSql(app);

app.listen(port, () => {
    console.log(`Rodando no http://localhost:${port}`);
});

process.on('CLOSE', () => {
    CloseConnection();
    process.exit();
});
