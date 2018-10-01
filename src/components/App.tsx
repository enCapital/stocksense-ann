import * as React from "react";
import StocksenseAPIServices from "./StocksenseAPIServices"
import Article from "./Article"

export default class App extends React.Component{
    render() {
        return (
            <div>
                <Article />
            </div>
        );
    }
}
