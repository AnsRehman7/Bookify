import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import styles from './Login.module.css'; // Import custom CSS module
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../context/firebase'; // Adjust the import path as necessary
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap Modal
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button

const auth = getAuth(app);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault(); // Prevents form submission reload
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowModal(true); // Show modal on successful login
            setEmail(''); // Clear email field after login
            setPassword(''); // Clear password field after login
        } catch (error) {
            alert("Error: " + error.message); // Display detailed error messages
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/dashboard'); // Navigate to Dashboard page
    };

    return (
        <div className={styles.LoginPage}>
            <h1 className={styles.heading}>Login</h1>
            <div className={styles.Login}>
                <form onSubmit={loginUser}>
                    <label htmlFor="email" className={styles.label}>Enter your Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={styles.input}
                    />
                    <label htmlFor="password" className={styles.label}>Enter your Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Login</button>
                    <p className={styles.redirectText}>
                        Don't have an account? <Link to="/register" className={styles.link}>Register</Link>
                    </p>
                </form>
            </div>

            {/* Modal for Successful Login */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Successful!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Welcome back to Bookify! You are now logged in.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClose}>
                        Go to Dashboard
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
