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
    async giangOnClick (event:any) {
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
    render() {
        if (this.state.data === undefined)
        {                
            console.log("Hello this is undefined")
            return (
                <div>Loading </div> 
            );

        }else
        {   
            console.log("state is defined" )
            console.log(this.state.data)
            return (
                <div>
                    <div className="Annotate">
                        <Annotate appAction={this.giangOnClick.bind(this)} segment={this.state.data.tags[this.state.index].segment ? this.state.data.tags[this.state.index].segment:"No segment to load"} symbol={this.state.data.tags[this.state.index].symbol} />
                    </div>
                    <div className="Article">  
                        <Article title={this.state.data.title} html_content={this.state.data.originalHTMLContent} />
                    </div>
                    <div>
                        <p>
                            {this.state.data.content}
                        </p>
                    </div>
                </div>
            );
        }
    }
}