import fetch from "node-fetch"

export default class StocksenseAPIServices {
    private _url:string
    constructor(url: string){
        this._url = url
    }
    public async getAnnotate():Promise<any> {
       const data = await fetch(this._url + '/annotate')
       return data.json()
    }
}
