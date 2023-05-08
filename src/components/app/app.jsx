import React from "react";
import Header from "../app-header/header";
import GetBurger from "../get-burger/get-burger";
import { getInfo } from "../../utils/get-menu-info";

function App() {

  /*Реализация пролучения ингредиентов от сервера */
  const [ingredients, setIngredients] = React.useState([]);

  const getIngredients = async () => {
    await getInfo()
      .then(res => {
        setIngredients(res.data)
      })
      .catch(rej => console.log(`Ошбика ${rej.status}`))
  }

  React.useEffect(() => {
    getIngredients()
  }, []);

  return (
    <>
      <Header />
      <main>
        {ingredients.length && <GetBurger data={ingredients} />}
      </main>
      <footer className="mt-10"></footer>
    </>
  );
}

export default App;