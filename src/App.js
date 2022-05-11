import { useEffect, useState } from 'react';
import './App.css';
import Info from './header/Info';
import Operation from './Components/Operation'

function App() {

  const [apiRes, setApiRes] = useState("");

  async function getResponse(){
    await fetch("https://petstore.swagger.io/v2/swagger.json")
   .then(response=>{return response.json()})
   .then((responseData)=>{
    setApiRes(responseData);
   })
 }
 useEffect(()=>{ getResponse();},[])

  return (
    <div className="App">
      <Info infoData={apiRes.info}/>
      <Operation scheme={apiRes.schemes} tags={apiRes.tags} paths={apiRes.paths}/>
    </div>
  );
}

export default App;
