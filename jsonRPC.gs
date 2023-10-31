function rpcTest(){
  try{
    rpcHandler("deleteTask",{id:"H2Hmqg4N"})
  }catch(e){
    console.error(e)
  }
}

function rpcHandler(method,params){
  switch(method){
    case "addTask":
      return usecaseAddTask(params)
    case "getTask":
      return usecaseGetTask(params)
    case "getTaskList":
      return usecaseGetTaskList(params)
    case "updateTask":
      return usecaseUpdateTask(params)
    case "deleteTask":
      return usecaseDeleteTask(params)
  } 
  return createFailureResponse(-32601,"invalid method")
}

function createFailureResponse(code,message){
  sContent = JSON.stringify({
    error:{
      code: code,
      message: message,
    },
  })
  var output = ContentService.createTextOutput()
  output.setMimeType(ContentService.MimeType.JSON)
  output.setContent(sContent)
  return output
}

function createSuccessResponse(result){
    sContent = JSON.stringify({
    result:result,
  })
  var output = ContentService.createTextOutput()
  output.setMimeType(ContentService.MimeType.JSON)
  output.setContent(sContent)
  return output
}