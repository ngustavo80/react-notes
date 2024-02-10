import { ChangeEvent, useState } from 'react'
import logo from './assets/logoNLWExpert.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/NoteCard'

export interface NoteType {
  id: string
  date: Date
  content: string
}

export function App() {
  const [filter, setFilter] = useState('')
  const [notes, setNotes] = useState<NoteType[]>(() => {
    const notesOnLocalStorage = localStorage.getItem('notes@1.0.0')

    if(notesOnLocalStorage) {
      return JSON.parse(notesOnLocalStorage)
    }
    
    return []
  })

  function createNewNote(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date,
      content
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes@1.0.0', JSON.stringify(notesArray))
  }

  function handleFilter(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const filteredNotesArray = filter !== '' ? notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase())) : notes

  function handleDeleteNote(id: string) {
    
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...' 
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'  
          onChange={handleFilter}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard createNewNote={createNewNote} />

        {filteredNotesArray.map( note => {
          return <NoteCard key={note.id} note={note} handleDeleteNote={handleDeleteNote} />
        })}
      </div>
    </div>
  )
}