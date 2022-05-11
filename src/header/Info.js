import React, { useEffect, useState } from "react";
import GLOBALCONSTANT from "../constant/GLOBALCONSTANT"

function Info(props) {
    const [description, setDescription] = useState("");
    const [info, setInfo] = useState("");
    let parse = new DOMParser();
    
    const modifyResponse = (description) => {
        let tagText = parse.parseFromString(description.replace(GLOBALCONSTANT.GET_URL,
            function (url) {
                return "<a href='" + url + "' >" + url + "</a>";
            }),
            "text/html").body
            .innerHTML;

            setDescription(tagText.replace(GLOBALCONSTANT.GET_TEXT, function (text) {
                return "<span class='text-purple-700 bg-slate-300'>" + text + "</span>";
            }));
    }

    useEffect(() => {
        if (props.infoData) {
            setInfo(props?.infoData);
            
            modifyResponse(props.infoData.description);
        }
    }, [props?.infoData]);

    return <div className="Info">
        <h1 className="text-4xl mb-5 font-bold">{info.title}&nbsp;
        <small><sup className="text-white bg-zinc-500 rounded-lg">
            {info.version}</sup></small></h1>
        <div dangerouslySetInnerHTML={{__html:description}}></div>
        <div className="LinkSection mt-5">
            <p><a href={info.contact?.email}>{GLOBALCONSTANT.CONTACT}</a></p>
            <p><a href={info.license?.url}>{info.license?.name}</a></p>
            <p><a href={info?.termsOfService}>{GLOBALCONSTANT.TERMS}</a></p>
        </div>
    </div>;
}

export default Info;
