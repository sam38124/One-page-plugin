import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
const a = TriggerEvent.createSingleEvent('', (glitter) => {
    return {
        fun: (gvc, widget, object, subData, element) => {
            glitter.runJsInterFace("close", {}, () => {
            });
            (() => {
                let text = `I'm not quite sure what you're trying to express.`;
                function rec() {
                    gvc.getBundle().config.find((dd) => {
                        return dd.hashTag === 'chatContainer';
                    }).data.setting.push({
                        "id": "s6s3s0s6scsascs4-ses1sas2-4sbs4se-s9s2sesa-s3sbsasds5sas4s2scs5s9s5",
                        "js": "$style1/official.js",
                        "css": { "class": {}, "style": {} },
                        "data": {
                            "attr": [],
                            "elem": "div",
                            "class": "d-flex",
                            "inner": "",
                            "setting": [{
                                    "id": gvc.glitter.getUUID(),
                                    "js": "$style1/official.js",
                                    "css": { "class": {}, "style": {} },
                                    "data": {
                                        "attr": [],
                                        "elem": "img",
                                        "inner": "https://liondesign-prd.s3.amazonaws.com/file/guest/1685110426385-homeeai.svg",
                                        "dataFrom": "static",
                                        "atrExpand": { "expand": false },
                                        "elemExpand": { "expand": true },
                                        "innerEvenet": {}
                                    },
                                    "type": "widget",
                                    "label": "HTML元件",
                                    "refreshAllParameter": {},
                                    "refreshComponentParameter": {}
                                }, {
                                    "id": gvc.glitter.getUUID(),
                                    "js": "$style1/official.js",
                                    "css": { "class": {}, "style": {} },
                                    "data": {
                                        "attr": [],
                                        "elem": "h3",
                                        "class": "ms-2 mt-2",
                                        "inner": text,
                                        "style": "display: flex;\nflex-direction: row;\nalign-items: flex-start;\npadding: 8px 12px;\nfont-family: 'Noto Sans TC';\nfont-style: normal;\nfont-weight: 400;\nfont-size: 14px;\nline-height: 150%;\n\nbackground: #F6F6F6;\nborder-radius: 16px;max-width:75%;",
                                        "dataFrom": "static",
                                        "atrExpand": { "expand": false },
                                        "styleList": [],
                                        "elemExpand": { "expand": true },
                                        "innerEvenet": {}
                                    },
                                    "type": "widget",
                                    "label": "HTML元件",
                                    "refreshAllParameter": {},
                                    "refreshComponentParameter": {}
                                }],
                            "atrExpand": { "expand": false },
                            "styleList": [],
                            "elemExpand": { "expand": true }
                        },
                        "type": "container",
                        "label": "機器人聊天"
                    });
                    gvc.recreateView();
                    setTimeout(() => {
                        var element = document.getElementsByClassName('glitterTagchatContainer');
                        window.scrollTo(0, element[0].clientHeight + 200);
                    }, 100);
                }
                const mapF = {
                    arrange: (type) => {
                        const table = (type == 'classic') ? `table-2` : `table-1`;
                        const chair = (type == 'classic') ? `chair-2` : `chair-1`;
                        glitter.runJsInterFace("dataLoading", {
                            show: true,
                            text: 'Analyzing...'
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "add",
                            key: table,
                            x: "0.3155882",
                            y: "-0.35021496",
                            eulx: "-90",
                            z: "0.5313325",
                            rotation: "0.048314802"
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "add",
                            key: chair,
                            x: "0.7703068",
                            y: "-0.34336013",
                            eulx: "-90",
                            z: "-0.08055357",
                            rotation: "-0.46883386"
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "add",
                            key: chair,
                            x: "-0.003336209",
                            eulx: "-90",
                            y: "-0.36297208",
                            z: "1.1834354",
                            rotation: "2.4102712"
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "add",
                            key: chair,
                            eulx: "-90",
                            x: "-0.91904503",
                            y: "-0.36993104",
                            z: "0.5688769",
                            rotation: "1.5583277"
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "add",
                            key: chair,
                            x: "0.71966326",
                            eulx: "-90",
                            y: "-0.35211712",
                            z: "1.1920552",
                            rotation: "-2.617264"
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "add",
                            key: chair,
                            x: "-0.14061905",
                            eulx: "-90",
                            y: "-0.3567521",
                            z: "-0.032847494",
                            rotation: "0.52103186"
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "add",
                            key: chair,
                            eulx: "-90",
                            x: "1.478396",
                            y: "-0.33925766",
                            z: "0.5620594",
                            rotation: "-1.575593"
                        }, () => {
                        });
                        setTimeout(() => {
                            text = `A ${type} dining table and chairs added.`;
                            rec();
                            glitter.runJsInterFace("dataLoading", {
                                show: false,
                                text: 'Analyzing...'
                            }, () => {
                            });
                        }, 2000);
                    },
                    clear: () => {
                        glitter.runJsInterFace("dataLoading", {
                            show: true,
                            text: 'Analyzing...'
                        }, () => {
                        });
                        glitter.runJsInterFace("addTestPd", {
                            command: "clear"
                        }, () => {
                        });
                        if (!glitter.share.identify) {
                            text = "Start recognition.";
                            rec();
                        }
                        setTimeout(() => {
                            if (!glitter.share.identify) {
                                text = "Recognition completed.";
                                rec();
                            }
                            glitter.runJsInterFace("changeScene", {}, () => {
                            });
                        }, 1000);
                        setTimeout(() => {
                            text = "Clear completed.";
                            rec();
                            glitter.runJsInterFace("dataLoading", {
                                show: false,
                                text: 'Analyzing...'
                            }, () => {
                            });
                        }, 3000);
                    },
                    identify: () => {
                        if (!glitter.share.identify) {
                            glitter.share.identify = true;
                        }
                        text = "Start recognition.";
                        rec();
                        setTimeout(() => {
                            glitter.runJsInterFace("dataLoading", {
                                show: true,
                                text: 'Analyzing...'
                            }, () => {
                            });
                            glitter.runJsInterFace("changeScene", {}, () => {
                            });
                            setTimeout(() => {
                                glitter.runJsInterFace("addTestPd", {
                                    command: "add",
                                    key: "small sofa",
                                    x: "-2.0877252",
                                    y: "-0.33953708",
                                    z: "0.91531134",
                                    rotation: "-3.1283262"
                                }, () => {
                                });
                                glitter.runJsInterFace("addTestPd", {
                                    command: "add",
                                    key: "big sofa",
                                    x: "-0.068406306",
                                    y: "-0.3355561",
                                    z: "-0.59271044",
                                    rotation: "-0.03593927"
                                }, () => {
                                });
                                glitter.runJsInterFace("addTestPd", {
                                    command: "add",
                                    key: "side table",
                                    x: "-1.9945982",
                                    y: "-0.32982713",
                                    z: "-0.5216444",
                                    eulx: "-90",
                                    rotation: "0.048314802"
                                }, () => {
                                });
                                glitter.runJsInterFace("addTestPd", {
                                    command: "add",
                                    key: "coffee table",
                                    x: "-0.22475687",
                                    y: "-0.36027306",
                                    z: "0.8462901",
                                    rotation: "0.048314802"
                                }, () => {
                                });
                                glitter.runJsInterFace("addTestPd", {
                                    command: "add",
                                    key: "chair",
                                    x: "0.9255261",
                                    y: "-0.35227495",
                                    z: "1.8658745",
                                    rotation: "0.73377305"
                                }, () => {
                                });
                            }, 500);
                            const intv = setInterval(() => {
                                glitter.runJsInterFace("dataLoading", {
                                    show: true,
                                    text: 'Analyzing...'
                                }, () => {
                                });
                            }, 100);
                            setTimeout(() => {
                                text = "Recognition completed";
                                clearInterval(intv);
                                rec();
                                glitter.runJsInterFace("dataLoading", {
                                    show: false,
                                    text: 'Analyzing...'
                                }, () => {
                                });
                            }, 6000);
                        }, 100);
                    },
                    remove: (key) => {
                        if (!glitter.share.identify) {
                            glitter.share.identify = true;
                            mapF.identify();
                            setTimeout(() => {
                                mapF.remove(key);
                            }, 7000);
                        }
                        else {
                            glitter.runJsInterFace("dataLoading", {
                                show: true,
                                text: 'Analyzing...'
                            }, () => {
                            });
                            key.map((da) => {
                                glitter.runJsInterFace("remove", {
                                    command: "remove",
                                    sku: da
                                }, () => {
                                });
                            });
                            setTimeout(() => {
                                text = "Remove completed.";
                                glitter.runJsInterFace("dataLoading", {
                                    show: false,
                                    text: 'Analyzing...'
                                }, () => {
                                });
                                rec();
                            }, 2000);
                        }
                    }
                };
                gvc.getBundle().config.find((dd) => {
                    return dd.hashTag === 'chatContainer';
                }).data.setting.push({
                    "id": gvc.glitter.getUUID(),
                    "js": "$style1/official.js",
                    "css": { "class": {}, "style": {} },
                    "data": {
                        "attr": [],
                        "elem": "h3",
                        "class": "ms-auto me-1",
                        "inner": element?.e.value,
                        "style": "display: flex;\nflex-direction: row;\nalign-items: flex-start;\npadding: 8px 12px;\nfont-family: 'Noto Sans TC';\nfont-style: normal;\nfont-weight: 400;\nfont-size: 14px;\nline-height: 150%;\n\nbackground: #F8F3ED;\nborder-radius: 16px;max-width:80%;",
                        "dataFrom": "static",
                        "atrExpand": { "expand": false },
                        "styleList": [],
                        "elemExpand": { "expand": true },
                        "innerEvenet": {}
                    },
                    "type": "widget",
                    "label": "我的聊天"
                });
                if (['arrange', 'add', 'place', 'design'].find((dd) => {
                    return (element?.e.value.toLowerCase()).indexOf(dd) !== -1;
                })) {
                    mapF.arrange((((element?.e.value.toLowerCase()).indexOf("classical") !== -1) || ((element?.e.value.toLowerCase()).indexOf("classic") !== -1)) ? `classic` : `modern`);
                    text = "finish";
                }
                else if (['clear', 'remove'].find((dd) => {
                    const key = element?.e.value.toLowerCase();
                    return ((key).indexOf(dd) !== -1) && (((key).indexOf('living') !== -1) || ((key).indexOf('room') !== -1) || ((key).indexOf('space') !== -1) || ((key).indexOf('furniture') !== -1));
                })) {
                    mapF.clear();
                    text = "finish";
                }
                else if (['clear', 'remove'].find((dd) => {
                    const key = element?.e.value.toLowerCase();
                    return ((key).indexOf(dd) !== -1);
                })) {
                    const key = element?.e.value.toLowerCase();
                    if ((key).indexOf("sofa set") !== -1) {
                        text = "finish";
                        mapF.remove(['small sofa', 'big sofa']);
                    }
                    else if ((key).indexOf("small") !== -1) {
                        text = "finish";
                        mapF.remove(['small sofa']);
                    }
                    else if ((key).indexOf("big") !== -1) {
                        text = "finish";
                        mapF.remove(['big sofa']);
                    }
                    else if ((key).indexOf("side") !== -1) {
                        text = "finish";
                        mapF.remove(['side table']);
                    }
                    else if ((key).indexOf("sofa") !== -1) {
                        text = "finish";
                        mapF.remove(['small sofa', 'big sofa']);
                    }
                    else if ((key).indexOf("coffee") !== -1) {
                        text = "finish";
                        mapF.remove(['coffee table']);
                    }
                    else if ((key).indexOf("chair") !== -1) {
                        text = "finish";
                        mapF.remove(['chair']);
                    }
                    else if ((key).indexOf("table") !== -1) {
                        text = "finish";
                        mapF.remove(['coffee table', 'side table']);
                    }
                    else {
                        rec();
                    }
                }
                else if (['identify', 'recognize'].find((dd) => {
                    return (element?.e.value.toLowerCase()).indexOf(dd) !== -1;
                })) {
                    mapF.identify();
                }
                else {
                    rec();
                }
            })();
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    glitter.setUrlParameter('userSetting', 'basic');
                    gvc.recreateView();
                    glitter.getUrlParameter('userSetting') === 'basic';
                    (() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve(true);
                            }, 1000);
                        });
                    })();
                },
            };
        }
    };
});
