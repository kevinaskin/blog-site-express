/**
 * Created by Kevinaskin on 2016/9/19.
 */
(function () {


    //主函数

    function Main() {
        this.getElements();
        this.addListeners();
        this.sendBtn();
        this.init();
    }

    Main.prototype.getElements = function () {
        this._container = document.getElementById('container');
        this._exit = document.getElementById('exit');
        this._exitWorning = document.getElementById('exit-worning');
        this._loginbtn = document.getElementById('login');
        this._registbtn = document.getElementById('regist');
        this._logininput = document.getElementById('login-input');
        this._psdinput = document.getElementById('psd-input');

        this._alertbox = document.getElementById('loginalert');

        this._alertworning = document.getElementById('alertworning');
        this._worningmsg = document.getElementById('worning-msg');

        this._sendBtn = document.getElementById('login-button');
        this._logoutBtn = document.getElementById('log-out-button');

    };
    Main.prototype.addListeners = function () {
        var that = this;
        //LOG OUT
        this._logoutBtn.onclick = function () {
            new kevinaskin.Ajax({
                url: '/login/logout',
                type: 'POST',
                data: {},
                dataType: "json",
                success: function (data) {
                    this._data = JSON.parse(data);
                    if (this._data.code == 0) {
                        location.reload();
                    }
                },
                fail: function (err) {
                    console.error(err);
                }
            })
        };
        this._loginbtn.onclick = function () {
            that._alertbox.style.display = "block";
            that._logininput.focus();
            that._container.style.backgroundColor = "#666";
            that._state = '/login';
        };
        this._registbtn.onclick = function () {
            that._alertbox.style.display = "block";
            that._logininput.focus();
            that._container.style.backgroundColor = "#666";
            that._state = '/login/regist';
        };
        this._exit.onclick = function () {
            that._alertbox.style.display = 'none';
            that._container.style.backgroundColor = "#fff";
            that._logininput.value = '';
            that._psdinput.value = '';
        };
        this._exitWorning.onclick = function () {
            that._alertworning.style.display = 'none';
            if (that._alertbox.style.display == "none") {
                that._container.style.backgroundColor = "#fff";
            } else {
                that._container.style.backgroundColor = "#666";
                if (that._input_state == 'password') {
                    that._psdinput.value = '';
                    that._psdinput.focus();
                } else if (that._input_state == 'username' || that._input_state == 'name-fail') {
                    that._psdinput.value = '';
                    that._logininput.value = '';
                    that._logininput.focus();
                } else if (that._input_state == 'regist-success') {
                    that._psdinput.value = '';
                    that._logininput.value = '';
                    that._logininput.placeholder = 'Enter to login';
                    that._logininput.focus();
                    that._state = '/login';
                }
            }
        }
    };

    //LOG IN
    Main.prototype.sendBtn = function () {
        var that = this;
        document.onkeypress = function (e) {
            if(e.keyCode == 13){
                that._sendBtn.onclick();
            }
        };
        this._sendBtn.onclick = function () {
            if (that._logininput.value) {
                if (that._psdinput.value) {
                    new kevinaskin.Ajax({
                        url: that._state,
                        type: 'POST',
                        data: {
                            username: that._logininput.value,
                            password: md5(that._psdinput.value)
                        },
                        dataType: "json",
                        success: function (data) {
                            this._data = JSON.parse(data);
                            switch (this._data.code) {
                                case -1:
                                    location.href = '/admin';
                                    break;
                                case 1:
                                    // location.href = '/personal';
                                    location.reload();
                                    break;
                                case 0:
                                    that._worningmsg.innerHTML = this._data.msg;
                                    that._alertworning.style.display = 'block';
                                    that._input_state = 'username';
                                    break;
                                case 2:
                                    that._worningmsg.innerHTML = this._data.msg;
                                    that._alertworning.style.display = 'block';
                                    that._input_state = 'password';
                                    break;
                                case 3:
                                    that._worningmsg.innerHTML = this._data.msg;
                                    that._alertworning.style.display = 'block';
                                    that._input_state = 'regist-success';
                                    break;
                                case 4:
                                    that._worningmsg.innerHTML = this._data.msg;
                                    that._alertworning.style.display = 'block';
                                    that._input_state = 'name-fail';
                                    break;
                                case 5:
                                    that._worningmsg.innerHTML = this._data.msg;
                                    that._alertworning.style.display = 'block';
                                    that._input_state = 'other-fail';
                            }
                        },
                        fail: function (err) {
                            console.error(err);
                        }
                    })
                } else {
                    that._psdinput.placeholder = 'Please enter password';
                }
            } else {
                that._logininput.placeholder = 'Please enter username';
            }
        };
    };
    Main.prototype.init = function () {
        var asciiContainer = document.getElementById("ascii");
        var capturing = false;

        camera.init({
            width: 160,
            height: 120,
            fps: 30,
            mirror: true,

            onFrame: function (canvas) {
                ascii.fromCanvas(canvas, {
                    // contrast: 128,
                    callback: function (asciiString) {
                        asciiContainer.innerHTML = asciiString;
                    }
                });
            },

            onSuccess: function () {
                capturing = true;
                document.onkeydown = function () {
                    if (capturing) {
                        camera.pause();
                    } else {
                        camera.start();
                    }
                    capturing = !capturing;
                };
            },

            onError: function (error) {
                // TODO: log error
            },

            onNotSupported: function () {
                asciiContainer.style.display = "none";
            }
        });
    };
    new Main();
})();


