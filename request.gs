function doGet(){
  const template = HtmlService.createTemplateFromFile("index.html")
  template.URL = ScriptApp.getService().getUrl()
  // template.URL = "https://script.google.com/macros/s/AKfycbznGNmO-E4o1d0opxqQDaubjCedU3gK-_mJM45B9ZDhvcVumD-mRGNH1EBtVeRRTdv_/exec"                                           
  return template.evaluate();
}


function doPost(request){
  log(request)
  try{
    var body = JSON.parse(request.postData.getDataAsString());
    var method = body["method"]
    var params = body["params"]
    return rpcHandler(method,params)
  }catch(e){
    log(JSON.stringify(e))
    return createFailureResponse(-32603,JSON.stringify(e))
  }
}

function log(request){
  var sheet = SpreadsheetApp.openById(spreadSheetID).getSheetByName("log");
  var lastRow = sheet.getLastRow();
  var newRow = lastRow + 1;
  var today = new Date();
  var formatted = today.toLocaleString('ja-JP-u-ca-japanese');
  
  sheet.getRange(newRow, 1).setValue(formatted);
  sheet.getRange(newRow, 2).setValue(request);
 }