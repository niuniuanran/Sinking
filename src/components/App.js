import React, {useState} from 'react';
import HeadBar from "./head/HeadBar";
import Body from "./body/Body";

export default function App() {
    const [currentPanel, setCurrentPanel] = useState('people');
    return <div>
        <HeadBar onButtonSwitch={panel => setCurrentPanel(panel)}/>
        <Body currentPanel={currentPanel}/>
    </div>
};