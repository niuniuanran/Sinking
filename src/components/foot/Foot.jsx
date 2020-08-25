import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import style from './foot.module.css'
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

export default function Foot() {
    return <div className={style.foot}>
        <Typography variant={"caption"} style={{marginRight: "0.5rem"}}> Connect with Anran </Typography>
        <IconButton href={"https://github.com/niuniuanran"} target="_blank" size={'small'} className={style.socialButton} style={{marginRight: "0.5rem"}}><GitHubIcon/></IconButton>
        <IconButton href={"https://www.linkedin.com/in/anran-niu/"} target="_blank" size={'small'} className={style.socialButton}>
            <LinkedInIcon/> </IconButton>
    </div>
}