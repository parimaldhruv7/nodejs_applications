import express from "express";
import { v4 as uuidv4} from "uuid";
const router=express.Router();
const users=[];

router.get("/",(req,res)=>{
    res.send(users)
})
router.post("/post",(req,res)=>{
    const user=req.body;

    users.push({...user,uid:uuidv4()})
    res.send(`${user.name} has been added to the Database`)
})
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const finduser=users.find((user)=>user.uid===id);
    if (!finduser) {
        res.status(404).send("User not found");
    } else {
        res.send(finduser);
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    const newUsers  = users.filter(user => user.uid !== id);
  
    if (newUsers.length === users.length) {
   
        res.status(404).send(`User with ID ${id} not found`);
    } else {
       
        users.splice(0, users.length, ...newUsers);
        
        res.send(`User with ID ${id} deleted successfully from database`);
    }
  });
  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
  
    const user = users.find((user) => user.uid === id);
    if (!user) {
        return res.status(404).send("User not found");
    }
  
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
  
    res.send(`User with the ID ${id} has been updated`);
});

export default router;
