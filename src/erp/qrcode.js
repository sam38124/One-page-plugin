export class Qrcode {
    static html(orderID, productName, sku, spec, qty, packageCount, shipNumber, l, w, h, image) {
        return `<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style type="text/css">
  
    ul.lst-kix_xfbt3uh9noou-0 {
        list-style-type: none
    }

    ul.lst-kix_xfbt3uh9noou-1 {
        list-style-type: none
    }

    .lst-kix_xfbt3uh9noou-1 > li:before {
        content: "\\0025cf  "
    }

    ul.lst-kix_xfbt3uh9noou-2 {
        list-style-type: none
    }

    .lst-kix_xfbt3uh9noou-3 > li:before {
        content: "\\0025cf  "
    }

    ul.lst-kix_xfbt3uh9noou-3 {
        list-style-type: none
    }

    ul.lst-kix_xfbt3uh9noou-4 {
        list-style-type: none
    }

    ul.lst-kix_xfbt3uh9noou-5 {
        list-style-type: none
    }

    .lst-kix_xfbt3uh9noou-2 > li:before {
        content: "\\0025cf  "
    }

    .lst-kix_xfbt3uh9noou-6 > li:before {
        content: "\\0025cf  "
    }

    ul.lst-kix_xfbt3uh9noou-6 {
        list-style-type: none
    }

    .lst-kix_xfbt3uh9noou-7 > li:before {
        content: "\\0025cf  "
    }

    li.li-bullet-0:before {
        margin-left: -18pt;
        white-space: nowrap;
        display: inline-block;
        min-width: 18pt
    }

    .lst-kix_xfbt3uh9noou-0 > li:before {
        content: "\\0025cf  "
    }

    .lst-kix_xfbt3uh9noou-8 > li:before {
        content: "\\0025cf  "
    }

    ul.lst-kix_xfbt3uh9noou-7 {
        list-style-type: none
    }

    ul.lst-kix_xfbt3uh9noou-8 {
        list-style-type: none
    }

    .lst-kix_xfbt3uh9noou-5 > li:before {
        content: "\\0025cf  "
    }

    .lst-kix_xfbt3uh9noou-4 > li:before {
        content: "\\0025cf  "
    }

    ol {
        margin: 0;
        padding: 0
    }

    table td, table th {
        padding: 0
    }

    .c8 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: middle;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 311.2pt;
        border-top-color: #000000;
        border-bottom-style: solid
    }

    .c0 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: middle;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 103.8pt;
        border-top-color: #000000;
        border-bottom-style: solid
    }

    .c16 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: middle;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 415pt;
        border-top-color: #000000;
        border-bottom-style: solid
    }

    .c7 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: middle;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 207.5pt;
        border-top-color: #000000;
        border-bottom-style: solid
    }

    .c5 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 4pt;
        font-family: "Noto Sans";
        font-style: normal
    }

    .c3 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 12pt;
        font-family: "Noto Sans";
        font-style: normal
    }

    .c1 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 12pt;
        font-family: "Calibri";
        font-style: normal
    }

    .c13 {
        text-decoration-skip-ink: none;
        font-family: "Noto Sans";
        -webkit-text-decoration-skip: none;
        font-weight: 400;
        text-decoration: underline
    }

    .c9 {
        border-spacing: 0;
        border-collapse: collapse;
        margin-right: auto
    }

    .c2 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.0;
        text-align: left
    }

    .c12 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.0;
        text-align: center
    }

    .c10 {
        background-color: #ffffff;
        max-width: 415pt;
        padding: 72pt 90pt 72pt 90pt
    }

    .c11 {
        margin-left: 36pt;
        padding-left: 0pt
    }

    .c14 {
        font-weight: 400;
        font-family: "Noto Sans"
    }

    .c15 {
        padding: 0;
        margin: 0
    }

    .c4 {
        height: 12pt
    }

    .c6 {
        height: 22pt
    }

    .title {
        padding-top: 24pt;
        color: #000000;
        font-weight: 700;
        font-size: 36pt;
        padding-bottom: 6pt;
        font-family: "Calibri";
        line-height: 1.0;
        page-break-after: avoid;
        text-align: left
    }

    .subtitle {
        padding-top: 18pt;
        color: #666666;
        font-size: 24pt;
        padding-bottom: 4pt;
        font-family: "Georgia";
        line-height: 1.0;
        page-break-after: avoid;
        font-style: italic;
        text-align: left
    }

    li {
        color: #000000;
        font-size: 12pt;
        font-family: "Calibri"
    }

    p {
        margin: 0;
        color: #000000;
        font-size: 12pt;
        font-family: "Calibri"
    }

    h1 {
        padding-top: 24pt;
        color: #000000;
        font-weight: 700;
        font-size: 24pt;
        padding-bottom: 6pt;
        font-family: "Calibri";
        line-height: 1.0;
        page-break-after: avoid;
        text-align: left
    }

    h2 {
        padding-top: 18pt;
        color: #000000;
        font-weight: 700;
        font-size: 18pt;
        padding-bottom: 4pt;
        font-family: "Calibri";
        line-height: 1.0;
        page-break-after: avoid;
        text-align: left
    }

    h3 {
        padding-top: 14pt;
        color: #000000;
        font-weight: 700;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Calibri";
        line-height: 1.0;
        page-break-after: avoid;
        text-align: left
    }

    h4 {
        padding-top: 12pt;
        color: #000000;
        font-weight: 700;
        font-size: 12pt;
        padding-bottom: 2pt;
        font-family: "Calibri";
        line-height: 1.0;
        page-break-after: avoid;
        text-align: left
    }

    h5 {
        padding-top: 11pt;
        color: #000000;
        font-weight: 700;
        font-size: 11pt;
        padding-bottom: 2pt;
        font-family: "Calibri";
        line-height: 1.0;
        page-break-after: avoid;
        text-align: left
    }

    h6 {
        padding-top: 10pt;
        color: #000000;
        font-weight: 700;
        font-size: 10pt;
        padding-bottom: 2pt;
        font-family: "Calibri";
        line-height: 1.0;
        page-break-after: avoid;
        text-align: left
    }</style>
</head>
<body class="c10 doc-content"><p class="c2 c4"><span class="c1"></span></p><a
        id="t.6251f47a1199f57679ec4ffbac1836e3251710c2"></a><a id="t.0"></a>
<table class="c9">
    <tbody>
    <tr class="c6">
        <td class="c8" colspan="3" rowspan="1"><p class="c12"><span
                style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 226.77px; height: 39.52px;"><img
                alt=""
                src="data:image/png;base64,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"
                style="width: 226.77px; height: 39.52px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                title=""></span></p></td>
        <td class="c0" colspan="1" rowspan="2"><p class="c12"><div
                style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 123.00px; height: 122.67px;"><img
                alt=""
                src=""
                id="wordQrcode"
                style="width: 123.00px; height: 122.67px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                title=""></div></p></td>
    </tr>
    <tr class="c6">
        <td class="c8" colspan="3" rowspan="1"><p class="c2"><span class="c3">訂單編號：${orderID}</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c7" colspan="2" rowspan="1"><p class="c2"><span class="c3">產品名稱：${productName}</span></p></td>
        <td class="c7" colspan="2" rowspan="6"><p class="c12"><span
                style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 260.00px; height: 260.00px;"><img
                alt=""
                src="${image}"
                style="width: 260.00px; height: 260.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                title=""></span></p></td>
    </tr>
    <tr class="c6">
        <td class="c7" colspan="2" rowspan="1"><p class="c2"><span class="c3">SKU：${sku}</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c7" colspan="2" rowspan="1"><p class="c2"><span class="c3">規格＆尺寸：${spec}</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c7" colspan="2" rowspan="1"><p class="c2"><span class="c3">數量：${qty}</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c7" colspan="2" rowspan="1"><p class="c2"><span class="c3">包件數：${packageCount}</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c7" colspan="2" rowspan="1"><p class="c2"><span class="c3">運單編號：${shipNumber}</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c16" colspan="4" rowspan="1"><p class="c2"><span class="c14">外箱尺寸：${l}</span><span class="c13">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span
                class="c14">CM </span><span class="c14">＊ ${w}</span><span
                class="c13">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="c14">CM ＊ ${h}</span><span class="c13">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span
                class="c14">CM</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c7" colspan="2" rowspan="1">
            <ul class="c15 lst-kix_xfbt3uh9noou-0 start">
                <li class="c2 c11 li-bullet-0"><span class="c3">正常</span></li>
                <li class="c2 c11 li-bullet-0"><span class="c3">破損 / 缺件 / 異常</span></li>
            </ul>
        </td>
        <td class="c7" colspan="2" rowspan="1"><p class="c2"><span class="c3">物流代號：</span></p></td>
    </tr>
    <tr class="c6">
        <td class="c16" colspan="4" rowspan="1"><p class="c2"><span class="c3">小叮嚀：易碎品，請小心輕放！</span></p></td>
    </tr>
    </tbody>
</table>
<p class="c2 c4"><span class="c1"></span></p></body>
</html>`;
    }
}
