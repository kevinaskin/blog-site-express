/**
 * Created by Kevinaskin on 2016/9/23.
 */
(function () {
    function Main() {
        this.getElements();
        this.addListeners();
    }
    Main.prototype.alertFunc = function (that,msg) {
        that._worningmsg.innerHTML = msg;
        that._alertworning.style.display = 'block';
        that._container.style.backgroundColor = "#666";
    };
    Main.prototype.getElements = function () {
        this._container = document.getElementById('container');

        this._logout = document.getElementById('logout');
        this._btnUpload = document.getElementById('btn-upload');
        this._title = document.getElementById('article-title');
        this._tags = document.getElementsByClassName('radio');
        this._context = document.getElementById('article');

        this._alertworning = document.getElementById('alertworning');
        this._worningmsg = document.getElementById('worning-msg');
        this._exitWorning = document.getElementById('exit-worning');
    };

    Main.prototype.addListeners = function () {
        var that = this;
        //LOG OUT
        this._logout.onclick = function () {
            new kevinaskin.Ajax({
                url: '/login/logout',
                type: 'POST',
                data: {},
                dataType: "json",
                success: function (data) {
                    this._data = JSON.parse(data);
                    if (this._data.code == 0) {
                        location.href = '/';
                    }
                },
                fail: function (err) {
                    console.error(err);
                }
            });
        };
        //Close worning
        this._exitWorning.onclick = function () {
            that._alertworning.style.display = 'none';
            that._container.style.backgroundColor = "#fff";
        };
        //RADIO CHECKED
        this._checkRadio = function (e) {
            this._length = e.length;
            for(var i =0;i<this._length;i++){
                if(e[i].checked) return i;
            }
            return -1;
        };
        //UPLOAD
        this._btnUpload.onclick = function () {
            // console.log(that._title.value,that._context.value);
            // console.log(that._checkRadio(that._tags)); //-1(haven't checked),0,1,2;
            switch (that._checkRadio(that._tags)){
                case -1:
                    that.alertFunc(that,"你需要选择一个分类");
                    break;
                default:
                    if(that._title.value){
                        if(that._context){
                            new kevinaskin.Ajax({
                                url: '/api/article-post',
                                type: 'POST',
                                data: {
                                    title:that._title.value,
                                    texts:that._context.value,
                                    tagsnumber:that._checkRadio(that._tags)
                                },
                                dataType: "json",
                                success: function (data) {
                                    this._data = JSON.parse(data);
                                    if (this._data.code == 0) {
                                        location.href = '/admin/article-list';
                                    }
                                },
                                fail: function (err) {
                                    console.error(err);
                                }
                            })
                        }else{
                            that.alertFunc(that,"请输入文章内容");
                        }
                    }else{
                        that.alertFunc(that,"请输入文章标题");
                    }
                    break;
            }
        }
    };
    
    new Main();
})();