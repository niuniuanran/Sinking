import React, {useState} from 'react';
import style from './head.module.css'
import Grid from "@material-ui/core/Grid";
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from "@material-ui/core/IconButton";

export default function HeadBar({onButtonSwitch: onPanelSwitch}) {
    const [onPeoplePanel, setOnPeoplePanel] = useState(true);
    return <div>
        <div className={style.headBar}>
            <Grid container>
                <Grid className={style.titles} item sm={12} md={6}>
                    <span className={style.title}>Sinking</span>
                    <span className={style.subtitle}>the Titanic story</span>
                </Grid>
                <Grid item sm={12} md={6} container spacing={10} className={style.buttons}>
                    <Grid item xs={6}>
                        <IconButton size={"medium"} className={`${style.headButton} ${onPeoplePanel && style.activeIcon}`}
                                    onClick={() => {
                                        setOnPeoplePanel(() => true);
                                        onPanelSwitch('people')
                                    }}
                                    title={"See people on Titanic"}>
                            <PeopleIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton size={'medium'} className={`${style.headButton} ${!onPeoplePanel && style.activeIcon}`}
                                    onClick={() => {
                                        setOnPeoplePanel(() => false);
                                        onPanelSwitch('stats')
                                    }}
                                    title={"View Titanic statistics"}>
                            <EqualizerRoundedIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
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