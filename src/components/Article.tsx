import * as React from "react";
import StocksenseAPIServices from "./StocksenseAPIServices"
import { isNullOrUndefined } from "util";

interface IProps {
    html_content:string,
    title: string
}

interface IState{
    stocksenseAPI: StocksenseAPIServices,
    data?: any,
    json_data?: any   
}
export default class Article extends React.Component<IProps, IState> {
    constructor(props:IProps){
        super(props)
    }
    render() {
        if (this.props === undefined)
        {
            console.log('Article no data');
            return (
                <div>article Loading...</div>
            );
        }else
        {
            return (
                <div>
                    <p>
                        <h2>{this.props.title} </h2>
                    </p>
                    <div dangerouslySetInnerHTML={{__html: this.props.html_content}} />
                </div>
            );
        }
    }
}