import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import { action, orginals,Horror,comedies,Romance,Trending} from './Constants/Constant';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <RowPost url={orginals} title='Netflix Orginals' />
      <RowPost  url = {action} title='Action' isSmall/>
      <RowPost url={Horror} title="Horror"isSmall/>
      <RowPost url={comedies} title="Comedies" isSmall/>
      <RowPost url={Romance} title="Romance" isSmall/>
      <RowPost url={Trending} title="Trending" isSmall/>


    </div>
  );
}

export default App;
