import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../context/firebase'; // Adjust the import path as necessary
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './Register.module.css'; // Import the custom CSS module

export const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    class: '',
    rollNo: '',
    section: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const auth = getAuth();
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user data in Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: formData.email,
        name: formData.name,
        class: formData.class,
        rollNo: formData.rollNo,
        section: formData.section,
      });

      // Show the success modal
      setShowModal(true);

      // Clear input fields by resetting formData
      setFormData({
        email: '',
        password: '',
        name: '',
        class: '',
        rollNo: '',
        section: '',
      });
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/dashboard'); // Navigate to the dashboard page
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicClass">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRollNo">
          <Form.Label>Roll No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your roll number"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSection">
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>

      {/* Modal for Success Alert */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congratulations, your account has been successfully created. Welcome to Bookify!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Go to Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
