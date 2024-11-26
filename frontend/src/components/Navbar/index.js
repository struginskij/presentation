import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar({ isSignInVisible, setIsSignInVisible }) {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!isSignInVisible && (
          <>
            <Link to="/signin">
              <Button colorScheme="pink" variant="ghost">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="pink" variant="ghost">
                Sign Up
              </Button>
            </Link>
          </>
        )}
        {isSignInVisible && (
          <>
            <Link to="/">
              <Button
                colorScheme="pink"
                variant="ghost"
                onClick={() => setIsSignInVisible(false)}
              >
                Logout
              </Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="pink" variant="ghost">
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
