import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function AuthBar({ setUser, onGoogleLogin })
 {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setCurrentUser(data.session.user);
        setUser(data.session.user);
      }
    });

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
          setUser(session.user);
        } else {
          setCurrentUser(null);
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [setUser]);

  // Login
  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) alert(error.message);
  };

  // Sign up
  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
    });
    if (error) alert(error.message);
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div
      style={{
        background: "#16a34a",
        color: "white",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {!currentUser ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button onClick={login}>Login</button>
          <button onClick={signup}>Signup</button>
          <button
  type="button"
  className="hz-google-btn"
  onClick={onGoogleLogin}
>
  Continue with Google
</button>

        </>
      ) : (
        <>
          <span>Logged in as: {currentUser.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
