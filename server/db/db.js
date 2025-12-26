const { connect, disconnect, runAsync, allAsync, buildTables } = require('./sqlite')
const { select, remove, update, insert } = require('./sql-query')
const { users } = require('./tables/users')
const { todos } = require('./tables/grades')

module.exports = {
    connect,
    disconnect, runAsync, allAsync, buildTables, select, remove, insert, update, users, todos
}