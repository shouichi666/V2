<<<<<<< HEAD
import "../assets/styles/globals.css";
import Layout  from "../components/temoplate/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
=======
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
>>>>>>> deploy/master
