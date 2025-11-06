import Footer from "../components/Footer";
import Header from "../components/Header";
import RecetionsGrid from "../components/RecetionsGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <RecetionsGrid/>
      </main>
      <Footer/>
    </>
  );
}
