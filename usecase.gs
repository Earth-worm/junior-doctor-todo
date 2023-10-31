function usecaseAddTask(params){
  var title = params.title
  var deadline = params.deadline
  if(!title)return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(createItem(title,deadline))
}

function usecaseGetTask(params){
  var id = params.id
  if(!id) return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(getOneItem(id))
}

function usecaseGetTaskList(params){
  return createSuccessResponse(getItems())
}

function usecaseUpdateTask(params){
  var id = params.id
  var title = params.title
  var deadline = params.deadline
  var isCompleted = params.isCompleted
  if(!id) return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(updateItem(id,title,deadline,isCompleted))
}

function usecaseDeleteTask(params){
  var id = params.id
  if(!id) return createFailureResponse(-32602,"invalid params")
  return createSuccessResponse(deleteItem(id))
}