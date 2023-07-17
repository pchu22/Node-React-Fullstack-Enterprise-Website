import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css'

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <main className='main-welcome'>
            <div className="card welcome-page">
                <h1>Bem-vindo à softinsa!</h1>
                <div className="btw-wrapper">
                    <div className="btw-group">
                        <h5 className="welcome-text">Já tenho uma conta Softinsa!</h5>
                        <button
                            className='btn btn-outline-primary'
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </div>
                    <br/>
                    <div className="btw-group">
                        <h5 className="welcome-text">Sou novo aqui!</h5>
                        <button
                            className='btn btn-outline-primary'
                            onClick={() => navigate("/signup")}
                        >
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WelcomePage;
