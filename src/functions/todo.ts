import { createServerFn } from '@tanstack/react-start'
import { prisma } from '../db'
import { z } from 'zod'

export const getTodos = createServerFn({ method: 'GET' }).handler(async () => {
  return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  })
})

export const addTodo = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ title: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { title } = data
    return await prisma.todo.create({
      data: {
        title,
      },
    })
  })

export const toggleTodo = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ id: z.number(), completed: z.boolean() }).parse(data))
  .handler(async ({ data }) => {
    const { id, completed } = data
    return await prisma.todo.update({
      where: { id },
      data: { completed },
    })
  })

export const deleteTodo = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ id: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const { id } = data
    return await prisma.todo.delete({
      where: { id },
    })
  })
