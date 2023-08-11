import './App.css';
// import 'vanilla-framework/scss/_vanilla.scss'; // For Vanilla Framework

import Card from '@canonical/react-components/dist/components/Card/Card';
import Strip from '@canonical/react-components/dist/components/Strip/Strip';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="row">
          <div class="col-5">
            <Card className="card" title="CLOUD AND SERVER" highlighted>
              <hr class="u-sv1"></hr>
              <img class="p-card__image" src="https://assets.ubuntu.com/v1/0f33d832-The-State-of-Robotics.jpg"/>
              <div class="p-card__inner">
                <h3 style={{fontSize: "1.4em"}}>Ubuntu at KubeCon & CloudNativeCon</h3>
                <i style={{fontSize: "0.75em"}}>By <a href='#'>Canonical</a> on 26 November 2018</i>
              </div>
              <hr class="u" />
              <div class="p-card__inner">
                <a href="#">Article</a>
              </div>
            </Card>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
