import config from './config.js'
import mysql from 'mysql2'



const conn=mysql.createConnection(config.db)

conn.connect()


export default conn

