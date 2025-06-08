import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addBookToFirestore } from "../context/firebase"; // Adjust path if needed
import styles from "./Register.module.css"; // Import custom CSS module

export const AddBooksToList = () => {
  const [formData, setFormData] = useState({
    Book_Name: "",
    ISBN_Number: "",
    Author: "",
    Edition: "",

  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await addBookToFirestore(formData);
    if (response.success) {
      setShowModal(true);
      setFormData({
        Book_Name: "",
        ISBN_Number: "",
        Author: "",
        Edition: "",
      });
    } else {
      console.error(response.error);
      alert("Failed to add book. Please try again.");
    }

    setIsLoading(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h2>Add Book</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Name"
            name="Book_Name"
            value={formData.Book_Name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN Number"
            name="ISBN_Number"
            value={formData.ISBN_Number}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author Name"
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edition</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Edition"
            name="Edition"
            value={formData.Edition}
            onChange={handleChange}
            required
          />
        </Form.Group>


        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
        <Button variant="secondary" onClick={() => navigate("/dashboard")}>
          Cancel
          </Button>
      </Form>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Added Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Congratulations, the book has been added!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Go to Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
