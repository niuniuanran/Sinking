import React from 'react';
import style from './head.module.css'
import Grid from "@material-ui/core/Grid";
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from "@material-ui/core/IconButton";

export default function HeadBar() {
    return <div>
        <div className={style.headBar}>
            <Grid container>
                <Grid className={style.titles} item xs={12} sm={6}>
                    <span className={style.title}>Sinking</span>
                    <span className={style.subtitle}>the Titanic story</span>
                </Grid>
                <Grid item xs={12} sm={6} container spacing={5} className={style.buttons}>
                    <Grid item xs={6}>
                        <IconButton size={"medium"} className={`${style.headButton} ${style.peopleButton}`}>
                            <PeopleIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton size={'medium'} className={style.headButton}>
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