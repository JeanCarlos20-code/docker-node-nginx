import mysql from 'mysql';
import { config } from './config.js';

const connection = mysql.createConnection(config)

function CreateTable() {
    const sql = `CREATE TABLE IF NOT EXISTS people(
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        PRIMARY KEY(id)
    )`;
    connection.query(sql)
}

function InsertSql() {
    // const deleteSql = `DELETE FROM people WHERE name = 'jean'`
    // connection.query(deleteSql)

    const insertSql = `INSERT INTO people(name) VALUES ('jean')`
    connection.query(insertSql)
}

function CreateSql() {
    CreateTable()
    InsertSql()
}

function SelectSql(app) {
    const sql = 'SELECT * FROM people';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        const people = JSON.stringify(result)
            .replace(/[\[\]{}]/g, '')  // Remove conchete e chaves
            .replace(/"/g, '')         // Remove aspas duplas
            .replace(/,/g, ', ')       // adiciona um espaço depois da vírgula
            .replace(/:/g, ': ')       // adciona um espaço depois dos dois pontos
            .replace(/id/g, '<br>id');   // adiciona uma barra a cada id



        app.get('/', (req, res) => {
            res.send(`
                <h1>Full Cycle Rocks!</h1>
                <h1>${people}</h1>
            `);
        });
    });
}

function CloseConnection() {
    connection.end()
}

export { CreateSql, CloseConnection, SelectSql }
