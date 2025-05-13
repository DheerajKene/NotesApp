const express = require('express')
const NoteModel = require("../model/note.model");
const UserModel = require('../model/user.model');

const NoteRouter = express.Router();


NoteRouter.get('/notes', async (req, res)=>{
    const userId = req.user._id;
try {
    const notes = await NoteModel.find({userId});
    res.send(notes);
} catch (error) {
    res.send(`Error while fetching notes..!${error}`);
}
});




NoteRouter.post('/update-note', async (req, res)=>{
    const payload = req.body;
    const noteId = req.params.id;
    const userId = req.user._id;
    try {
        const note = await NoteModel.findOne({_id:noteId});
        if(note.userId.toString() == userId.toString()){   //in this if condition it will never compare object ids so that it is need to convert it into plane string.
            await NoteModel.findByIdAndUpdate({_id:noteId}, payload);
            return res.send(`Note updated successfully...`)
        }else{
            return res.send(`Unauthorized`)
        }
    } catch (error) {
        res.send(`Error while updating note..!${error}`);
    }
});

NoteRouter.post('/create-note', async (req, res)=>{
    const {title, description , status } = req.body;
    const userId = req.user._id;
    try {
        const note = new NoteModel({
            title,
            description,
            status,
            userId:userId
        });
        await note.save();
        res.send(`Note created successfully...`);
    } catch (error) {
        res.send(`Error while creating note...!${error}`)
    }
    
});

NoteRouter.post('/delete-note', async (req, res)=>{
    const userId = req.user._id;
    const noteId = req.params.id
    try {
        const note = NoteModel.findOne({_id:noteId});
        if(note.userId.toString() == userId.toString()){
            await NoteModel.findByIdAndDelete({_id:noteId});
            return res.send(`note deleted successfully...`);
        }else{
            return res.send(`unauthorized`);
        }
        
    } catch (error) {
        return res.send(error);
    }
});


module.exports = NoteRouter