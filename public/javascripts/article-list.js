/**
 * Created by Kevinaskin on 2016/9/24.
 */
(function () {

    function Main() {

        this.init();

    }
    Main.prototype.delArticleBtn = function () {
        var dels = document.getElementsByClassName('del-article-btn');
        var ids = document.getElementsByClassName('article-id-number');

        for(var i =0;i<dels.length;i++){
            (function (i) {
                dels[i].onclick=function () {
                    console.log(ids[i].innerHTML);
                    new kevinaskin.Ajax({
                        url:'/api/del-article',
                        type:'post',
                        data: {id:ids[i].innerHTML},
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
    Main.prototype.switchAbstract = function (text,abstractLength) {
        var str = text.substring(0,abstractLength);
        return str+"...";
    };
    Main.prototype.switchTags = function (tags) {
        switch (tags){
            case 0:
                return "Piece";break;
            case 1:
                return "Blog";break;
            case 2:
                return "Photo";break;
        }
    };
    Main.prototype.renderArticleList = function (titleName,tagsName,idNumber,textContent) {

        var articleContainer = document.createElement('div');
        articleContainer.setAttribute('class','article-container');
        var title = document.createElement('h3');
        var tags = document.createElement('p');
        var id = document.createElement('span');
        var text = document.createElement('p');
        var del = document.createElement('p');
        id.setAttribute('class','article-id-number');
        del.style.color = 'red';
        del.innerHTML = 'DELETE THIS ARTICLE';
        del.setAttribute('class','del-article-btn');

        title.innerHTML = "Article_title&nbsp;&nbsp;&nbsp;&nbsp;"+titleName;
        tags.innerHTML ="TagName:<span class='sub-span'>"+ tagsName+"</span>";
        id.innerHTML = idNumber;
        id.style.display = 'none';
        text.innerHTML = "Abstract:<span class='sub-span'>"+textContent+"</span>";

        articleContainer.appendChild(title);
        articleContainer.appendChild(tags);
        articleContainer.appendChild(id);
        articleContainer.appendChild(text);
        articleContainer.appendChild(del);

        document.getElementById('article-box').appendChild(articleContainer);

    };
    Main.prototype.init = function () {
        var that = this;
        new kevinaskin.Ajax({
            url:'/api/article-get',
            type:'get',
            data: {},
            dataType: "json",
            success: function (data) {
                this._data = JSON.parse(data);
                // console.log(data);
                // console.log(that.switchAbstract(this._data[0].text));
                for(var i=0;i<this._data.length;i++){
                    that.renderArticleList(
                        this._data[i].title,
                        that.switchTags(this._data[i].tags),
                        this._data[i].id,
                        that.switchAbstract(this._data[i].text,35)
                    )
                }
                if(i == this._data.length){
                    that.delArticleBtn();
                }
            },
            fail: function (err) {
                console.error(err);
            }
        })
    };

    new Main();
})();