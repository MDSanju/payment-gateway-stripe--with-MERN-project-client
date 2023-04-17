import { useState, useEffect } from "react";
import initializeAuthentication from "../Pages/Login/Firebase/firebase.initialize";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getIdToken,
  signOut,
} from "firebase/auth";

initializeAuthentication();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const registerUser = (email, password, name, redirectUriNavigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        const newUser = { email, displayName: name };
        setUser(newUser);
        // save user to the database
        saveUserToDb(email, name);
        // send name to firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            //
          })
          .catch((error) => {
            //
          });
        redirectUriNavigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const signInUser = (email, password, location, redirectUriNavigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        redirectUriNavigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  // google sign in
  const signInWithGoogle = (location, redirectUriNavigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const googleLoggedInUser = result.user;
        setAuthError("");
        upsertUserToDb(
          googleLoggedInUser.email,
          googleLoggedInUser.displayName
        );
        const destination = location?.state?.from || "/";
        redirectUriNavigate(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // JWT TOKEN
        getIdToken(user).then((idToken) => {
          setJwtToken(idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        //
      })
      .catch((error) => {
        //
      })
      .finally(() => setIsLoading(false));
  };

  const saveUserToDb = (email, displayName) => {
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  const upsertUserToDb = (email, displayName) => {
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  // Admin select
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  return {
    user,
    admin,
    jwtToken,
    isLoading,
    registerUser,
    signInUser,
    authError,
    signInWithGoogle,
    logout,
  };
};

export default useFirebase;
