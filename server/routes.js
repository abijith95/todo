const express = require('express');
const router = express.Router();
const {getConnectedClient} = require("./database");
const {ObjectId} = require("mongodb");

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("tododb").collection("todos");
    return collection;
}


//get
router.get("/todos",async(req,res)=>{
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});
//post
router.post("/todos",async (req,res)=>{
    const collection = getCollection();
    let {todo} = req.body;

    if(!todo){
       return  res.status(400).json({mssg:"error no todo found"});
    }

  
    todo=( typeof todo === "string") ? todo : JSON.stringify(todo);

    const newTodo = await collection.insertOne({todo,status:false});
    res.status(201).json({todo,status:false,_id:newTodo.insertedId})
});
//delete
router.delete("/todos/:id",async (req,res)=>{
      const collection = getCollection();
      const _id = new ObjectId(req.params.id);

     const deleteTodo = await collection.deleteOne({_id});

    res.status(200).json(deleteTodo)
});
//put
router.put("/todos/:id",async (req,res)=>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const {status} = req.body;

    if(typeof status !== "boolean")
    {
        return res.status(400).json({mssg:"invalid status"});
    }

    const UpdatedTodo = await collection.updateOne({_id},{$set:{status:!status}})

    res.status(200).json(UpdatedTodo)
});

module.exports = router;