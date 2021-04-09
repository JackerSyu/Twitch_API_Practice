var clientId = '7xrokwvayhyqw2zpaq0fhdo1sdahvf';
var limit = 2;
var apiUrl = 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=League%20of%20Legends&limit='+ limit;

// 使用ajax前 要在html 文件裏面 include jquery 才可以使用 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 

$.ajax({
    url: apiUrl,
    success:(response) =>{
        console.log(response);
    }
})


