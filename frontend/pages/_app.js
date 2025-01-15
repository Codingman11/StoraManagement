import Head from "next/head";
import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  const [authorized, setAuthorized] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedJWT = localStorage.getItem("JWT_token");
    if (storedJWT) {
      setAuthorized(storedJWT);
    }
    setLoaded(true);
  }, [authorized]);

  if (!loaded) {
    return;
  }

  return (
    <>
      <Head>
        <title> Simple Storage </title>
        <link rel="shortcut icon" href="/simplestock.ico" />
      </Head>
      {authorized ? (
        <Layout signedIn={setAuthorized} authorization={authorized}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Login signedIn={setAuthorized} />
      )}
    </>
  );
}

export default MyApp;
