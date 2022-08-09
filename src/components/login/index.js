import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField, InputAdornment, Button, makeStyles, Typography } from "@material-ui/core";
import { Context } from "../../appContext/wrapper";;

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: "url(https://demos.creative-tim.com/material-dashboard-pro-react/static/media/lock.9a41f1d5.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:before": {
            top: 0,
            left: 0,
            content: '""',
            display: 'block',
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 2,
            opacity: 0.5,
        },
        "&:after": {
            top: 0,
            left: 0,
            content: '""',
            display: 'block',
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 2,
            opacity: 0.5,
            backgroundColor: "#000000a6"
        },
    },
    container: {
        minHeight: "30vh",
        width: 250,
        backdropFilter: "blur(15px)",
        backgroundColor: "#ffffffad",
        position: "absolute",
        borderRadius: 10,
        boxShadow: "0 0 20px -2px #0000008f",
        display: "flex",
        flexDirection: "column",
        padding: 25,
        textAlign: "center",
        zIndex: 5,
        cursor: "pointer",
        '& label.Mui-focused': {
            color: 'inherit',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black !important',
            },
            '&:hover fieldset': {
                borderColor: '#ffffff4d',
            },
        },
        '& .MuiFormControl-root': {
            '& .Mui-error': {
                color: 'inherit',
            }
        },
    },
    title: {
        marginBottom: "1rem"
    },
    loginBtn: {
        backgroundColor: "#ffffff7d",
        marginTop: 15,
        borderRadius: 25,
        width: "100%",
        "&:hover": {
            backgroundColor: "#1212124d",
            color: "#ffffffcc"
        }
    },
    signUp: {
        textDecoration: "none"
    }
}));

export function Login() {
    const classes = useStyles();
    const [data, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: "",
        showPassword: false,
        error: false
    });

    useEffect(() => {
        dispatch({
            type: "logOut"
        });
    }, []);

    const handleChange = (name, e) => {
        setState(prevState => ({ ...prevState, [name]: e.target.value }))
    };

    const iconClick = () => {
        setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }))
    };

    const handleLogin = () => {
        dispatch({
            type: "loginSuccess"
        });
        navigate("/dashboard");
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>Login</Typography>
                <TextField variant="outlined" label="Username" margin="dense" required
                    error={state.error}
                    value={state.username}
                    onChange={(e) => handleChange("username", e)}
                    InputProps={{
                        endAdornment: <InputAdornment>
                            <i className="fas fa-user"></i>
                        </InputAdornment>,
                    }}
                />
                <TextField variant="outlined" label="Password" margin="dense" required
                    type={state.showPassword ? "text" : "password"}
                    error={state.error}
                    value={state.password}
                    onChange={(e) => handleChange("password", e)}
                    InputProps={{
                        endAdornment: <InputAdornment>
                            {state.showPassword ?
                                <i className="fas fa-eye" onClick={iconClick} /> :
                                <i className="fas fa-eye-slash" onClick={iconClick} />}
                        </InputAdornment>
                    }}
                />
                <Button className={classes.loginBtn} onClick={handleLogin}>Login</Button>
                <Link to="/signup" className={classes.signUp}>
                    <Button className={classes.loginBtn}>Sign Up</Button>
                </Link>
            </div>
        </div>
    )
}
