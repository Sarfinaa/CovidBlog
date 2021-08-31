import React,{useState,useEffect} from 'react'
import useStyles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'; 
import {createPost,updatePost} from '../../actions/posts'
import {useSelector} from 'react-redux';

function Form({currentId,setCurrentId}) {
    //From here we send data to database
    const classes=useStyles(); 
    const [postData,setPostData]=useState({
title:'',
message:'',
tags:'',
selectedFile:''
    });
    const post=useSelector(state=>currentId?state.posts.posts.find((p)=>p._id===currentId):null);
    useEffect(()=>{
        if(post) setPostData(post);
            },[post])
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    const handleSubmit=(e)=>{
e.preventDefault();
//dispatch action to reducer
if(currentId){
    dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
    
}else {
    
dispatch(createPost({...postData,name:user?.result?.name}));

}
clear();
    }
    const clear=()=>{
setCurrentId(null);
setPostData({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
        });
    }
    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to share your own <b>COVID</b> story with other's.
                </Typography>
            </Paper>
        )
    }
    return (
        <div>
            <Paper className={classes.paper} elevation={6}> 
                <form autoComplete="off" onSubmit={handleSubmit} noValidate className={`${classes.form} ${classes.root}`}>
<Typography variant="h6">{currentId?'Edit':'Share'} your COVID story </Typography>
   <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>  
   <TextField name="message" variant="outlined" multiline rowsMax={5} label="Message"fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>  
   <TextField name="tags" variant="outlined" label="Tags(Symptoms separated by a comma)" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}/> 

               <div className={classes.fileInput}>
                   <FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData,selectedFile:base64})}/>
                   
               </div>
               <div className={classes.notediv}> <p><span><b>Note:</b></span>You can create only one story!</p></div>
               <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
               <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </div>
    )
}

export default Form
