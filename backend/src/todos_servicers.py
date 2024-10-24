import asyncio
from todos.v1.todos_rbt import (
    Todo,
    TodoList,
    CreateRequest,
    CreateResponse,
    CompleteRequest,
    CompleteResponse,
    AddRequest,
    AddResponse,
    RemoveRequest,
    RemoveResponse,
    ListRequest,
    ListResponse,
    DetailsRequest,
    DetailsResponse,
)
from reboot.aio.contexts import ReaderContext, TransactionContext, WriterContext


class TodoServicer(Todo.Interface):

    async def Create(
        self,
        context: ReaderContext,
        state: Todo.State,
        request: CreateRequest,
    ) -> CreateResponse:
        state.details.CopyFrom(request.details)
        return CreateResponse()

    async def Details(
        self,
        context: ReaderContext,
        state: Todo.State,
        request: DetailsRequest,
    ) -> DetailsResponse:
        return DetailsResponse(details=state.details)

    async def Complete(
        self,
        context: WriterContext,
        state: Todo.State,
        request: CompleteRequest,
    ) -> CompleteResponse:
        state.details.done = True
        return CompleteResponse()


class TodoListServicer(TodoList.Interface):

    async def Add(
        self,
        context: TransactionContext,
        state: TodoList.State,
        request: AddRequest,
    ) -> AddResponse:
        todo, _ = await Todo.construct().Create(context, details=request.details)
        state.todo_ids.append(todo.state_id)
        return AddResponse()

    async def Remove(
        self,
        context: WriterContext,
        state: TodoList.State,
        request: RemoveRequest,
    ) -> RemoveResponse:
        state.todo_ids[:] = [
            todo_id for todo_id in state.todo_ids
            if todo_id != request.todo_id
        ]
        return RemoveResponse()
        
    async def List(
        self,
        context: ReaderContext,
        state: TodoList.State,
        request: ListRequest,
    ) -> ListResponse:

        async def details(todo_id):
            todo = Todo.lookup(todo_id)
            response = await todo.Details(context)
            return response.details

        return ListResponse(
            details={
                todo_id: await details(todo_id)
                for todo_id in state.todo_ids
            }
        )
