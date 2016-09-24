/**
 * Created by Kevinaskin on 2016/9/24.
 */
(function () {
    function Init() {
        this.render();

    }

    Init.prototype.switchTags = function (tags) {
        switch (tags){
            case 0:
                return "Piece";break;
            case 1:
                return "Blog";break;
            case 2:
                return "Photo";break;
        }
    };
    Init.prototype.renderArticleList = function (titleName,tagsName,idNumber,textContent) {

        var articleContainer = document.createElement('div');
        articleContainer.setAttribute('class','article-container');
        var title = document.createElement('h1');
        var tags = document.createElement('p');
        var id = document.createElement('span');
        var text = document.createElement('p');
        text.setAttribute('class','text-p');
        id.setAttribute('class','article-id-number');


        title.innerHTML = "Article_title&nbsp;&nbsp;&nbsp;&nbsp;"+titleName;
        tags.innerHTML ="TagName:<span class='sub-span'>"+ tagsName+"</span>";
        id.innerHTML = idNumber;
        id.style.display = 'none';
        text.innerHTML = "<span class='sub-span'>"+textContent+"</span>";

        articleContainer.appendChild(title);
        // articleContainer.appendChild(tags);
        articleContainer.appendChild(id);
        articleContainer.appendChild(text);

        document.getElementById('article-box').appendChild(articleContainer);

    };
    Init.prototype.render = function () {
        var that = this;
        this._pageTitle = document.getElementById('page-title').innerHTML;
        // console.log(this._pageTitle);
        new kevinaskin.Ajax({
            url:'/api/'+this._pageTitle,
            type:'get',
            data: {},
            dataType: "json",
            success: function (data) {
                // console.log(data);
                this._data = JSON.parse(data);
                for(var i=0;i<this._data.length;i++){
                    that.renderArticleList(
                        this._data[i].title,
                        that.switchTags(this._data[i].tags),
                        this._data[i].id,
                        this._data[i].text
                    )
                }
            },
            fail: function (err) {
                console.error(err);
            }
        })
    };
    new Init();
})();