import * as React from "react";
import StocksenseAPIServices from "./StocksenseAPIServices"
import Article from "./Article"
import Annotate from "./Annotate"
import { isNullOrUndefined } from "util";

interface IAppState {
    stocksenseAPI: StocksenseAPIServices,
    data: any,
    index: number
}
export default class App extends React.Component<any,IAppState>{
    constructor(props:any){
        super (props);
        this.state = {stocksenseAPI:new StocksenseAPIServices("http://localhost:8000"), data: undefined, index:0}
        this.state.stocksenseAPI.getAnnotate().then((firstLoadData)=>{
                this.setState({data: firstLoadData})   
                console.log(this.state)
            }
        );
             
    }
    async ClickYes (event:any) {
        try{
            if(this.state.index < this.state.data.tags.length -1 )
            {
                this.setState({index:this.state.index+1})
            }else
            {
                event.persist()
                let a = await this.state.stocksenseAPI.getAnnotate()
                this.setState({data: a, index: 0})
            }
        } catch(e)
        {
            console.log(e)
        }
    }
    async nextTag(){
        try{
            if(this.state.index < this.state.data.tags.length -1 )
            {
                this.setState({index:this.state.index+1})
            }else
            {
                let a = await this.state.stocksenseAPI.getAnnotate()
                this.setState({data: a, index: 0})
            }
        } catch(e)
        {
            console.log(e)
        }
    }
    render() {
        if (this.state.data === undefined)
        {                
            console.log("Hello this is undefined")
            return (
                <div>Loading... </div> 
            );

        }else
        {   
            return (
                <div>
                    <div className="annotate px4">
                        <Annotate appAction={this.ClickYes.bind(this)} nextTag = {this.nextTag.bind(this)}
                            segment={this.state.data.tags[this.state.index].segment ? this.state.data.tags[this.state.index].segment:"No segment to load"} 
                            symbol={this.state.data.tags[this.state.index].symbol} 
                            seg_span={this.state.data.tags[this.state.index].seg_span ? this.state.data.tags[this.state.index].seg_span:[0,0]} />
                    </div>
                    <div className="article px4">
                        <Article title={this.state.data.title}
                            html_content={this.state.data.originalHTMLContent} 
                            content={this.state.data.content}
                            doc_span={this.state.data.tags[this.state.index].doc_span? this.state.data.tags[this.state.index].doc_span:[0,0]}
                            />                
                    </div>

                </div>
            );
        }
    }
}