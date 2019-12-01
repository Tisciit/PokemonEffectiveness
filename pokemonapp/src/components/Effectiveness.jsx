import React, { useState, useEffect } from "react";
import { Type } from "./Type";

export const Effectiveness = (props) => {

    const { type1, type2, allTypes } = props;

    const [immunity, setImmunity] = useState([]);
    const [quarter, setQuarter] = useState([]);
    const [half, setHalf] = useState([]);
    const [normal, setNormal] = useState([]);
    const [double, setDouble] = useState([]);
    const [quad, setQuad] = useState([]);

    useEffect(() => {
        console.log(type1);
        console.log(type2);

        //set effectiveness for all types to 1
        const eff = {};
        allTypes.forEach(elt => {
            eff[elt] = 1;
        });

        /*
            immunity: *= 0
            half_dam: *=.5
            doub_dam: *= 2
        */
        const calcType = (type) => {
            const dr = type.damage_relations;
            dr.no_damage_from.forEach(elt => {
                eff[elt.name] *= 0;
            });
            dr.half_damage_from.forEach(elt => {
                eff[elt.name] *= .5;
            });
            dr.double_damage_from.forEach(elt => {
                eff[elt.name] *= 2;
            });
        }

        type1 && calcType(type1);
        type2 && calcType(type2);

        const imm = [], quar = [], ha = [], no = [], doub = [], quad = [];

        Object.getOwnPropertyNames(eff).forEach(elt => {
            switch (eff[elt]) {
                case 0:
                    imm.push(elt);
                    break;
                case .25:
                    quar.push(elt);
                    break;
                case .5:
                    ha.push(elt);
                    break;
                case 1:
                    no.push(elt);
                    break;
                case 2:
                    doub.push(elt);
                    break;
                case 4:
                    quad.push(elt);
                    break;
            }
        });
        setImmunity(imm);
        setQuarter(quar);
        setHalf(ha);
        setNormal(no);
        setDouble(doub);
        setQuad(quad);
    }, [type1, type2]);

    return (
        <div className="Effectiveness">
            <h1>No Dam</h1>
            <div className="NoDamage">
                {immunity.map(elt => <Type type={elt} />)}
            </div>
            <h1>1/4 Dam</h1>
            <div className="QuarterDamage">
                {quarter.map(elt => <Type type={elt} />)}
            </div>
            <h1>1/2 Dam</h1>
            <div className="HalfDamage">
                {half.map(elt => <Type type={elt} />)}
            </div>
            <h1>Normal Dam</h1>
            <div className="NormalDamage">
                {normal.map(elt => <Type type={elt} />)}
            </div>
            <h1>x2 Dam</h1>
            <div className="DoubleDamage">
                {double.map(elt => <Type type={elt} />)}
            </div>
            <h1>x4 Dam</h1>
            <div className="QuadrupleDamage">
                {quad.map(elt => <Type type={elt} />)}
            </div>
        </div>
    );
}