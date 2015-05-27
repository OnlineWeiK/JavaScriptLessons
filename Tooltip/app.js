
var className = "tooltip-box";

var getDocID = function(id){
    return document.getElementById(id);
}

var parentdiv = getDocID("div");

function showTooltip(obj,id,html,width,height){
    if(document.getElementById(id) == null){
        var tooltipBox;
        tooltipBox = document.createElement("div");
        tooltipBox.className = className ;
        tooltipBox.id = id;
        tooltipBox.innerHTML = html;

        obj.appendChild(tooltipBox);

        tooltipBox.style.width = width?width+"px":"auto";
        tooltipBox.style.height = height?height+"px":"auto";

        tooltipBox.style.position = "absolute";
        tooltipBox.style.display = "block";

        var left = obj.offsetLeft;
        var top = obj.offsetTop+20;

        tooltipBox.style.left = left+"px";
        tooltipBox.style.top = top+"px";

        obj.addEventListener("mouseout",function(){
            setTimeout(function(){
                getDocID(id).style.display = "none";
            },100);
        });
//        obj.onmouseout = function(){
//            setTimeout(function(){
//                getDocID(id).style.display = "none";
//            },500);
//        }

    }else{
        getDocID(id).style.display = "block";
    }
}

parentdiv.addEventListener("mouseover",function(e){
    var target = e.target;
    if(target.className == "tooltip"){
        var _html;
        var _id;
        var _width;
        switch (target.id){
            case "weibo":
                _id = "wb";
                _html = "极客学院_jikexueyuan";
                _width = 200;
                break;
            case "weixin":
                _id = "wx";
                _html = "极客学院";
                _width = 150;
                break;
            case "logo":
                _id = "lg";
                _html = "<img src='logo.png'>";
                _width = 230;
                break;
            case "jikexueyuan":
                _id = "jkxy";
                _html = "<iframe src='http://www.jikexueyuan.com' width='500' height='300'></iframe>";
                _width = 500;
                break;
        }
        showTooltip(target,_id,_html,_width);
    }
});

//var wb = getDocID("weibo");
//var wx = getDocID("weixin");
//var lg = getDocID("logo");
//var jkxy = getDocID("jikexueyuan");

//wb.onmousemove = function(){
//    showTooltip(this,"wb","极客学院_jikexueyuan",150);
//}

//wx.onmousemove = function(){
//    showTooltip(this,"wx","极客学院",150);
//}
//
//lg.onmousemove = function(){
//    showTooltip(this,"lg","<img src='logo.png'>",230);
//}
//
//jkxy.onmousemove = function(){
//    var geek = "<iframe src='http://www.jikexueyuan.com' width='500' height='300'></iframe>"
//    showTooltip(this,"jkxy",geek,500);
//}