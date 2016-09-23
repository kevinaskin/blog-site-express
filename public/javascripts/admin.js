/**
 * Created by Kevinaskin on 2016/9/23.
 */
(function () {
    function Main() {
        this.getElements();
        this.addListeners();
    }

    Main.prototype.getElements = function () {
        this._logout = document.getElementById('logout');
    };

    Main.prototype.addListeners = function () {
        var that = this;
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
        }
    };
    
    new Main();
})();