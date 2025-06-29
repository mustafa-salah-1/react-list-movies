import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Navbar>
        <Logo />
        <Search />
        <Result />
      </Navbar>

      <Main>
        <Box>
          <MovieList />
        </Box>

        <Box>
          <WatchedSummary />
          <WatchedMoviesList />
        </Box>
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie">
      <div className="button">
        <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? "-" : "+"}
        </button>
      </div>
      {isOpen && children}
    </div>
  );
}
function MovieList() {
  return (
    <div className="list">
      <ListItem />
    </div>
  );
}
function ListItem() {
  return (
    <div className="item">
      <div>
        <img src="logo512.png" width={55} alt="test" />
      </div>
      <div>
        <h2>name</h2>
        <p>des</p>
      </div>
    </div>
  );
}
function WatchedSummary() {
  return <div>summary</div>;
}
function WatchedMoviesList() {
  return (
    <div className="list">
      <WatchedItem />
    </div>
  );
}
function WatchedItem() {
  return (
    <div className="item">
      <div>
        <img src="logo512.png" width={55} alt="test" />
      </div>
      <div>
        <h2>name</h2>
        <p>des</p>
      </div>
    </div>
  );
}

function Navbar({ children }) {
  return <nav> {children}</nav>;
}
function Logo() {
  return (
    <div>
      <img src="logo192.png" width={35} alt="logo" />
      <span>Movies</span>
    </div>
  );
}

function Search() {
  return (
    <div>
      <input type="text" placeholder="Search..." />
    </div>
  );
}

function Result() {
  return (
    <div>
      <p>
        Result <strong>X</strong>
      </p>
    </div>
  );
}
