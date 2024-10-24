import asyncio
from reboot.aio.applications import Application
from reboot.aio.external import ExternalContext
from todos.v1.todos_rbt import (
    TodoList,
    TodoDetails
)
from todos_servicers import TodoServicer, TodoListServicer

TODO_LIST_ID = "todos"


async def initialize(context: ExternalContext):
  await TodoList.construct(id=TODO_LIST_ID).idempotently().Add(
    context, details=TodoDetails(name="Start TODO list!")
  )

async def main():
    await Application(
        servicers=[TodoServicer, TodoListServicer],
        initialize=initialize,
    ).run()


if __name__ == '__main__':
    asyncio.run(main())
