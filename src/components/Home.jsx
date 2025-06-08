import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import styles from './Home.module.css'; // Importing CSS module

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => handleNavigation('/')}>
          Bookify
        </div>
        <div className={styles.navLinks}>
          <button
            className={styles.navButton}
            onClick={() => handleNavigation('/login')}
          >
            Login
          </button>
          <button
            className={styles.navButton}
            onClick={() => handleNavigation('/register')}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles.container}>
        <header className={styles.header}>Welcome to Bookify</header>
        <p className={styles.description}>
          Your one-stop solution to explore books, connect with authors, and build your personal library. Let’s make reading an adventure!
        </p>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <h2 className={styles.featuresHeader}>Why Choose Bookify?</h2>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h3>Extensive Book Collection</h3>
            <p>Discover thousands of books across all genres, curated just for you.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Connect with Authors</h3>
            <p>Engage with your favorite authors and explore their latest works.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Personalized Recommendations</h3>
            <p>Get tailored book recommendations based on your interests.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Organize Your Library</h3>
            <p>Easily manage and categorize your personal book collection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
