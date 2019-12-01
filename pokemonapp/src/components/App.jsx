import React, { useState, useEffect } from "react";
import { Type } from "./Type";
import { Header } from "./Header";
import { Effectiveness } from "./Effectiveness";

const App = () => {
    const [types, setTypes] = useState({ set: false });
    const [language, setLanguage] = useState("de");
    const [typeToggle, setTypeToggle] = useState(0);
    const [firType, setFirType] = useState("");
    const [secType, setSecType] = useState("");

    //#region pokeapi Stuff
    const doTheFetch = () => {
        setTypes({ set: false });

        fetch("https://pokeapi.co/api/v2/type/")
            .then(response => response.json())
            .then(json => getTypeInfo(json))
            .catch(err => console.error(err));
    };

    const getTypeInfo = pokeApiJSON => {
        const typeObject = {};
        const all = [];
        pokeApiJSON.results.forEach(elt => {
            all.push(
                fetch(elt.url)
                    .then(response => response.json())
                    .then(
                        json =>
                            (typeObject[elt.name] = {
                                name: elt.name,
                                url: elt.url,
                                damage_relations: json.damage_relations,
                                names: json.names
                            })
                    )
            );
        });
        Promise.all(all).then(() => {
            console.log(typeObject);
            delete typeObject["shadow"];
            delete typeObject["unknown"];
            setTypes(typeObject);
        });
    };

    //#endregion

    //run doTheFetch on Load
    useEffect(() => {
        doTheFetch();
    }, []);

    const toggleType = (name) => {
        if (typeToggle % 2 === 0) {
            setFirType(name);
        } else {
            setSecType(name);
        }
        setTypeToggle(typeToggle + 1 % 2);
    }

    return (
        <div className="App">
            <Header language={language} />
            <button onClick={() => doTheFetch()}>Do the Fetching</button>
            <div className="TypeSelection">
                {types.set !== false ? (
                    Object.getOwnPropertyNames(types).sort().map(elt => (
                        <Type
                            type={elt}
                            //name={types[elt].names.find(elt => elt.language.name === language).name}
                            img={null}
                            active={firType === elt || secType === elt}
                            toggle={toggleType}
                        />
                    ))
                ) : (
                        <h1>"Loading"</h1>
                    )}
            </div>
            <Effectiveness type1={types[firType]} type2={types[secType]} allTypes={Object.getOwnPropertyNames(types)} />
        </div>
    );
};

export default App;
