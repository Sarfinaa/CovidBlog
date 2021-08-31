import React from 'react'
import './InfoBox.css'
import { Card,CardContent,Typography } from "@material-ui/core";
function InfoBox({title,cases,isRed,isGreen,isGrey,active,darkMode,total,...props}) {
    return (
        <Card onClick={props.onClick}  elevation={0} 
        className={`${darkMode?'infoBox--ondark':'infoBox--offdark'}  ${active&&!darkMode? (isRed&&'redselect')||(isGreen&&'greenselect')||(isGrey&&'greyselect'):''}
        ${active&&darkMode? (isRed&&'redselect-dark')||(isGreen&&'greenselect-dark')||(isGrey&&'greyselect-dark'):''} 
         ${!darkMode?((isRed && 'infoBox--red-off')|| (isGreen&&'infoBox--green-off')|| (isGrey&&'infoBox--grey-off')):(
            (isRed && 'infoBox--red-on')|| (isGreen&&'infoBox--green-on')|| (isGrey&&'infoBox--grey-on')
         )} `}> 
           <CardContent>
               <Typography className="infoBox__tile" className={`${(isRed && 'infoBox--red')|| (isGreen&&'infoBox--green')|| (isGrey&&'infoBox--grey')}`}>
                      {title}
               </Typography>
               <h2 className={`infoBox__cases ${isRed && "infoBox__cases--red"||isGreen&&"infoBox__cases--green"||isGrey&&'infoBox__cases--grey'}`}>{cases}</h2>
               <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
               </CardContent> 
        </Card>
    )
}

export default InfoBox
