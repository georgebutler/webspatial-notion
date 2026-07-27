import { ListChecks, ListTodo } from 'lucide-react'
import { useMemo, useState } from 'react'

type TodoItem = { id: number; text: string; done: boolean }

const lists = ['User Flow & Interaction']
const defaultItems: TodoItem[] = [
  { id: 1, text: 'Review requirements', done: false },
  { id: 2, text: 'Outline tasks and owners', done: true },
  { id: 3, text: 'Track open questions', done: false },
  { id: 4, text: 'Schedule follow-up', done: false },
]

function getItems(title: string) {
  if (title.toLowerCase().includes('user flow')) {
    return [
      { id: 1, text: 'List core screens', done: true },
      { id: 2, text: 'Map interactions', done: false },
      { id: 3, text: 'Validate edge cases', done: false },
      { id: 4, text: 'Share review notes', done: false },
    ]
  }
  return defaultItems
}

function Checklist({ items, onToggle }: { items: TodoItem[]; onToggle?: (id: number) => void }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => onToggle?.(item.id)}
            readOnly={!onToggle}
            aria-label={`todo-${item.id}`}
            className="mt-1.5 h-4 w-4 shrink-0 accent-cyan-500"
          />
          <span className={`break-words text-[16px] leading-7 ${item.done ? 'text-neutral-700 line-through' : 'text-neutral-900'}`}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ListContent({ title, items, onToggle }: { title: string; items: TodoItem[]; onToggle?: (id: number) => void }) {
  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="mt-4">
        <Checklist items={items} onToggle={onToggle} />
      </div>
      <p className="mt-4 text-[14px] text-neutral-600">Last updated: Today — Checklist</p>
    </>
  )
}

export default function Todo() {
  const selectedTitle = new URLSearchParams(window.location.search).get('title')
  const initialIndex = selectedTitle ? lists.findIndex((title) => title === selectedTitle) : -1
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const [items, setItems] = useState<TodoItem[]>(() =>
    initialIndex >= 0 ? getItems(lists[initialIndex]) : [],
  )
  const selectedTitleForView = selectedIndex >= 0 ? lists[selectedIndex] : null

  const selectList = (index: number) => {
    setSelectedIndex(index)
    setItems(getItems(lists[index]))
  }

  const toggleItem = (id: number) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))
  }

  const mobileItems = useMemo(() => (lists[0] ? getItems(lists[0]) : []), [])

  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'regular' }}
      className="flex h-full w-full flex-col items-start overflow-hidden border border-white/10 p-4 shadow sm:p-6 md:p-8 lg:p-12"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col gap-4 lg:flex-row lg:gap-6">
        <aside className="notion-todo-sidebar hidden h-full min-h-0 w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex">
          <div className="flex items-center gap-2 text-white/90">
            <ListTodo size={20} strokeWidth={1.8} aria-hidden="true" />
            <h1 className="text-lg font-semibold">Todo List</h1>
          </div>
          <div className="mt-6 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
            <div className="flex items-center gap-2 px-3 text-white/60">
              <ListChecks size={16} strokeWidth={1.8} aria-hidden="true" />
              <h2 className="text-sm font-medium">Lists</h2>
            </div>
            <ul className="mt-2 space-y-2">
              {lists.map((title, index) => (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => selectList(index)}
                    title={title}
                    className={`w-full truncate rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
                      selectedIndex === index ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={`notion-todo-content h-full min-h-0 w-full min-w-0 flex-1 overflow-auto rounded-2xl px-6 py-8 lg:hidden ${mobileItems.length ? 'bg-white text-neutral-900' : 'bg-white/10 text-neutral-200'}`}>
          <div className="w-full">
            {mobileItems.length ? <ListContent title={lists[0]} items={mobileItems} /> : <h1 className="text-2xl font-semibold">Select a list to get started</h1>}
          </div>
        </div>

        <div className={`notion-todo-content hidden h-full min-h-0 min-w-0 flex-1 overflow-auto rounded-2xl px-6 py-8 lg:block ${selectedTitleForView ? 'bg-white text-neutral-900' : 'bg-white/10 text-neutral-200'}`}>
          <div className="w-full">
            {selectedTitleForView ? (
              <ListContent title={selectedTitleForView} items={items} onToggle={toggleItem} />
            ) : (
              <h1 className="text-lg font-semibold text-white/90">Click a list on the left to get started</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
