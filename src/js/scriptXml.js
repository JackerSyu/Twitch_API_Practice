var clientId = 'wnlc89u86vwa7lrmdnzz7haxdatq1z';
var limit = 2;
// var apiUrl = 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=League%20of%20Legends&limit='+ limit;

var apiUrl = 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit='+ limit;

// clientId 可以透過網址傳或利用requestHeader傳 這邊示範用header傳


// 有關 XMLHttpRequest API：https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.open("GET", apiUrl, true);
xhr.setRequestHeader('client-id', clientId);
xhr.send();

// 接資料
xhr.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200) //resadyState == 4 代表完成（看XML的APIreference）
    {
         // response 的資料 透過json pares 之後再log出來
        var data = JSON.parse(this.responseText);
        console.log(data);
    }
}

// 開啓html後按f12 看networ的preview那有沒有收到response回傳的資料