## 圖片上傳
```
Editor.uploadImage({
gvc: gvc,
title: '預覽圖片1'',
def:widget.data.image,
callback:(data)=>{
widget.data.mobile.m.lottie=data
widget.refreshComponent()
}
})
```
## 檔案上傳
```
Editor.uploadFile({
gvc: gvc,
title:'背景圖或者影片[mp4,mpeg,mov]'',
def:widget.data.bgSrc,
callback:(data)=>{
widget.data.bgSrc=data
widget.refreshComponent()
}
})
```
## TextArea編輯

```
glitter.htmlGenerate.editeText({
gvc: gvc,
title: '標題',
default: widget.data.title,
placeHolder: "標題",
callback: (text) => {
widget.data.title = text
widget.refreshComponent()
}
})
```

## Input編輯

```
glitter.htmlGenerate.editeText({
gvc: gvc,
title: '標題',
default: widget.data.title,
placeHolder: "標題",
callback: (text) => {
widget.data.title = text
widget.refreshComponent()
}
})
```

## FontAwsome
```
Editor.fontawesome({
title: 'icon',
gvc: gvc,
def: dd.icon,
callback: (text: string) => {
dd.icon = text;
},
})
```

## 文字輸入與搜尋區塊
```
Editor.searchInput({
gvc: gvc,
title: "文字輸入與搜尋區塊",
def: d2,
placeHolder: '標籤',
callback: (text) => {
data.tag[index] = text;
widget.refreshComponent();
},
array: widget.data.tag.map((dd: any) => {
return dd.title;
}),
})
```

## 附帶刪除的Title

```
Editor.minusTitle(dd.title, dd.minus)
```

## 陣列元素包含拖曳位移與添加
```
Editor.arrayItem({
originalArray:widget.data.list,
gvc: gvc,
title: '文字區塊內容',
array: widget.data.list.map((dd: any, index: number) => {
return {
title: dd.src || `區塊:${index + 1}`,
expand: dd,
innerHtml: glitter.htmlGenerate.editeInput({
gvc: gvc,
title: `標題`,
default: dd.src,
placeHolder: '輸入標題名稱',
callback: (text) => {
dd.src = text;
widget.refreshComponent();
},
}),
minus: gvc.event(() => {
widget.data.list.splice(index, 1);
widget.refreshComponent();
}),
};
}),
expand: widget.data,
plus: {
title: '添加區塊',
event: gvc.event(() => {
widget.data.list.push({src: '萊恩設計', type: 'text'});
widget.refreshComponent();
}),
},
refreshComponent:()=>{
widget.refreshComponent()
}
})
```

## Select選擇器
```
Editor.select({
title: `描述方式`,
gvc: gvc,
def: dd.section,
array: [
{
title: '列表',
value: `list_img`,
},
{
title: '文字',
value: `img_desc`,
},
],
callback: (text) => {
dd.section = text;
widget.refreshComponent();
},
})
```
