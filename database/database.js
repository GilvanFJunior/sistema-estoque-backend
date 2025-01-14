import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// cria conexao com o banco de dados
export const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'banco',
});
