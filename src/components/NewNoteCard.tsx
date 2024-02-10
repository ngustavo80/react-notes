import * as Dialog from '@radix-ui/react-dialog' 
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  createNewNote: (content: string) => void
}

export function NewNoteCard({ createNewNote }: NewNoteCardProps) {
  const [shouldShowOnboard, setShouldShowOnboard] = useState(true)
  const [content, setContent] = useState('')

  function handleShowDashboard() {
    setShouldShowOnboard(false)
  }

  function handleTextareaValue(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value === '') {
      setShouldShowOnboard(true)
    }

    setContent(event.target.value)
  }

  function handleCreateNewNote(event: FormEvent) {
    event.preventDefault()

    if(content === '') {
      return toast.error('Por favor, escreva sua anotação')
    }

    createNewNote(content)
    setContent('')
    setShouldShowOnboard(true)

    toast.success('Anotação criada com sucesso!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md bg-slate-700 p-5 gap-3 text-left flex flex-col outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-200'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] overflow-hidden bg-slate-700 rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute right-0 p-1.5 text-slate-500 bg-slate-800 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>
          
          <form className='flex flex-1 flex-col' onSubmit={handleCreateNewNote}>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-slate-300'>
                Adicionar nota
              </span>
              {shouldShowOnboard ? 
                <p className='text-sm leading-6 text-slate-400'>
                  Comece <button className='text-lime-400 font-semibold hover:underline'>gravando sua nota</button> em áudio ou se preferir <button onClick={handleShowDashboard} className='text-lime-400 font-semibold hover:underline'>utilize apenas texto</button>
                </p>
              :
                <textarea 
                  value={content} 
                  onChange={handleTextareaValue} 
                  autoFocus 
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                />
              }
            </div>

            <button 
              disabled={shouldShowOnboard} 
              type='submit' 
              className='w-full bg-lime-400 py-4 font-semibold text-center text-sm text-lime-950 outline-none hover:enabled:bg-lime-500 disabled:cursor-not-allowed'
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}