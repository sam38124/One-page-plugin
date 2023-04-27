export class ShareDialog {
    dataLoading = (obj) => {
    };
    errorMessage = (obj) => {
    };
    successMessage = (obj) => {
    };
    checkYesOrNot;
    policy;
    constructor(glitter) {
        this.dataLoading = (obj) => {
            if (obj.visible) {
                glitter.openDiaLog('dialog/dialog.js', 'dataLoading', { type: 'dataLoading', obj: obj });
            }
            else {
                glitter.closeDiaLog('dataLoading');
            }
        };
        this.errorMessage = (obj) => {
            glitter.openDiaLog('dialog/dialog.js', 'errorMessage', { type: 'errorMessage', obj: obj });
        };
        this.successMessage = (obj) => {
            glitter.openDiaLog('dialog/dialog.js', 'successMessage', { type: 'successMessage', obj: obj, callback: obj.callback }, {});
        };
        this.policy = () => {
            glitter.openDiaLog('dialog/dialog.js', 'policy', { type: 'policy' });
        };
        this.checkYesOrNot = (obj) => {
            glitter.openDiaLog('dialog/Dialog.js', 'checkYesOrNot', {
                type: 'checkYesOrNot', callback: (response) => {
                    glitter.closeDiaLog('checkYesOrNot');
                    obj.callback(response);
                }, title: obj.text
            });
        };
    }
}
