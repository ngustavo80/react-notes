import logo from './assets/logoNLWExpert.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/NoteCard'

const content = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non a aut, odio, soluta ea culpa delectus amet dolores impedit accusamus beatae at, reprehenderit odit vel explicabo. Sit vel qui rem?'

export function App() {
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...' 
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'  
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard />

        <NoteCard 
          note={{date: new Date(), content: content}}
        />
      </div>
    </div>
  )
}