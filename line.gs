// 参考ページ
// API method: https://developers.line.biz/ja/reference/messaging-api/#get-narrowcast-progress-status
// メッセージ作成: https://developers.line.biz/flex-simulator/
function parseEvent(request){
    //LINE Messaging APIのチャネルアクセストークンを設定
    // WebHookで取得したJSONデータをオブジェクト化し、取得
    let eventData = JSON.parse(request.postData.contents).events[0];
    return eventData
}

function requestLineAPI(method,url,payload){
  const options = {
    'payload' : JSON.stringify(payload),
    'myamethod'  : method,
    'headers' : {"Authorization" : "Bearer " + PropertiesService.getScriptProperties().getProperty("LineToken")},
    'contentType' : 'application/json'
  };
  log(JSON.stringify(payload))
  var resp = UrlFetchApp.fetch(url, options);
}

// ユーザからのメッセージへ返信
function replyMessage(replyToken,messages){
  requestLineAPI(
    "POST",
    "https://api.line.me/v2/bot/message/reply",
    {
      'replyToken': replyToken,
      'messages': messages,
    },
  )
}

// 全てのユーザへメッセージを送信
function sendToAllUser(messages){
    requestLineAPI(
    "POST",
    "https://api.line.me/v2/bot/message/broadcast",
    {
      'messages': messages,
    },
  )
}

function generateMessage(message){
  return{
    "type":"text",
    "text":message,
  }  
}

function generateTasksMessage(tasks){
  var bubbles = []
  const colors = ["#BBFFFF","#FFDDFF","#FFFFDD","#EEEEEE"]
  for(const index in tasks){
    bubbles.push(generateTaskBubble(tasks[index],colors[index % colors.length]))
  }
  return{
    "type": "flex",
    "altText": "This is a Flex Message",
    "contents": {
      "type": "carousel",
      "contents": bubbles,
    }
  }
}

function generateTaskBubble(task,color){
  const deadline = task.deadline.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  const createdAt = task.createdAt.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  return {
    "type": "bubble",
    "size": "deca",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": task.title,
          "color": "#000000",
          "align": "center",
          "size": "md",
          "gravity": "center"
        }
      ],
      "backgroundColor": color,
      "paddingTop": "19px",
      "paddingAll": "12px",
      "paddingBottom": "16px"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "color": "#8C8C8C",
              "size": "xxs",
              "wrap": true,
              "text": "deadline: " + deadline,
            },
            {
              "type": "text",
              "color": "#8C8C8C",
              "size": "xxs",
              "wrap": true,
              "text": "createdAt: "+ createdAt,
            }
          ],
          "flex": 1
        }
      ],
      "spacing": "md",
      "paddingAll": "12px"
    },
    "styles": {
      "footer": {
        "separator": false
      }
    }
  }
}