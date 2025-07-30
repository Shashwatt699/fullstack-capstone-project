import React, { useState } from 'react';
import './RegisterPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();



    const handleRegister = async () => {
        const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        });

        const json = await response.json();
        console.log('json data', json);
        console.log('error', json.error);
        console.log(json.authToken);
        if (json.authToken) {
            
            sessionStorage.setItem('auth-token', json.authToken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', json.email);

            setIsLoggedIn(true);
            navigate("/app");
        } if (json.error) {
            setShowerr(json.error);
        }
    }


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                        <div><label htmlFor='firstName' className='form label'></label><br /><input id="firstName" type="text" className='form-control' placeholder='Enter Your First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                        <div><label htmlFor='lastName' className='form label'></label><br /><input id="lastName" type="text" className='form-control' placeholder='Enter Your Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                        <div><label htmlFor='email' className='form label'></label><br /><input id="email" type="email" className='form-control' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        <div className="text-danger">{showerr}</div>
                        <div><label htmlFor='password' className='form label'></label><br /><input id="password" type="password" className='form-control' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                        {/* insert code here to create a button that performs the `handleRegister` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )//end of return
}

export default RegisterPage;