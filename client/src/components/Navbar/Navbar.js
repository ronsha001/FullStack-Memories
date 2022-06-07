import React, { useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'
import useStyles from './styles'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

function Navbar({ user, setUser }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({type: 'LOGOUT' })

        navigate('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        // JWT ...
        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [navigate])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to={'/'} className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="memories" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar