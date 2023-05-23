import Header from "../app-header/header";
import GetBurger from "../get-burger/get-burger";

function App() {
  return (
    <>
      <Header />
      <main>
        <GetBurger />
      </main>
      <footer className="mt-10"></footer>
    </>
  );
}

export default App;