import { ShareDialog } from './dialog/ShareDialog.js';
export class Editor {
    static uploadImage(obj) {
        const glitter = window.glitter;
        const $ = glitter.$;
        return `<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">${obj.title}</h3>
                            <div class="d-flex align-items-center mb-3">
                                <input class="flex-fill form-control " placeholder="請輸入圖片連結" value="${obj.def}" onchange="${obj.gvc.event((e) => {
            obj.callback(e.value);
        })}">
                                <div class="" style="width: 1px;height: 25px;background-color: white;"></div>
                                <i class="fa-regular fa-upload text-white ms-2" style="cursor: pointer;" onclick="${obj.gvc.event(() => {
            glitter.ut.chooseMediaCallback({
                single: true,
                accept: 'json,image/*',
                callback(data) {
                    const saasConfig = window.saasConfig;
                    const dialog = new ShareDialog(obj.gvc.glitter);
                    dialog.dataLoading({ visible: true });
                    const file = data[0].file;
                    saasConfig.api.uploadFile(file.name).then((data) => {
                        dialog.dataLoading({ visible: false });
                        const data1 = data.response;
                        dialog.dataLoading({ visible: true });
                        $.ajax({
                            url: data1.url,
                            type: 'put',
                            data: file,
                            processData: false,
                            crossDomain: true,
                            success: () => {
                                dialog.dataLoading({ visible: false });
                                obj.callback(data1.fullUrl);
                            },
                            error: () => {
                                dialog.dataLoading({ visible: false });
                                dialog.errorMessage({ text: '上傳失敗' });
                            },
                        });
                    });
                },
            });
        })}"></i>
                            </div>`;
    }
    static uploadLottie(obj) {
        const glitter = window.glitter;
        const $ = glitter.$;
        return `<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">${obj.title}</h3>
<div class="alert alert-dark alert-dismissible fade show" role="alert" style="white-space: normal;word-break: break-word;">
<a onclick="${obj.gvc.event(() => {
            glitter.openNewTab(`https://lottiefiles.com/`);
        })}" class=" fw text-white" style="cursor: pointer;">Lottie</a>
  是開放且免費的動畫平台，可以前往下載動畫檔後進行上傳．
</div>
                            <div class="d-flex align-items-center mb-3">
                                <input class="flex-fill form-control " placeholder="請輸入圖片連結" value="${obj.def}" onchange="${obj.gvc.event((e) => {
            obj.callback(e.value);
        })}">
                                <div class="" style="width: 1px;height: 25px;background-color: white;"></div>
                                <i class="fa-regular fa-upload text-white ms-2" style="cursor: pointer;" onclick="${obj.gvc.event(() => {
            glitter.ut.chooseMediaCallback({
                single: true,
                accept: 'json,image/*,.json',
                callback(data) {
                    const saasConfig = window.saasConfig;
                    const dialog = new ShareDialog(obj.gvc.glitter);
                    dialog.dataLoading({ visible: true });
                    const file = data[0].file;
                    saasConfig.api.uploadFile(file.name).then((data) => {
                        dialog.dataLoading({ visible: false });
                        const data1 = data.response;
                        dialog.dataLoading({ visible: true });
                        $.ajax({
                            url: data1.url,
                            type: 'put',
                            data: file,
                            processData: false,
                            crossDomain: true,
                            success: () => {
                                dialog.dataLoading({ visible: false });
                                obj.callback(data1.fullUrl);
                            },
                            error: () => {
                                dialog.dataLoading({ visible: false });
                                dialog.errorMessage({ text: '上傳失敗' });
                            },
                        });
                    });
                },
            });
        })}"></i>
                            </div>`;
    }
    static h3(title) {
        return `<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">${title}</h3>`;
    }
    static plusBtn(title, event) {
        return `<div class="w-100 my-3" style="background: white;height: 1px;"></div>
<div class="text-white align-items-center justify-content-center d-flex p-1 rounded mt-3" style="border: 2px dashed white;" onclick="${event}">${title}</div>`;
    }
    static fontawesome(obj) {
        const glitter = window.glitter;
        return (`
${Editor.h3(obj.title)}
        <div class="alert alert-dark alert-dismissible fade show p-2" role="alert" style="white-space: normal;word-break: break-all;">
<a onclick="${obj.gvc.event(() => {
            glitter.openNewTab('https://fontawesome.com/search');
        })}" class=" fw text-white" style="cursor: pointer;">fontawesome</a> 與 <a onclick="${obj.gvc.event(() => {
            glitter.openNewTab('https://boxicons.com/');
        })}" class=" fw text-white" style="cursor: pointer;">box-icon</a> 是開放且免費的icon提供平台，可以前往挑選合適標籤進行設定.
</div>
        ` +
            glitter.htmlGenerate.editeInput({
                gvc: obj.gvc,
                title: '',
                default: obj.def,
                placeHolder: '請輸入ICON-標籤',
                callback: (text) => {
                    obj.callback(text);
                },
            }));
    }
    static toggleExpand(obj) {
        const color = obj.color ?? `#4144b0;`;
        const glitter = window.glitter;
        return `${obj.gvc.bindView(() => {
            const id = glitter.getUUID();
            return {
                bind: id,
                view: () => {
                    if (obj.data.expand) {
                        return `<div class="w-100  rounded p-2 "  style="background: ${color}; ">
<div class="d-flex p-0 align-items-center mb-2 w-100"  onclick="${obj.gvc.event(() => {
                            obj.data.expand = !obj.data.expand;
                            obj.gvc.notifyDataChange(id);
                        })}"  style="cursor: pointer;"><h3 style="font-size: 16px;color: lightpink;width: calc(100% - 60px);" class="m-0 p-0">${obj.title}</h3>
<div class="flex-fill"></div>
<div style="cursor: pointer;">收合<i class="fa-solid fa-up ms-2 text-white" ></i></div>
</div>
${obj.innerText}</div>`;
                    }
                    else {
                    }
                    return `<div class="w-100  rounded p-2 " style="background-color: ${color};">
<div class="w-100 d-flex p-0 align-items-center" onclick="${obj.gvc.event(() => {
                        obj.data.expand = !obj.data.expand;
                        obj.gvc.notifyDataChange(id);
                    })}" style="cursor: pointer;"><h3 style="font-size: 16px;color: lightpink;width: calc(100% - 60px);" class="m-0 p-0">${obj.title}</h3>
<div class="flex-fill"></div>
<div style="cursor: pointer;">展開<i class="fa-solid fa-down ms-2 text-white"></i></div>
</div>
</div>`;
                },
                divCreate: {},
            };
        })}`;
    }
    static minusTitle(title, event) {
        return `<div class="d-flex align-items-center">
<i class="fa-regular fa-circle-minus text-danger me-2" style="font-size: 20px;cursor: pointer;" onclick="${event}"></i>
<h3 style="color: white;font-size: 16px;" class="m-0">${title}</h3>
</div>`;
    }
    static searchInput(obj) {
        const glitter = window.glitter;
        const gvc = obj.gvc;
        const $ = glitter.$;
        return `
${Editor.h3(obj.title)}
<div class="btn-group dropdown w-100">
  ${(() => {
            const id = glitter.getUUID();
            const id2 = glitter.getUUID();
            return `
${obj.gvc.bindView(() => {
                return {
                    bind: id2,
                    view: () => {
                        return `<input class="form-control w-100" style="height: 40px;" placeholder="${obj.placeHolder}" onfocus="${obj.gvc.event(() => {
                            $('#' + obj.gvc.id(id)).addClass(`show`);
                        })}" onblur="${gvc.event(() => {
                            setTimeout(() => {
                                $('#' + gvc.id(id)).removeClass(`show`);
                            }, 300);
                        })}" oninput="${gvc.event((e) => {
                            obj.def = e.value;
                            gvc.notifyDataChange(id);
                        })}" value="${obj.def}" onchange="${gvc.event((e) => {
                            obj.def = e.value;
                            setTimeout(() => {
                                obj.callback(obj.def);
                            }, 100);
                        })}" >`;
                    },
                    divCreate: { class: `w-100` },
                };
            })}
${obj.gvc.bindView(() => {
                return {
                    bind: id,
                    view: () => {
                        return obj.array
                            .filter((d2) => {
                            return d2.toUpperCase().indexOf(obj.def.toUpperCase()) !== -1;
                        })
                            .map((d3) => {
                            return `<button  class="dropdown-item" onclick="${gvc.event(() => {
                                obj.def = d3;
                                obj.callback(obj.def);
                            })}">${d3}</button>`;
                        })
                            .join('');
                    },
                    divCreate: {
                        class: `dropdown-menu`,
                        style: `transform: translateY(40px);`,
                    },
                };
            })}                                 
                                            `;
        })()}
</div>       
`;
    }
    static select(obj) {
        const glitter = window.glitter;
        const gvc = obj.gvc;
        return `
${Editor.h3(obj.title)}
<select class="form-select" onchange="${obj.gvc.event((e) => {
            obj.callback(e.value);
        })}">
${obj.array
            .map((dd) => {
            if (typeof dd === 'object') {
                return `<option value="${dd.value}" ${dd.value === obj.def ? `selected` : ``}>${dd.title}</option>`;
            }
            else {
                return `<option value="${dd}" ${dd === obj.def ? `selected` : ``}>${dd}</option>`;
            }
        })
            .join('')}
</select>    
`;
    }
    static arrayItem(obj) {
        return (`<div class="mb-2"></div>` +
            Editor.toggleExpand({
                gvc: obj.gvc,
                title: obj.title,
                data: obj.expand,
                innerText: obj.array
                    .map((dd) => {
                    return Editor.toggleExpand({
                        gvc: obj.gvc,
                        title: Editor.minusTitle(dd.title, dd.minus),
                        data: dd.expand,
                        innerText: dd.innerHtml,
                        color: `#004081`,
                    });
                })
                    .join('<div class="my-2"></div>') + Editor.plusBtn(obj.plus.title, obj.plus.event),
                color: `#0062c0`,
            }));
    }
}
