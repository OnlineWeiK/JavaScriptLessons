/**
 * Created by wk on 2015/5/28.
 */

window.onload= function(){
    imgLocation("container", "box");
    var imgDate={"data":[{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]};//Jason��ʽ����
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
    // ������������ӿ����imgLocation()���ĸ߶ȣ����һ�����ľ�����ҳ����(ʵ�ֹ������һ����ײ���ʼ����)
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop+Math.floor(ccontent[ccontent.length-1].offsetHeight/2);
    //������������ӿ����imgLocation()���ĸ߶ȣ����һ�����ľ�����ҳ����+����ߵ�һ��(ʵ��δ�����׾Ϳ�ʼ����)

    var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;//�������߶ȣ������Դ���
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;//��ǰҳ��߶�
    //console.log(lastContentHeight+"--"+scrolltop+"--"+pageHeight);
    return (lastContentHeight<scrolltop+pageHeight)?true:false;//����ָ���߶Ⱥ� ����true������imgLocation()����
}

/*
 parent ����id
 content Ԫ��id
 */
function imgLocation(parent,content){
    //��parent�����е�contentȫ��ȡ��
    var cparent = document.getElementById(parent);//��������
    var ccontent = getChildElement(cparent,content);//��ȡ�洢�洢���content������
    //console.log(ccontent);
    var imgWidth = ccontent[0].offsetWidth; //һ�������
    //��ȡ���ڿ��,���ÿһ�������ɵĿ��content�ĸ��������ڿ�ȳ��Կ����
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText="width:"+imgWidth*num +"px;margin:0 auto";//���ø���������ʽ������+�Զ�ˮƽ����

    //��ȡ��һ��box�ĸ߶�
    var boxHeightArr=[];//�洢ÿ�������п����ӵĸ߶�
    for(var i = 0;i<ccontent.length;i++) {
        if (i < num) {
            boxHeightArr[i] = ccontent[i].offsetHeight;//��һ����num�����content�ĸ߶ȣ��������
        }
        else {
            var minHeight = Math.min.apply(null, boxHeightArr);//��������Сֵ
            var minIndex = getminheightLocation(boxHeightArr,minHeight);
            ccontent[i].style.position="absolute";//����Ϊ����λ��,���������Ŀ�����λ��
            ccontent[i].style.top = minHeight+"px";//���ø߶�
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";//����λ��
            //���� ��С��Ԫ�صĸ� + ����ϵ�aPin[i]����
            boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;//������ӿ���ĸ߶�
        }
    }
   // console.log(boxHeightArr);
}

/*
  ��ȡһ���п��content�߶���С������index
*/
function getminheightLocation(boxHeightArr,minHeight){
    for(var i in boxHeightArr){
        if(boxHeightArr[i]==minHeight){
            return i;
        }
    }

}
/*
*  ͨ����������Ԫ�ص�class�� ��ȡ��ͬ����Ԫ�ص�����
* */
function getChildElement(parent,content){
    var contentArr=[];//���������ڴ洢��Ԫ��
    var allContent = parent.getElementsByTagName("*");//��ȡ�����������Ӽ�����ȡparent�����б�ǩ��
    for(var i=0;i<allContent.length;i++){
        if(allContent[i].className==content){//����Ԫ�ء��ж����ѹ������
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}