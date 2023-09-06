import express from 'express';
import mysql from 'mysql2';

import { databaseUrl } from '../app-config';

var router = express.Router();

const connection = mysql.createConnection(databaseUrl as string);
connection.connect();

interface Category {
    id: number;
    title: string;
    applications: number[];
}

/* GET categories. */
router.get('/', function (req, res, next) {
    if (req.method === 'GET') {
        connection.query('SELECT * FROM categories', (err, rows, fields) => {
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
        });
    } else {
        res.status(500).json({ message: 'Wrong HTTP Method, use GET' });
    }
});

export { router as categoriesRouter };
