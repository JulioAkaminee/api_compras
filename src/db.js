const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password:"",  
    database: "lista_compras",

});

async function testarConexao() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('Conexão bem-sucedida!', rows);
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

testarConexao();

module.exports = pool;