import './App.css';
import '@canonical/react-components/dist/components/Spinner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="row">
          <div class="col-4">
            <div class="p-card--highlighted">
              <div class="p-card__content">
                <img class="p-card__image" alt="" height="185" width="330" src="https://assets.ubuntu.com/v1/36f1139e-Design-and-Web-Team-Blog.jpg"></img>
                  <h4>
                    <a href="#">Open Source Robotics Challenges</a>
                  </h4>
                  <p class="u-no-padding--bottom">Open Source Robotics Challenges is a series of blogs...</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
