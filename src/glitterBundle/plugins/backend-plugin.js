export class BackendPlugin {
    static createPlugin(callback, urlString) {
        const url = new URL(urlString);
        window.glitter.share.backendPlugins = window.glitter.share.backendPlugins ?? {};
        window.glitter.share.backendPlugins[urlString] = (callback);
        window.glitter.share.backeng_callback[url.searchParams.get("callback")]();
    }
}
