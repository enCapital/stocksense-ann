import * as React from "react";
import StocksenseAPIServices from "./StocksenseAPIServices";
import {Label} from "react-bootstrap";

interface IProps {
    html_content:string,
    title: string,
    content: string,
    doc_span: Array<number>
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

    render_new_line(s:string){
        return s.split('\n').map((elem:string)=>{return <p>{elem}</p>})
    }
    //TODO - need to highlight the current segment
    render_highlight(){
        let para1 = this.props.content.slice(0,this.props.doc_span[0])
        let highlight = this.props.content.slice(this.props.doc_span[0], this.props.doc_span[1])
        let para2 = this.props.content.slice(this.props.doc_span[1])
        return (
            <div>
               {this.render_new_line(para1)}
               <Label bsStyle="warning">{highlight} </Label>
               {this.render_new_line(para2)}
            </div>
        )
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
                    {this.render_new_line(this.props.content)}
                </div>
            );
        }
    }
}