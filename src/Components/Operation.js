import { useEffect, useState } from "react";
import Accordion from "./Accordion/Accordion"
function Operation(props) {
  const [scheme, setScheme] = useState([]);
  
  useEffect(() => {
    setScheme(props.scheme);
    
  }, [props]);

  return (
    <div className="operation">
      <select className="w-32 border-solid border-2 border-zinc-500 ">
        {scheme?.map((v, i) => (
          <option value={v} key={i}>{v}</option>
        ))}
      </select>
      <hr  />

      <div className="operations-wrapper">
          <Accordion tags={props?.tags} paths={props?.paths}/>
      </div>
    </div>
  );
}

export default Operation;
