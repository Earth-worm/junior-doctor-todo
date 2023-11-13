function parseEvent(request){
    //LINE Messaging APIのチャネルアクセストークンを設定
    // WebHookで取得したJSONデータをオブジェクト化し、取得
    let eventData = JSON.parse(request.postData.contents).events[0];
    return eventData
}

function sendMessage(replyToken,msg){
  let url = "https://api.line.me/v2/bot/message/reply"
  //APIリクエスト時にセットするペイロード値を設定する
  let payload = {
    'replyToken': replyToken,
    'messages': [
      msg
    ]
  };
  //HTTPSのPOST時のオプションパラメータを設定する
  let options = {
    'payload' : JSON.stringify(payload),
    'myamethod'  : 'POST',
    'headers' : {"Authorization" : "Bearer " + PropertiesService.getScriptProperties().getProperty("LineToken")},
    'contentType' : 'application/json'
  };
  log(JSON.stringify(payload))
  //LINE Messaging APIにリクエストし、ユーザーからの投稿に返答する
  var resp = UrlFetchApp.fetch(url, options);
}