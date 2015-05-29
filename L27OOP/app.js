
/**
 * Created by wk on 2015/5/28.
 */

(function(){
    var n = "online";
    function People(name){
        this._name = name;
    }
    People.prototype.say = function(){
        alert("Peo say hello "+this._name);
    };
    window.People = People;
}());

//ÐÅÏ¢Òþ²Ø

(function(){
    function Student(name){
        this._name=name;
    }
    Student.prototype=new People();
    var superSay = Student.prototype.say;
    Student.prototype.say = function(){
        superSay.call(this);
        alert("Stu say hello "+this._name);
    };
    window.Student = Student;
}());
var s= new Student("wk");
s.say();

