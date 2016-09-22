/**
 * Created by Kevinaskin on 2016/9/22.
 */
(function () {
    //封装ajax
    function ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {

            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        };

        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);


            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            xhr.send(params);
        }
    }


    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }

///////////////////////////////////////Main////////////////////////////////////////////////
    function Main() {
        this.getElements();
        this.addEventListeners();
        this.renderMsg();
    }

    Main.prototype.getElements = function () {
        this._msgwall = document.getElementById('msg-wall');
        this._submitmsg = document.getElementById('submit-msg');
        this._nickname = document.getElementById('nickname');
        this._worningmsg = document.getElementById('alertworning');
        this._worningp = document.getElementById('worning-msg');
        this._worningexit = document.getElementById('exit-worning');
    };
    Main.prototype.addEventListeners = function () {
        var that = this;
        this._submitmsg.onclick = function () {
            if (that._msgwall.value) {
                if (that._nickname.value) {
                    //alert(that._msgwall.value,that._nickname.value);
                    ajax({
                        url:'/about/post',
                        type:'POST',
                        data: {username:that._nickname.value,text:that._msgwall.value},
                        dataType: "json",
                        success: function (data) {
                            this._data = JSON.parse(data);
                            if (this._data.code == 0) {
                                that._worningmsg.style.display = 'block';
                                that._worningp.innerHTML = '你好，我收到你的留言了哦 *^__^*)';
                                location.href='/about';
                            }else if(this._data.code == 1){
                                //todo error
                            }
                        },
                        fail: function (err) {
                            console.error(err);
                        }
                    });
                } else {
                    that._worningmsg.style.display = 'block';
                    that._worningp.innerHTML = 'Please enter a Nickname.';
                }
            }else{
                that._worningmsg.style.display = 'block';
                that._worningp.innerHTML = '你需要写点什么再按提交 *^__^*)';
            }
        };
        this._worningexit.onclick = function () {
            that._worningmsg.style.display = 'none';
            that._nickname.focus();
        }
    };
    Main.prototype.renderMsg = function () {
        function msgTextRender(nickname,text,time) {
            var container = document.getElementById('msg-box');
            var div = document.createElement('div');
            div.setAttribute('class','msg-container');
            var p = document.createElement('p');
            p.innerHTML = text;
            var span = document.createElement('span');
            span.innerHTML = time;
            var h3 = document.createElement('h3');
            h3.innerHTML = nickname;
            div.appendChild(h3);
            div.appendChild(span);
            div.appendChild(p);
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
        ajax({
            url:'/about/getmsg',
            type:'get',
            data: {},
            dataType: "json",
            success: function (data) {
                this._data = JSON.parse(data);
                for(var i = 0;i<this._data.length;i++){
                    console.log(this._data[i]);
                    msgTextRender(this._data[i].username +"  说",
                        this._data[i].text,
                        timeParse(this._data[i].time)
                    );
                }
            },
            fail: function (err) {
                console.error(err);
            }
        })
    };
    new Main();
})();
