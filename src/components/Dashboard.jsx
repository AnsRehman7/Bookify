import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css"; // Import CSS for styling
import { useFirebase } from "../context/firebase";

export const Dashboard = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [Books, setBooks] = useState([]);

  // Navigate to AddBooks page
  const handleAddBooks = () => {
    navigate("/add-book"); // Navigate to the AddBooksToList component
  };

  // Fetch all books when component mounts
  useEffect(() => {
    firebase.ListAllBooks().then((books) => {
      if (Array.isArray(books)) {
        setBooks(books); // Ensure Books is an array
      } else {
        console.error("Unexpected data format:", books);
        setBooks([]); // Fallback to an empty array
      }
    });
  }, [firebase]);

  const handleEdit = (id, book) => {
    const updatedData = {
      ...book,
      Book_Name: prompt("Enter new Book Name:", book.Book_Name),
      ISBN_Number: prompt("Enter new ISBN Number:", book.ISBN_Number),
      Author: prompt("Enter new Author:", book.Author),
      Edition: prompt("Enter new Edition:", book.Edition),
    };

    firebase.editBookInFirestore(id, updatedData).then((response) => {
      if (response.success) {
        alert("Book successfully updated!");
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === id ? { id, ...updatedData } : b))
        );
      } else {
        alert("Failed to update book. Please try again.");
      }
    });
  };

  const handleDelete = (id) => {
    firebase.deleteBookFromFirestore(id).then((response) => {
      if (response.success) {
        alert("Book successfully deleted!");
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      } else {
        alert("Failed to delete book. Please try again.");
      }
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Welcome to Your Bookify Dashboard</h1>
        <p>Here you can manage your account, explore features, and much more!</p>
        <button className={styles.addBooksButton} onClick={handleAddBooks}>
          Add Books to List
        </button>
      </div>

      <div className={styles.bookList}>
        <h2>Your Book List:</h2>
        <ul className={styles.bookItems}>
          {Books.map((book) => (
            <li key={book.id} className={styles.bookItem}>
              <h3>{book.Book_Name}</h3>
              <p><strong>ISBN Number:</strong> {book.ISBN_Number}</p>
              <p><strong>Author:</strong> {book.Author}</p>
              <p><strong>Edition:</strong> {book.Edition}</p>
              <div className={styles.button}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(book.id, book)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
