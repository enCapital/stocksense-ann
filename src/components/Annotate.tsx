import * as React from "react"
import { Button, Alert, Label } from 'react-bootstrap';

interface IProps{
    appAction: Function, 
    segment: string,
    symbol: string,
    seg_span: Array<number>,
    nextTag: Function
}
interface IState{
    tag?: any
}
export default class Annotate extends React.Component<IProps,IState>{
    constructor(props:IProps){
        super(props)        
    }
    render_choice()
    {
        if(this.props.segment === "No segment to load")
        {
            this.props.nextTag()
            return (<div>Loading next tag...</div>);
        }
        else
        {
            return (
                <div>
                    <p> Is this a stock symbol?</p>
                    <p>
                        <Button bsStyle="success" onClick = {event => this.props.appAction(event)}> YES </Button>
                    
                        <Button bsStyle="danger" > NO </Button>

                        <Button bsStyle="default" > Hủy </Button>
                    </p>
                </div>
            );
        }
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
                    <Alert bsStyle="info">
                        <div className="segment mx4">
                            <h3>{this.props.symbol} </h3> 
                            <p>
                                {this.props.segment.slice(0,this.props.seg_span[0])}
                                <Label bsStyle="warning">{this.props.segment.slice(this.props.seg_span[0],this.props.seg_span[1])}</Label>
                                {this.props.segment.slice(this.props.seg_span[1])}
                            </p>
                        </div>
                        <div className="button mx4 mx-auto">
                            {this.render_choice()}
                        </div>
                    <br />
                    </Alert>
                </div>
            );
        }
    }
}