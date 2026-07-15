import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "2710",
    database: "todoteste"
});

export default pool;