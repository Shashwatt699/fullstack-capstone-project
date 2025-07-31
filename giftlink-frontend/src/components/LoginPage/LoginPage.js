import React, { useEffect, useState } from "react";
import './LoginPage.css';
//{{Insert code here}} //Task 1: Import urlConfig from `giftlink-frontend/src/config.js`
import { urlConfig } from '../../config';
//{{Insert code here}} //Task 2: Import useAppContext `giftlink-frontend/context/AuthContext.js`
import { useAppContext } from '../../context/AuthContext';
//{{Insert code here}} //Task 3: Import useNavigate from `react-router-dom` to handle navigation after successful registration.
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    //insert code here to create useState hook variables for email, password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //Do these tasks inside the RegisterPage function after the useStates definition
    //Task 4: Include a state for incorrect password.
    const [incorrect, setIncorrect] = useState('');
    //Task 5: Create a local variable for `navigate`,`bearerToken`   and `setIsLoggedIn`.
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();
    //{{Insert code here}} //Task 6. If the bearerToken has a value (user already logged in), navigate to MainPage
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate])

    // insert code here to create handleLogin function and include console.log
    const handleLogin = async () => {
        try {
            //first task
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                //Task 7: Set method
                method: 'Post',
                //Task 8: Set headers
                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken ? `bearer ${bearerToken}` : '',//Include bearer token if available
                },
                //Task 9: Set body to send user details
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })

            const json = await response.json();
            console.log(json);

            if (json.authtoken) {

                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);

                setIsLoggedIn(true);
                navigate('/app');
            } else {
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                setIncorrect("Wrong password. try again.");
                //Below is optional
                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
                <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>{incorrect}</span>
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        {/* insert code here to create input elements for the variables email and  password */}
                        <div className="mb-3"><label htmlFor="email" className="form-label">Email</label><input id="email" type="email" className="form-control" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        <div className="mb-3"><label htmlFor="password" className="form-label">Password</label><input id="password" type="password" className="form-control" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                        {/* insert code here to create a button that performs the `handleLogin` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>LOGIN</button>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginPage;