import React from "react";
import Header from "../AppHeader/Header";
import GetBurger from "../GetBurger/GetBurger";

function App() {
  const getIngredientsInfo = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = React.useState();

  React.useEffect(() => {
    // const getIngredientsData = async () => {
    //   setState({ ...state, isLloading: true });
    //   const res = await fetch(getIngredientsInfo);
    //   if (res.ok) {
    //   } else {
    //     return Promise.reject(`Ошибка ${res.status}`);
    //   }
    //   const data = await res.json();
    //   setState({...state, isLoading: false, ingredientsData: data.data})
    // }
    // getIngredientsData();
    fetch(getIngredientsInfo)
      .then((res) => {
        if (res.ok) {
          return res = res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .then((res) => {
        setState(
          res.data
        )
      })
      .catch((rej) => {
        console.log(`Ошибка ${rej.status}`);
      })
  }, []);

  console.log(state)

  return (
    <>
      <Header />
      <main>
        <GetBurger data={state} />
      </main>
      <footer className="mt-10"></footer>
    </>
  );
}

export default App;
