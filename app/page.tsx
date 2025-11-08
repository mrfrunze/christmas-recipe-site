import Footer from "../components/Footer";
import Header from "../components/Header";
import RecetionsGrid from "../components/RecetionsGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-0">
        <div className="max-w-6xl mx-auto px-4 pt-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Julens söta favoriter
          </h1>
        </div>
        <RecetionsGrid/>
      </main>
      <Footer/>
    </>
  );
}
