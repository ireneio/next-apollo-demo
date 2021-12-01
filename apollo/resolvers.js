import { v4 as uuidv4 } from 'uuid'
import { typeDefs } from './type-defs'

const roles = {
  employee: 'employee',
  manager: 'manager',
  user: 'user'
}

const taskStatus = {
  done: 'done',
  start: 'start',
  inProgress: 'inProgress'
}

const users = [
  { id: '1', name: 'employee1', role: roles.employee, employees: [] },
  { id: '2', name: 'manager1', role: roles.manager, employees: ['1', '5'] },
  { id: '3', name: 'user1', role: roles.user, employees: [] },
  { id: '4', name: 'user2', role: roles.user, employees: [] },
  { id: '5', name: 'employee2', role: roles.employee, employees: [] },
]

const tasks = [
  { id: '01', content: 'task0', createdBy: { name: 'employee2', id: '5'}, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '1', content: 'task1', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.start, editableBy: [{ name: 'user1', id: '3'}] },
  { id: '2', content: 'task2', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.inProgress, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '3', content: 'task3', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '4', content: 'task4', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '5', content: 'task5', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '6', content: 'task6', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '7', content: 'task7', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '8', content: 'task8', createdBy: { name: 'employee1', id: '1' }, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] },
  { id: '9', content: 'task9', createdBy: { name: 'employee2', id: '5' }, status: taskStatus.done, editableBy: [{ name: 'user2', id: '4'}] }
]

export const resolvers = {
  Query: {
    userInfo(parent, args, context) {
      const { id, name, role } = context
      return {
        id,
        name,
        role
      }
    },
    usersAvailable() {
      return users.filter((user) => user.role === roles.user).map(({ id, name, role }) => ({ id, name, role }))
    },
    tasks(parent, args, context) {
      const { id, role } = context
      const { startCursor, count } = args
      const response = {
        items: [],
        pageInfo: {
          startCursor,
          endCursor: '',
          totalCount: 0,
          hasNextPage: false
        }
      }
      if (!id) {
        return response
      }
      if (startCursor === undefined || count === undefined) {
        response.pageInfo.startCursor = ''
        response.items = tasks
        response.pageInfo.totalCount = tasks.length
        return response
      }
      let items = []
      switch (role) {
        case roles.employee: {
          items = tasks.filter((task) => task.createdBy.id === id)
          break
        }
        case roles.manager:
          const user = users.find((user) => user.id === id)
          if (!user) {
            return response
          }
          items = tasks.filter((task) => user.employees.includes(task.createdBy.id))
          break
        case roles.user: {
          items = tasks.filter((task) => task.editableBy.find((user) => user.id === id ))
          break
        }
        default:
          return response
      }
      const _endIndex = items.length < startCursor + count ? items.length : startCursor + count
      response.items = items.slice(startCursor, _endIndex)
      response.pageInfo.endCursor = _endIndex - 1
      response.pageInfo.hasNextPage = items.length > _endIndex
      response.pageInfo.totalCount = items.length
      return response
    }
  },
  Mutation: {
    addTask(parent, args, context) {
      const { content, editableBy } = args
      const { id, name } = context
      const _editableBy = editableBy.map((name) => {
        const _user = users.find((user) => user.name === name)
        if (_user) {
          const { id, name } = _user
          return { id, name }
        }
      })
      const task = { id: uuidv4(), content, createdBy: { id, name }, status: 'start', editableBy: _editableBy }
      tasks.unshift(task)
      return task
    },
    updateTaskStatus(parent, args) {
      const { id, status } = args
      const task = tasks.find((task) => task.id === id)
      if (task) {
        task.status = status
      }
      return task
    }
  }
}
