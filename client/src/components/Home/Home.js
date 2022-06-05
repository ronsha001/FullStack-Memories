import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts'

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from '../../styles'

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles()
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    
    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent='space-between' alignContent="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home