import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import TodoModel from './Model/Todo.js';
import dotenv  from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/add",(req,res)=>{
    const task = req.body.task;
    TodoModel.create({task: task})
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})

app.get("/get",(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put("/update/:id",(req,res) => {
  const {id} = req.params;
  TodoModel.findByIdAndUpdate({_id:id}, {done:true})
  .then(result => res.json(result) )
  .catch(err =>res.json(err) )
})

app.delete('/delete/:id', async (req, res) => {
  try {
      const id = req.params.id;
      await TodoModel.findByIdAndDelete(id);
      res.status(200).send({ message: "Task deleted successfully" });
  } catch (err) {
      res.status(500).send({ error: "Failed to delete task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
