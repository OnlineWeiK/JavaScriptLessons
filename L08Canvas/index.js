/**
 * Created by wk on 2015/5/27.
 */

function show(id)
{
    var cv = document.getElementById(id);
    var ct = cv.getContext("2d");
    switch (id)
    {
        case "canvas":
            ct.fillStyle="#FF0000";
            ct.fillRect(0,0,100,100);
            break;
        case "imgCanvas":
            var img = new Image();
            img.src = "img.png";
            ct.drawImage(img,0,0);
            break;
    }
}
show("canvas");
//show("imgCanvas");
