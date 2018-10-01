import * as React from "react";
import StocksenseAPIServices from "./StocksenseAPIServices"

interface IProps {
    name?:string
}

interface Tag{
    symbol:string,
    source:string,
    time:object,
    segment: string, 
    doc_span: Array<number>,
    seg_span: Array<number>
}
interface AnnotateData{
    articleID:string,
    articleTime: object,
    attachedLinks: Array<any>,
    base_url: string,
    content: string,
    intro: string,
    link: string,
    originalHTMLContent: string, 
    preview_image_url: string, 
    scrapedTime: object, 
    tags: Array<Tag>,
    title: string    
}

interface IState{
    stocksenseAPI: StocksenseAPIServices,
    data?: any,
    json_data?: any   
}
export default class Article extends React.Component<IProps, IState> {
    props:IProps= {
        name: ""
    }
    
    state:IState ={
        stocksenseAPI: new StocksenseAPIServices("http://stocksense-api.azurewebsites.net"),
        data: ""
    };
    componentWillMount() {
        console.log(this.state.data)
    }
    componentDidMount() {
        console.log(this + " Did mount ")
    }

    async giangOnClick (event:any) {
        try{
            event.persist()
            let a = await this.state.stocksenseAPI.getAnnotate()
            this.setState({data: a})
        } catch(e)
        {
            console.log(e)
        }
    }
    
    render() {
        return (
            <div>
                <button name="GetArticle" onClick={this.giangOnClick.bind(this)}>Get Article</button>
                <br />
                <p>
                    <h2>{this.state.data.title} </h2>
                </p>
                <div dangerouslySetInnerHTML={{__html: this.state.data.originalHTMLContent}} />
            </div>
        );
    }
}