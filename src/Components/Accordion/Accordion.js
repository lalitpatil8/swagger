import { useEffect, useState } from "react";
import "./Accordion.css";
import Paths from "../Paths";
export default function Accordion(props) {
  const [tag, setTag] = useState([]);
  const [tagSelected, setTagSelected] = useState(null);

  useEffect(() => {
    setTag(props.tags);
  }, [props]);

  const tagToggle = (i) => {
    if (tagSelected === i) {
      return setTagSelected(null);
    }
    setTagSelected(i);
  };

  return (
    <div className="accordion-wrapper">
      <div className="accordion">
        {tag?.map((t, i) => (
          <div className="item" key={i}>
            <div
              className="flex py-2 text-black border-b-2"
              onClick={() => tagToggle(i)}
            >
              <h2 className="font-bold text-2xl">
                {t.name} &nbsp;
                <small className="font-normal text-base">{t.description}</small>
              </h2>
              <a href={t?.externalDocs?.url} target="_blank" rel="noreferrer">
                {t?.externalDocs?.description} 
              </a>
              <span>{tagSelected === i ? "-" : "+"}</span>
            </div>
            <div
              className={tagSelected === i ? "content show" : "content hide"}
            >
              <Paths tagName={t} path={props?.paths} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
