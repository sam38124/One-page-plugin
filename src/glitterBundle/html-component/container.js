import { widgetComponent } from "./widget.js";
export const containerComponent = {
    render: (gvc, widget, setting, hoverID, subData) => {
        widget.data.setting = widget.data.setting ?? [];
        widget.data.styleEd = widget.data.styleEd ?? {};
        const glitter = window.glitter;
        return {
            view: () => {
                return widgetComponent.render(gvc, widget, setting, hoverID, subData, {
                    widgetComponentID: gvc.glitter.getUUID()
                }).view();
            },
            editor: (() => {
                return widgetComponent.render(gvc, widget, setting, hoverID, subData, {
                    widgetComponentID: gvc.glitter.getUUID()
                }).editor();
            })
        };
    }
};
