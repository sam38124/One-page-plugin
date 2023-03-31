export class Tool {
    public waitLoadModule: (name: string, event: () => void, timeout?: number, msg?: boolean) => void;
    constructor() {
        this.waitLoadModule = (name: string, event: () => void, timeout?: number, msg?: boolean) => {
            let t = timeout && timeout > 500 ? timeout : 500;
            (window as any).siArray === undefined && ((window as any).siArray = []);
            const n = (window as any).siArray.length;

            (window as any).siArray.push({
                n: n,
                e: setInterval(() => {
                    if ((window as any)[name]) {
                        event();
                        msg && console.log(`${name} load finish`);
                        clearInterval((window as any).siArray[n].e);
                    } else {
                        msg && console.log(`Waiting for ${name}...`);
                    }
                }, t),
            });
        };
    }
}
