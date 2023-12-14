function init(){
  var sheetApp = SpreadsheetApp.openById(spreadSheetID)
  sheetApp.insertSheet("log");
  sheetApp.insertSheet("task");
  var sheet = sheetApp.getSheetByName("task");
  sheet.getRange(1, 1).setValue("id");
  sheet.getRange(1, 2).setValue("title");
  sheet.getRange(1, 3).setValue("deadline");
  sheet.getRange(1, 4).setValue("isCompleted");
  sheet.getRange(1, 5).setValue("createdAt");
}
