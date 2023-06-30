import {GVC} from "../GVController.js";

export class BackendPlugin{
    public static createPlugin(callback:(gvc:GVC)=>string,urlString:string){
        const url=new URL(urlString);
        (window as any).glitter.share.backendPlugins =  (window as any).glitter.share.backendPlugins ?? {};
        (window as any).glitter.share.backendPlugins[urlString]=(callback);
        (window as any).glitter.share.backeng_callback[url.searchParams.get("callback")!]()
    }
}