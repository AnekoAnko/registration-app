import express from 'express';
import axios from 'axios';
import pg from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false, 
    },
});

db.connect();

app.get('/', async (req, res) => {
    const page = parseInt(req.query.page, 10);
    const limit = 12;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'id';

    try {
        const response = await db.query(`SELECT * FROM events ORDER BY ${sortBy} ASC LIMIT $1 OFFSET $2`, [limit, offset]);
        const data = response.rows;
        res.json(data);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Server error");
    }
});

app.get('/total-events', async (req, res) => {
    try {
        const response = await db.query("SELECT COUNT(*) FROM events");
        const totalCount = response.rows[0].count;

        const count = parseInt(totalCount, 10);
        console.log("Total count:", count);
        res.json({ totalCount: count });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Server error");
    }
});

app.post('/register/:id', async (req, res) => {
    const { fullname, email, dob, source } = req.body;
    const id = req.params.id;

    try {
        const result = await db.query(
            "INSERT INTO registrations (event_id, full_name, email, date_of_birth, source) VALUES ($1, $2, $3, $4, $5)",
            [id, fullname, email, dob, source]
        );
        res.status(201).send("Participant registered");
    } catch (error) {
        console.error("Error inserting data", error);
        res.status(500).send("Server error");
    }
});

app.get('/views/:id', async (req, res) => {
    const id = req.params.id;
    const page = req.query.page;
    const search = req.query.search || '';
    const offset = (page - 1) * 16;
    const limit = 16;

    try {
        const response = await db.query(
            "SELECT * FROM registrations WHERE event_id = $1 AND (full_name ILIKE $2 OR email ILIKE $2) ORDER BY id ASC LIMIT $3 OFFSET $4",
            [id, `%${search}%`, limit, offset]
        );
        const data = response.rows;
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
});

app.get('/total-participants/:id', async (req, res) => {
    const id = req.params.id;
    const search = req.query.search || '';

    try {
        const response = await db.query(
            "SELECT COUNT(*) FROM registrations WHERE event_id = $1 AND (full_name ILIKE $2 OR email ILIKE $2)",
            [id, `%${search}%`]
        );
        const totalCount = response.rows[0].count;

        const count = parseInt(totalCount, 10);
        console.log("Total count:", count);
        res.json({ totalCount: count });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Server error");
    }
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000!`);
});
