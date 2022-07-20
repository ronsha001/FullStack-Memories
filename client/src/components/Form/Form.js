import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
    

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])
    // console.log(postData);
    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('message', postData.message);
            formData.append('tags', postData.tags);
            formData.append('selectedFile', postData.selectedFile);
            formData.append('name', user?.result?.name);
            dispatch(updatePost(currentId, formData));
        } else {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('message', postData.message);
            formData.append('tags', postData.tags);
            formData.append('selectedFile', postData.selectedFile);
            formData.append('name', user?.result?.name);
            dispatch(createPost(formData, navigate));
        }
        clear();
}     
    
    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }
    
    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}><input type='file' multiple={false} onChange={(e) => setPostData({...postData, selectedFile: e.target.files[0]})}/></div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form