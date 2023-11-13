// itemを追加
function createItem(title,deadline){
  var sheetName = "task";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var newRow = lastRow + 1;
  var id = generateRandomString(8);

  sheet.getRange(newRow, 1).setValue(id);
  sheet.getRange(newRow, 2).setValue(title);
  sheet.getRange(newRow, 3).setValue(deadline);
  sheet.getRange(newRow, 4).setValue(false);
  return {
    id: id,
    title: title,
    deadline: deadline,
    isCompleted: false,
  }
}

// itemを更新
function updateItem(id,title,deadline,isCompleted){
  var sheetName = "task";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    console.log(values[i][0])
    if (id !== values[i][0]) continue
    if(title) sheet.getRange(i+1,2).setValue(title)
    if(deadline) sheet.getRange(i+1,3).setValue(deadline)
    if(isCompleted !== null && isCompleted !== undefined) sheet.getRange(i+1,4).setValue(isCompleted)
  }
}

// item一覧を取得
function getItems(){
  var sheetName = "task";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var items = [];

  for (var i = 1; i < values.length; i++) {
    var item = {
      id: values[i][0],
      title: values[i][1],
      deadline: values[i][2],
      isCompleted: values[i][3],
    };
    items.push(item);
  }
  return items
}

// itemを取得
function getOneItem(id){
  var sheetName = "task";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    if(id !== values[i][0]) continue
    var item = {
      id: values[i][0],
      title: values[i][1],
      deadline: values[i][2],
      isCompleted: values[i][3],
    };
    return item
  }
}

// itemを削除
function deleteItem(id){
  var sheetName = "task";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  for (var i = 1; i < values.length; i++) {
    if (id !== values[i][0]) continue
    var item = {
      id: values[i][0],
      title: values[i][1],
      deadline: values[i][2],
      isCompleted: values[i][3],
    };
    sheet.deleteRow(i + 1);
    return item;
  }
}

// idをランダム生成する関数
function generateRandomString(length) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
