import React from 'react';
import style from './head.module.css'

export default function HeadBar() {
    return <div>
        <div className={style.headBar}>
            <span className={style.title}>Sinking</span><span style={style.subtitle}>the Titanic story</span>
        </div>
        <WaveEffect/>
    </div>
}

/*The component for ocean wave effect.
Inspired by Codepen.io project by Jelena Jovanovic: https://codepen.io/plavookac/pen/QMwObb*/
function WaveEffect() {
    return <div className={`${style.waveWrapper} ${style.waveAnimation}`}>
        <div className={`${style.waveWrapperInner} ${style.bgTop}`}>
            <div className={`${style.wave} ${style.waveTop}`}/>
        </div>
        <div className={`${style.waveWrapperInner} ${style.bgMiddle}`}>
            <div className={`${style.wave} ${style.waveMiddle}`}/>
        </div>
        <div className={`${style.waveWrapperInner} ${style.bgBottom}`}>
            <div className={`${style.wave} ${style.waveBottom}`}/>
        </div>
    </div>
}