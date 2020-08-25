import React, {useEffect, useState} from 'react';
import style from './body.module.css'
import CircularProgress from "@material-ui/core/CircularProgress";

import PeopleTable from "./PeopleTable";
import Stats from "./Stats";

export default function Body({currentPanel}) {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000")
            .then(res => res.json())
            .then(json => {
                setPeople(json.records
                    .filter(p => p.fields.fare && p.fields.fare > 0));
                setLoading(false);
            });
    }, []);

    return <div className={style.body}>
        {loading && <CircularProgress className={style.loading}/>}
        {!loading && currentPanel === 'people' && <PeopleTable peopleRecord={people}/>}
        {!loading && currentPanel === 'stats' && <Stats peopleRecord={people}/>}
    </div>
}