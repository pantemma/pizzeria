import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import './Modal.css';

const Modal = () => {

    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            username: state.username,
            password: state.password
        })
        .then(response => {
            dispatch(login());
        }, (error) => {
            console.log(error);
        });
        /*const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: state.username,
                password: state.password,
            }),
        };
        fetch('/api/users/create', requestOptions)
        .then(response => {
            response.json();
            if(response.status===201)
                props.history.push('/');
        })
        .then(data => console.log(data));*/
    }

    return (
        <div className="modal fade" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form className="modal-body mx-3">
                        <div className="mb-5">
                            <i className="fa fa-user"></i>
                            <label data-error="wrong" data-success="right" htmlFor="loginForm-username">Username</label>
                            <input type="text" id="loginForm-username" name="username" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="mb-5">
                            <i className="fa fa-lock"></i>
                            <label data-error="wrong" data-success="right" htmlFor="loginForm-pass">Password</label>
                            <input type="password" id="loginForm-pass" name="password" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="mb-2 d-flex justify-content-center">
                            <input className="btn btn-default px-5" type="submit" value="Login" onClick={handleLogin}/>
                        </div>
                    </form>
                    <div className="modal-footer d-flex justify-content-center">
                        <div className="mb-2">Don't have an account yet?<a href="/register"> Register</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;