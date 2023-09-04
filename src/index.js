import React from "react";
import ReactDOM from "react-dom/client"; //used in v18
import "./index.css"; //webpack will import and we can use it directly. it will take care of it

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// Main react component bcoz this component is rendering  in browser so all component should refer this component
// One component can return only one parent element
// Each component function should be start from capital letter
function App() {
  return (
    <div className="container">
      <Header /> {/*including(embeding) refering pizza component */}
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Our First Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  // react will render the truthy value that is 0, null, "", [], undeifned;
  // react will not render the true or false (boolean values)
  // cannot write any js that would not produce any value in {} insted write js expression that produces value
  const pizzas = pizzaData;
  // const numPizza=[] -- this will make UI empty wiht pizzas but our element will not remove from page as it is truthy value
  const numPizza = pizzas.length;
  return (
    <main className="menu">
      <h2>Pizza Menu</h2>
      {/* if numPizza is not > then 0 it will give false which is true value not truthy value */}
      {numPizza > 0 ? (
        <>
          <p>
            Authentic Italian cuisien. 6 creative dishes to choose from. All
            form our stone oven, organic, all delicious.
          </p>
          <ul className="pizzas">
            {/* forEach will not work as we are not getting new array from forEach. map will return an array of Pizza component(component forn each pizza)*/}
            {pizzas.map((pizza) => (
              //refering pizza component
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : null}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  // conditional rendering with return
  // if (pizzaObj.soldOut) return null;

  //props object contain pizzaObj passes form parent component and PizzaObject contain the object of each pizza in array
  return (
    // webpack(module Bundler will looe the public auto.)
    // conditionally rendering the class
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>
          <strong>Ingredients :</strong>
          {pizzaObj.ingredients}
        </p>
        <span>
          {/* //conditionaly rendering the innertext of element */}
          <strong>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</strong>
        </span>

        {/* //conditionaly rendering the element */}
        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} */}
      </div>
    </li>
  );
}

function Footer() {
  // logic
  const time = new Date().getHours();
  const openHour = 9;
  const closeHour = 22;
  const isOpen = time >= openHour && time <= closeHour; //return or false
  return (
    <footer className="footer">
      {/* if isOpen is true then the next && statement will execute or OR statement will execute if isOpen is false  */}
      {/* {(isOpen && (
        <p>We are open until {close}:00. Come visit us or order online.</p>
      )) || (
        <p>
          Shop is currently closed. You Cannot order now. Vist us between {open}
          :00 && {close}:00
        </p>
      )} */}
      {isOpen ? (
        // extrating jsx into new component
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          Shop is currently closed. You Cannot order now. Vist us between{" "}
          {openHour}
          :00 && {closeHour}:00
        </p>
      )}
    </footer>
  );
}

//Destructing PROPS
function Order({ openHour, closeHour }) {
  console.log(openHour);
  return (
    <p>We are open until {closeHour}:00. Come visit us or order online.</p>
  );
}

// used in react V18
// ReactDOM.render method is replaced by ReactDOM.createRoot method thats why it is in ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));
// this is also jsx as jsx has one parent element
root.render(
  // rendering 2 times usig strict Mode
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
