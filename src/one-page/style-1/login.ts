import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.bgImage=widget.data.bgImage??'https://liondesign-prd.s3.amazonaws.com/file/252530754/1679649346350-price-bg.jpeg'
            widget.data.title=widget.data.title??"歡迎來到 星澄基地"
            widget.data.policy=widget.data.policy??`一、隱私權保護政策的適用範圍

隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。

二、個人資料的蒐集、處理及利用方式

當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。
本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。
於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。
為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。

三、資料之保護

只由經過授權的人員才能接觸您的個人資料，如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。
四、網站對外的相關連結

本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。

五、與第三人共用個人資料之政策

本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。

前項但書之情形包括不限於：

經由您書面同意。
法律明文規定。
為免除您生命、身體、自由或財產上之危險。
與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。
當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。
有利於您的權益。
本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。
六、Cookie之使用

為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導至網站某些功能無法正常執行 。

七、隱私權保護政策之修正

本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。`
            let formData={
                name:'',
                email:'',
                pwd:'',
                cpwd:''
            }
            function signItemView(){
                var item={
                    //
                    type:'SignIn',
                    //登入頁面
                    signInView:function (){
                        return `  <div class="w-100  pt-1 pt-md-4 pb-4 " style="max-width: 526px;">
            <h1 class="text-center text-xl-start">${widget.data.title}</h1>
            <p class="text-center text-xl-start pb-3 mb-3 text-white">還沒有帳號嗎? <a class="" style="color: deepskyblue;cursor: pointer;" onclick="${gvc.event(function (){
                            item.type="Register"

                        })}"> 點我註冊.</a></p>
            <div class="needs-validation mb-2" >
              <div class="position-relative mb-4">
                <label for="email" class="form-label fs-base">帳號或信箱</label>
                <input type="text" id="email" class="form-control form-control-lg">
              </div>
              <div class="mb-4">
                <label for="password" class="form-label fs-base">密碼</label>
                <div class="password-toggle">
                  <input type="password" id="password" class="form-control form-control-lg" >
                  <div class="invalid-feedback position-absolute start-0 top-100">Please enter your password!</div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary shadow-primary btn-lg w-100" onclick="${gvc.event(function (e, event) {
                         
                        })}">登入</button>
            </div>




          </div>`
                    },
                    //註冊頁面
                    registerView:function (){
                        return `  
            <div class="w-100  pt-md-4 pb-4" style="max-width: 526px;">
            <h1 class="text-center text-xl-start">創建帳號</h1>
            <p class="text-center text-xl-start pb-3 mb-3 text-white">已經有帳號了嗎? <a onclick="${gvc.event(function (){
                            item.type="SignIn"
                        })}" style="color: deepskyblue;cursor: pointer;">點我登入.</a></p>
            <form class="needs-validation" novalidate="">
              <div class="row">
                <div class="col-sm-6">
                  <div class="position-relative mb-4">
                    <label for="name" class="form-label fs-base">你的姓名</label>
                    <input type="text" id="name" class="form-control form-control-lg" onchange="${gvc.event((e)=>{
                        formData.name=e.value
                        })}" value="${formData.name}">
                    <div class="invalid-feedback position-absolute start-0 top-100">請輸入您的姓名</div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="position-relative mb-4">
                    <label for="email" class="form-label fs-base">信箱</label>
                    <input type="email" id="userID" class="form-control form-control-lg" required="">
                    <div class="invalid-feedback position-absolute start-0 top-100">請輸入您的Email</div>
                  </div>
                </div>
                <div class="col-12 mb-4">
                  <label for="password" class="form-label fs-base">密碼</label>
                  <div class="password-toggle">
                    <input type="password" id="password" class="form-control form-control-lg" required="">
                    <label class="password-toggle-btn" aria-label="Show/hide password">
                      <input class="password-toggle-check" type="checkbox">
                      <span class="password-toggle-indicator"></span>
                    </label>
                    <div class="invalid-feedback position-absolute start-0 top-100">請輸入密碼!</div>
                  </div>
                </div>
                <div class="col-12 mb-4">
                  <label for="password-confirm" class="form-label fs-base">確認密碼</label>
                  <div class="password-toggle">
                    <input type="password" id="confirmPassword" class="form-control form-control-lg" required="">
                    <label class="password-toggle-btn" aria-label="Show/hide password">
                      <input class="password-toggle-check" type="checkbox" >
                      <span class="password-toggle-indicator"></span>
                    </label>
                    <div class="invalid-feedback position-absolute start-0 top-100">請再次輸入密碼!</div>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <div class="form-check">
                  <input type="checkbox" id="terms" class="form-check-input">
                  <label for="terms" class="form-check-label fs-base">我同意 <a href="#" onclick="${gvc.event(function (){
                            if(document.getElementById('centermodal')){
                                glitter.$('#centermodal').remove()
                            }
                            $('body').append( `<div class="modal fade" id="centermodal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myCenterModalLabel">隱私權政策</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body">
        ${glitter.print(function (){
                                return widget.data.policy.replace(/\n/g,'<br>')
                            })}
            </div>
            <div class="modal-footer">
                                                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">關閉</button>
                                                            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>`);
                            (glitter.$('#centermodal')).modal('show')
                        })}">隱私權政策與條款</a></label>
                 
                </div>
              </div>
              <button type="submit" class="btn btn-primary shadow-primary btn-lg w-100" onclick="${gvc.event(function (e,event){
                            event.preventDefault();
                            if (!($('#terms') as any).get(0).checked) {
                                glitter.share.dia.error("請先同意條款!")
                                return
                            }
                            if ($('#confirmPassword').val() !== $('#password').val()) {
                                glitter.share.dia.error("請確認密碼!")
                                return
                            }
                            if($('#name').val()===''){
                                glitter.share.dia.error("請輸入姓名")
                            }
                            var data= {
                                userID:$('#userID').val(),
                                email:$('#userID').val(),
                                password:$('#password').val(),
                                name:$('#name').val()
                            }
                            glitter.share.dia.dataLoading(true, "register")
                            glitter.share.postApi("register", {
                                data:data,
                            }, function (response:any) {
                                if (response) {
                                    if (response.result) {
                                        function signIn() {
                                            glitter.share.um.userID = data.userID
                                            glitter.share.um.password = data.password
                                            glitter.share.umi.reloadUserInfo(function (response:any) {
                                                if (response.result) {
                                                    glitter.share.dia.dataLoading(false, "register")
                                                    glitter.setHome('page/Page_User_Home.html', 'Page_User_Home', {})
                                                } else {
                                                    signIn()
                                                }
                                            })
                                        }

                                        signIn()
                                    } else {
                                        glitter.share.dia.dataLoading(false, "register")
                                        glitter.share.dia.error("此帳號已經註冊!")
                                    }
                                } else {
                                    glitter.share.dia.dataLoading(false, "register")
                                    glitter.share.dia.internetError()
                                }

                            })
                        })}">註冊</button>
            </form>
          </div>
            `
                    }
                }
                return item
            }
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc,widget)
                    return `  
  <div class="position-absolute w-100 h-100 " style="background-image: url(${widget.data.bgImage});
  background-repeat: no-repeat;background-position: center center;background-size: cover;"></div>
  <div class="position-absolute w-100 h-100" style="background: rgba(0,0,0,0.6);"></div>
        ${gvc.bindView(
                        function () {
                            var item = signItemView()
                            return {
                                bind: `SignInPlace`,
                                view: function () {
                                    var html = ``
                                    switch (item.type) {
                                        case "SignIn":
                                            html += item.signInView()
                                            break
                                        case "Register":
                                            html += item.registerView()
                                            break
                                    }
                                    return html
                                },
                                onCreate: function () {
                                },
                                divCreate:{elem:`section`,class:`position-relative   px-4`,
                                    style:`overflow-y: scroll;max-height:calc(100vh);padding-top:100px;padding-bottom:50px;max-width: 100%;width: 526px;`
                                
                                },
                                dataList: [{
                                    obj: item, key: "type"
                                }]
                            }
                        })}`;
                },
                editor: () => {
                    //https://liondesign-prd.s3.amazonaws.com/file/252530754/1679649346350-price-bg.jpeg
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `背景圖片`,
                            def:widget.data.bgImage,
                            callback:(data)=>{
                                widget.data.bgImage=data
                                widget.refreshComponent()
                            }
                        }), glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title,
                            placeHolder: "輸入標題",
                            callback: (text) => {
                                widget.data.title = text
                                widget.refreshComponent()
                            }
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '隱私權條款',
                            default: widget.data.policy,
                            placeHolder: "輸入隱私權條款",
                            callback: (text) => {
                                widget.data.policy = text
                                widget.refreshComponent()
                            }
                        })
                    ]);
                },
            };
        },
    }
})