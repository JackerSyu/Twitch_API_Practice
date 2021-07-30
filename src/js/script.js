let nowIndex = 0;
let isLoading = false;
let LANG = 'zh';

function changeLang(lang){
  console.log("change language : "+ lang);
  $('.row h1').text(window.I18N[lang]['TITLE']);
  nowIndex = 0;
  LANG = lang;
  $('.deafult-row').empty();
  appendData(LANG);
}


// clientId 到這：https://dev.twitch.tv/docs/v5/#introduction
function getData (lang, cb) {
    const api = 'https://api.twitch.tv/helix/streams';
    const clientId = '7xrokwvayhyqw2zpaq0fhdo1sdahvf';
    const accessToken = 'ywa3d1z0heq0yn4o5b9hqjfkojlzea'; // 強制每60天要更新
    const queryString = `?game_id=21779&language=${lang}`;
    isLoading = true;

    const request = new XMLHttpRequest();
    request.open('GET', api + queryString, true);
    request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    request.setRequestHeader('Client-Id', clientId);
    request.send();
   
    request.onload = function(e){
      const results = JSON.parse(request.response).data;
      cb(null,results);
  }
}

function getUser (id, cb) {
  const api = 'https://api.twitch.tv/helix/users';
  const clientId = '7xrokwvayhyqw2zpaq0fhdo1sdahvf';
  const accessToken = 'ywa3d1z0heq0yn4o5b9hqjfkojlzea';
  const queryString = "?id="+id;
  isLoading = true;

  const request = new XMLHttpRequest();
  request.open('GET', api + queryString, true);
  request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  request.setRequestHeader('Client-Id', clientId);
  request.send();
 
  request.onload = function(e){
    const user = JSON.parse(request.response).data;
    cb(null,user);
  }

}

function appendData(lang){
  getData(lang,(err, data) => {
    // console.log(data)
    const streams = data;
    const $deafult_row = $('.deafult-row'); // html 裏的 class='deafult-row'
    
    for(let stream of streams)
    {
      getUser(stream.user_id,(err, usersData) => {
        for(let userData of usersData)
        {
          // console.log(userData);
          $deafult_row.append(getColumn(stream, userData));
        }
        
      })
        
    }
    nowIndex += 20;
    isLoading = false;
  })
}



$(document).ready(() =>{
  appendData(LANG);
  $(window).scroll(() => {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 200)
    {
      if(!isLoading){
        appendData(LANG);
      }
    }
  
  })
})

function getColumn(data, userData)
{
  const thumbnaillURL = data.thumbnail_url.replace('-{width}x{height}', '');
  return `
  <a href="https://www.twitch.tv/${data.user_login}" target="_blank">
    <div class="deafult-col">
      <div class="preview">
        <img src="${thumbnaillURL}" onload="this.style.opacity=1"> 
      </div>
      <div class="deafult-bottom">
        <div class="avatar">
          <img src="${userData.profile_image_url}" onload="this.style.opacity=1">
        </div>
        <div class="intro">
          <div class="channel_name">${data.title}</div>
          <div class="owner_name">${data.user_name}</div>
        </div>
      </div>
    </div>
  </a>
  `
}

