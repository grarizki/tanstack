import { createFileRoute } from '@tanstack/react-router'
import { getTodos, addTodo, toggleTodo, deleteTodo } from '../functions/todo'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Trash2, CheckCircle, Circle, Plus, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: TodoApp,
  loader: async () => await getTodos(),
})

function TodoApp() {
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState('')

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  })

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setNewTodo('')
    },
  })

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    addMutation.mutate({ data: { title: newTodo } })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="p-6 bg-slate-800/50 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Tasks
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your daily goals
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="relative mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 pr-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              disabled={addMutation.isPending}
            />
            <button
              type="submit"
              disabled={addMutation.isPending || !newTodo.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </form>

          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-8 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No tasks yet. Add one above!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`group flex items-center justify-between p-3 rounded-lg border transition-all ${
                    todo.completed
                      ? 'bg-slate-900/50 border-slate-800 opacity-60'
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() =>
                        toggleMutation.mutate({
                          data: { id: todo.id, completed: !todo.completed },
                        })
                      }
                      disabled={toggleMutation.isPending}
                      className={`flex-shrink-0 transition-colors ${
                        todo.completed
                          ? 'text-cyan-500'
                          : 'text-slate-500 hover:text-cyan-400'
                      }`}
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <span
                      className={`truncate ${
                        todo.completed ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      deleteMutation.mutate({ data: { id: todo.id } })
                    }
                    disabled={deleteMutation.isPending}
                    className="ml-2 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
