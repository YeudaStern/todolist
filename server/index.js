const {connect,buildTables,users,allAsync,todos,runAsync,select,remove,insert,update} = require('./db/db.js')
const express = require('express')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())

const validateBody = (req,res,next)=>{
    if(!req.body)
    {
        res.status(400).send("need body in req")
        return
    }
    const {id,name,password,birthday,email,phone} = req.body
    console.log(req.body)
    if(!id ||!name ||!password||!birthday||!email||!phone)
        res.status(401).send("missing data in req.body {id,name,password,birthday,email,phone}")
    else
        next()
}
const validateBodyUpdate = (req,res,next)=>{
    const {id} = req.params
    // console.log(req.params)
    
    if(!req.body||req.body.id||!id){
        res.status(400).send("no id in req.body,no body")
        return
    }

    if(!req.body)
    {
        res.status(400).send("need body in req,need id in params")
        return
    }
    console.log(req.body)
    next()
}
const validateQuery = (req,res,next)=>{
    if(!req.query)
    {
        res.status(400).send("need query in req")
        return
    }
    const {id,pass} = req.query
    console.log(req.query)
    if(!id || !pass)
        res.status(400).send("missing data {id,password} in req.query")
    else
        next()
}
const validateDucplicate = async (req,res,next)=>{
    const {id} = req.body
    const data = await allAsync(select(users.name,{id:id}))
    if(data.length!=0)
        res.status(400).send("user allready exisit")
    else
        next()
}

app.post('/register',validateBody,validateDucplicate,async(req,res)=>{
    const result = await runAsync(insert(users.name,req.body))
    res.send(result)

})

app.get('/login',validateQuery,async(req,res)=>{
    const {id,pass} = req.query
    const data = await allAsync(select(users.name,{id:id,password:pass}))
    console.log(data)
    if(data.length!=0)
        res.status(200).send(data[0])
    else
        res.status(400).send("wrong password or id")
})
app.get('/user/:id',async(req,res)=>{
    if(!req.params){
        res.status(400).send("need id")
        return
    }
    const {id} = req.params
    const data = await allAsync(select(users.name,{id:id}))
    if(data.length!=0)
        res.status(200).send(data[0])
    else
        res.status(404).send("not found")
})

app.get('/users',async(req,res)=>{
    
    const data = await allAsync(select(users.name))
    const reduceUsers = data.map((user)=>{
       return { 
        id:user.id,
        name:user.name
    }
    })
    res.send(reduceUsers)
})


app.delete('/user/:id',async(req,res)=>{
    const {id} = req.params
    const result = await runAsync(remove(users.name,{id:id}))
    res.send(result)
})
app.patch('/user/:id',validateBodyUpdate,async(req,res)=>{
    const {id} = req.params
    const result = await runAsync(update(users.name,req.body,{id:id}))
    res.send(result)
})

app.get('/todos', async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).send("userId is required");
    }
    const data = await allAsync(select(todos.name, { userId: userId }));
    res.send(data);
});

app.post('/todos', async (req, res) => {
    if (!req.body.userId || !req.body.text) {
        return res.status(400).send("missing data");
    }
    const result = await runAsync(insert(todos.name, req.body));
    res.send({ ...req.body, dbResult: result });
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const result = await runAsync(remove(todos.name, { id: id }));
    res.send(result);
});

app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const result = await runAsync(update(todos.name, req.body, { id: id }));
    res.send(result);
});

// app.delete('/all',async(req,res)=>{
//     const result = await runAsync(remove(users.name,{}))
//     res.send(result)
// })

app.listen(3000,async(req,res)=>{
    await connect()
    await buildTables(users)
    if (todos) { 
        await buildTables(todos); 
    }
    console.log("server is on localhost:3000")
})