// 追記
function test(){
  sendToAllUser([generateMessage("こんにちは！")])
}

function stump(){
  sendToAllUser([{
    "type":"sticker",
    "packageId":"446",
    "stickerId":"1988"
  }])
}


function usecaseAddTask(params){
  const title = params.title
  const deadline = params.deadline
  if(!title)return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(createItem(title,deadline))
}

function usecaseGetTask(params){
  const id = params.id
  if(!id) return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(getOneItem(id))
}

function usecaseGetTaskList(params){
  return createSuccessResponse(getItems())
}

function usecaseUpdateTask(params){
  const id = params.id
  const title = params.title
  const deadline = params.deadline
  const isCompleted = params.isCompleted
  if(!id) return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(updateItem(id,title,deadline,isCompleted))
}

function usecaseDeleteTask(params){
  const id = params.id
  if(!id) return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(deleteItem(id))
}

function usecaseSendTodayTask(){
  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  const tasks = getItems({deadline:today})
  if(tasks.length == 0){
    sendToAllUser([generateMessage("本日のタスクはありません。")])
    return
  }
  sendToAllUser([generateMessage("本日のタスクが届いています"),generateTasksMessage(tasks)])
}