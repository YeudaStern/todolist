const sql = require('sql-query')
const sqlQuery = sql.Query("sqlite");
let sqlCreate = sqlQuery.create();
let sqlSelect = sqlQuery.select();
let sqlUpdate = sqlQuery.update();
let sqlDelete = sqlQuery.remove();
let sqlInsert = sqlQuery.insert();
const safeCreate = (obj) => {
    const query = sqlCreate.table(obj.name).fields(obj.fields).build();
    sqlCreate = sqlQuery.create()
    const regex = /^(\s*CREATE\s+TABLE\s+)(["'`]?)(\w+)\2/i;
    return query.replace(regex, '$1IF NOT EXISTS $2$3$2 ');

}
const select = (table, filter = null) => {
    const query = filter ? sqlSelect.from(table).where(filter).build() : sqlSelect.from(table).build()
    sqlSelect = sqlQuery.select()
    return query
}
const remove = (table, filter = null) => {
    const query = filter ? sqlDelete.from(table).where(filter).build() : sqlDelete.from(table).build()
    sqlDelete = sqlQuery.remove()
    return query
}
const update = (table, values, filter = null) => {
    const query = filter ? sqlUpdate.into(table).set(values).where(filter).build() : sqlUpdate.into(table).set(values).build()
    sqlUpdate = sqlQuery.update()
    return query
}

const insert = (table, values) => {
    // Handle multiple objects (array of rows)
    if (Array.isArray(values)) {
        const queries = values.map(row => {
            const query = sqlInsert.into(table).set(row).build();
            sqlInsert = sqlQuery.insert(); // reset builder for next row
            return query;
        });
        return queries.join('; ') + ';'; // Separate with ; and end with ;
    }
    // Handle single object
    const query = sqlInsert.into(table).set(values).build();
    sqlInsert = sqlQuery.insert(); // reset builder
    return query;
};
module.exports = {
    safeCreate,
    select,
    remove,
    update,
    insert
}