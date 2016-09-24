/**
 * Created by Kevinaskin on 2016/9/24.
 */
(function () {

    function Main() {
        this.init();

    }
    Main.prototype.delBtnEvent = function () {
        var that = this;
        var dels = document.getElementsByClassName('delbtn');
        var idnumber = document.getElementsByClassName('idnumber');
        // console.log(dels.length);
        for(var i =0;i<dels.length;i++){
            (function (i) {
                dels[i].onclick=function () {
                    // console.log(idnumber[i].innerHTML);
                    new kevinaskin.Ajax({
                        url:'/api/del-msg',
                        type:'post',
                        data: {id:idnumber[i].innerHTML},
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            location.reload();
                        },
                        fail: function (err) {
                            console.error(err);
                        }
                    })
                }
            })(i)
        }


    };
    Main.prototype.renderMsg = function () {
        var that = this;
        function msgTextRender(nickname,text,time,number) {
            var container = document.getElementById('msg-box');
            var id = document.createElement('p');
            id.setAttribute('class','idnumber');
            id.style.display = 'none';
            id.innerHTML = number;
            var div = document.createElement('div');
            div.setAttribute('class','msg-container');
            var p = document.createElement('p');
            p.innerHTML = text;
            var span = document.createElement('span');
            span.innerHTML = time;
            var h3 = document.createElement('h3');
            h3.setAttribute('class','msg-h3');
            h3.innerHTML = nickname;
            var del = document.createElement('p');
            del.style.color = 'red';
            del.setAttribute('class','delbtn');
            del.innerHTML = 'DELETE THIS PIECE OF MSG...';
            div.appendChild(id);
            div.appendChild(h3);
            div.appendChild(span);
            div.appendChild(p);
            div.appendChild(del);
            container.appendChild(div);
        }
        function timeParse(data) {
            var temp = data.split('');
            var time =[];
            for(var i =0;i<10;i++){
                time.push(temp[i]);
            }
            return time.join('');
        }
        new kevinaskin.Ajax({
            url:'/about/getmsg',
            type:'get',
            data: {},
            dataType: "json",
            success: function (data) {
                this._data = JSON.parse(data);
                for(var i = 0;i<this._data.length;i++){
                    console.log(this._data[i].id);
                    msgTextRender(this._data[i].username +"  说",
                        this._data[i].text,
                        timeParse(this._data[i].time),
                        this._data[i].id
                    );
                }
                if(i == this._data.length){
                    that.delBtnEvent();
                }
            },
            fail: function (err) {
                console.error(err);
            }
        })

    };
    Main.prototype.init = function () {
        var that = this;
        this.renderMsg();
    };
    new Main();
})();