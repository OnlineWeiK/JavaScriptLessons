/**
 * Created by wk on 2015/5/28.
 */

window.onload= function(){
    imgLocation("container", "box");
    var imgDate={"data":[{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]};//Jason格式数据
    window.onscroll = function(){
        if(checkFlag()) {
            var cparent = document.getElementById("container");
            for (var i = 0; i < imgDate.data.length; i++) {
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "images/" + imgDate.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container", "box");
        }
    };
};

function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    //var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
    // 创建【触发添加块框函数imgLocation()】的高度：最后一个块框的距离网页顶部(实现滚到最后一个框底部开始加载)
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop+Math.floor(ccontent[ccontent.length-1].offsetHeight/2);
    //创建【触发添加块框函数imgLocation()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)

    var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;//滚动条高度，兼容性处理
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;//当前页面高度
    //console.log(lastContentHeight+"--"+scrolltop+"--"+pageHeight);
    return (lastContentHeight<scrolltop+pageHeight)?true:false;//到达指定高度后 返回true，触发imgLocation()函数
}

/*
 parent 父级id
 content 元素id
 */
function imgLocation(parent,content){
    //将parent下所有的content全部取出
    var cparent = document.getElementById(parent);//父级对象
    var ccontent = getChildElement(cparent,content);//获取存储存储块框content的数组
    //console.log(ccontent);
    var imgWidth = ccontent[0].offsetWidth; //一个块框宽度
    //获取窗口宽度,求得每一行能容纳的块框content的个数，窗口宽度除以块框宽度
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText="width:"+imgWidth*num +"px;margin:0 auto";//设置父级居中样式：定宽+自动水平处理

    //获取第一行box的高度
    var boxHeightArr=[];//存储每列中所有块框相加的高度
    for(var i = 0;i<ccontent.length;i++) {
        if (i < num) {
            boxHeightArr[i] = ccontent[i].offsetHeight;//第一行中num个块框content的高度，存进数组
        }
        else {
            var minHeight = Math.min.apply(null, boxHeightArr);//数组中最小值
            var minIndex = getminheightLocation(boxHeightArr,minHeight);
            ccontent[i].style.position="absolute";//设置为绝对位置,才能完整的控制其位置
            ccontent[i].style.top = minHeight+"px";//设置高度
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";//设置位置
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;//更新添加块框后的高度
        }
    }
   // console.log(boxHeightArr);
}

/*
  获取一行中块框content高度最小的索引index
*/
function getminheightLocation(boxHeightArr,minHeight){
    for(var i in boxHeightArr){
        if(boxHeightArr[i]==minHeight){
            return i;
        }
    }

}
/*
*  通过父级和子元素的class类 获取该同类子元素的数组
* */
function getChildElement(parent,content){
    var contentArr=[];//该数组用于存储子元素
    var allContent = parent.getElementsByTagName("*");//获取父级下所有子集（获取parent下所有标签）
    for(var i=0;i<allContent.length;i++){
        if(allContent[i].className==content){//遍历元素、判断类别、压入数组
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}