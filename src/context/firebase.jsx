import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyD6a6FUXrvxzi12lJkLI_iU695IKj4E1cM",
    authDomain: "bookify-a7a88.firebaseapp.com",
    projectId: "bookify-a7a88",
    storageBucket: "bookify-a7a88.firebasestorage.app",
    messagingSenderId: "1050027630358",
    appId: "1:1050027630358:web:8afb40db3e13904377fa37",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

// Function to add a book to Firestore
export const addBookToFirestore = async (formData) => {
    try {
        // Add book data to Firestore
        await addDoc(collection(db, "Books"), {
            Book_Name: formData.Book_Name,
            ISBN_Number: formData.ISBN_Number,
            Author: formData.Author,
            Edition: formData.Edition,
        });

        return { success: true, message: "Book successfully added!" };
    } catch (error) {
        console.error("Error adding book:", error);
        return { success: false, error };
    }
};

// Function to edit a book in Firestore
export const editBookInFirestore = async (id, updatedData) => {
    try {
        const bookRef = doc(db, "Books", id); // Get the document reference
        await updateDoc(bookRef, updatedData); // Update the document
        return { success: true, message: "Book successfully updated!" };
    } catch (error) {
        console.error("Error updating book:", error);
        return { success: false, error };
    }
};

// Function to delete a book from Firestore
export const deleteBookFromFirestore = async (id) => {
    try {
        const bookRef = doc(db, "Books", id); // Get the document reference
        await deleteDoc(bookRef); // Delete the document
        return { success: true, message: "Book successfully deleted!" };
    } catch (error) {
        console.error("Error deleting book:", error);
        return { success: false, error };
    }
};

// Function to get all books from Firestore
export const ListAllBooks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Books"));
        const books = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return books; // Return an array of book objects
    } catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return an empty array in case of an error
    }
};

// Firebase Provider
export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider
            value={{
                db,
                addBookToFirestore,
                editBookInFirestore,
                deleteBookFromFirestore,
                ListAllBooks,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext(FirebaseContext);
export const app = firebaseApp;
