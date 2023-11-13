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