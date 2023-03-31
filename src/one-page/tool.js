export class Tool {
    constructor() {
        this.waitLoadModule = (name, event, timeout, msg) => {
            let t = timeout && timeout > 500 ? timeout : 500;
            window.siArray === undefined && (window.siArray = []);
            const n = window.siArray.length;
            window.siArray.push({
                n: n,
                e: setInterval(() => {
                    if (window[name]) {
                        event();
                        msg && console.log(`${name} load finish`);
                        clearInterval(window.siArray[n].e);
                    }
                    else {
                        msg && console.log(`Waiting for ${name}...`);
                    }
                }, t),
            });
        };
    }
}
