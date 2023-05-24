import { widgetComponent } from "./widget.js";
export const containerComponent = {
    render: (gvc, widget, setting, hoverID, subData) => {
        widget.data.setting = widget.data.setting ?? [];
        widget.data.styleEd = widget.data.styleEd ?? {};
        const glitter = window.glitter;
        const htmlGenerate = new glitter.htmlGenerate(widget.data.setting, hoverID);
        return {
            view: () => {
                return widgetComponent.render(gvc, widget, setting, hoverID, subData).view();
            },
            editor: (() => {
                return widgetComponent.render(gvc, widget, setting, hoverID, subData).editor();
            })
        };
    }
};
