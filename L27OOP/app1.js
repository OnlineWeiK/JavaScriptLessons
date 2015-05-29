/**
 * Created by wk on 2015/5/28.
 */

(function(){
    var n = "online";
    function Person(name){
        var _this={};
        _this.name = name;
        _this.sayHello = function(){
            alert("PHello"+_this.name+n);
        };
        return _this;
    }
    window.Person = Person;
}());


function Teacher(name){
    var _this=Person(name);
    var superSay = _this.sayHello;
    _this.sayHello= function(){
        superSay.call(_this);
        alert("THello"+_this.name);
    };
    return _this;

}
 var t = Teacher("WK");
t.sayHello();