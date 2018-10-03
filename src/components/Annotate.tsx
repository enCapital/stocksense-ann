import * as React from "react"
import { isNullOrUndefined, isNull } from "util";

interface IProps{
    appAction: Function, 
    segment: string,
    symbol: string,
}
interface IState{
    tag?: any
}
export default class Annotate extends React.Component<IProps,IState>{
    constructor(props:IProps){
        super(props)        
    }
    render(){
        if ( this.props === undefined)
        {
            console.log('annotate loading..')
            return(
                <div>Loading... </div>
            )
        }
        else
        {
            return(
                <div>

                    <span>{this.props.symbol} </span>
                    <br />
                    <span>{this.props.segment}</span>
                    <br />
                    <span>
                        <button onClick = {event => this.props.appAction(event)}>YES</button>
                        <button  >NO</button>
                    </span>
                    <br />
                    
                </div>
            );
        }
    }
}