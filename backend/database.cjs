const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "MPVarma@462",
    database: "PraneethProject"
});

async function fetchData() {
    let userData = [];

    try {
        const result = await pool.query('SELECT * FROM customer1');
        const rows = result.rows;
        
        rows.forEach(row => {
            // Extract date and time from created_at timestamp
            const createdAt = row.created_at;
            const sno = row.sno;
            const customer_name = row.customer_name;
            const age = row.age;
            const phone = row.phone;
            const location = row.location;
            const date = createdAt.toISOString().split('T')[0]; // Extract date part
            const time = createdAt.toISOString().split('T')[1].split('.')[0].slice(0, 5); // Extract time part


            //EXAMPLE : 2024-03-03T08:30:15.123Z
            // => ['2024-03-03','08:30:15.123Z']


            // Output the extracted date and time
            const user = {
                'SNo': sno,
                'CUSTOMER': customer_name,
                'AGE': age,
                'CONTACT': phone,
                'LOCATION': location,
                'DATE': date,
                'TIME': time
            };
            userData.push(user);
        });
        return userData;
    } catch (err) {
        console.log(err.message);
        return [];
    } finally {
        await pool.end();
    }
}

module.exports = fetchData();