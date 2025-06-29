export default function App() {
  return (
    <div className="app">
      <nav>
        <div>
          <img src="logo192.png" width={35} alt="logo" />
          <span>Movies</span>
        </div>
        <div>
          <input type="text" placeholder="Search..." />
        </div>
        <div>
          <p>
            Result <strong>X</strong>
          </p>
        </div>
      </nav>
      <main>
        <div className="movie">
          <div className="list">
            <div className="item"></div>
          </div>
        </div>
        <div className="movie">
          <div className="list">
            <div className="item">
              <div>
                <img src="logo512.png" width={55} alt="test" />
              </div>
              <div>
                <h2>name</h2>
                <p>des</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
