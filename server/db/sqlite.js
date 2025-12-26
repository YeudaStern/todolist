const sqlite = require('sqlite3').verbose() // shows errors
const { safeCreate } = require('./sql-query')
const path = require('path');
let db = {}
const dbPath = path.join(__dirname, 'mydb.db');
const connect = async () => {
    return new Promise((resolve, reject) => {
        db = new sqlite.Database(dbPath, (err) => {
            if (err) {
                console.error("ג Cannot connect to DB", { message: err.message });
                reject(err);
            } else {
                console.log("ג… Connected to DB");
                resolve(db);
            }
        });
    });
};

// Disconnect
const disconnect = () => {
    return new Promise((resolve, reject) => {
        if (!db) return resolve(); // nothing to close

        db.close((err) => {
            if (err) {
                console.error("ג Cannot disconnect from DB", { message: err.message });
                reject(err);
            } else {
                console.log("נ” Disconnected from DB");
                resolve();
            }
        });
    });
};
const split = (query) => {
    if (query.includes(';'))
        return query.split(';')
    else
        return query
}
//run Async

const runAsync = async (query) => {
    const queries = split(query);
    if (Array.isArray(queries)) {
        const promises = queries.map(q => {
            return new Promise((resolve, reject) => {
                console.log("Run query\n", q);
                db.run(q, function (err) {
                    if (err) return reject(err);
                    resolve({ lastID: this.lastID, changes: this.changes });
                });
            });
        });

        return await Promise.all(promises);

    } else {
        return new Promise((resolve, reject) => {
            console.log("Run query\n", query)
            db.run(query, function (err) {

                if (err) return reject(err);
                resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    }
};

//all Async
const allAsync = async (query) => {
    const queries = split(query);
    if (Array.isArray(queries)) {
        return Promise.all(queries.map(q =>
            new Promise((resolve, reject) => {
                console.log("Run query\n", q)
                db.all(q, (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            })
        ));
    } else {
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                console.log("Run query\n", query)
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
};

// Create tables
const buildTables = async (table) => {
    if (Array.isArray(table)) {
        for (const t of table) {
            const query = safeCreate(t);
            console.log("נ› ן¸ Creating table:\n", query);
            await runAsync(query);
        }
    } else {
        const query = safeCreate(table);
        console.log("נ› ן¸ Creating table:\n", query);
        await runAsync(query);
    }
};
module.exports = {
    connect,
    disconnect,
    buildTables,
    runAsync,
    allAsync
}
