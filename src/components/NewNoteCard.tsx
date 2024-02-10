import * as Dialog from '@radix-ui/react-dialog' 
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  createNewNote: (content: string) => void
}

export function NewNoteCard({ createNewNote }: NewNoteCardProps) {
  const [shouldShowOnboard, setShouldShowOnboard] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
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
      return toast.error('Por favor, escreva sua anotação antes de salvar')
    }

    createNewNote(content)
    setContent('')
    setShouldShowOnboard(true)

    toast.success('Anotação criada com sucesso!')
  }

  function handleStartRecording() {
    setIsRecording(true)
    setShouldShowOnboard(false)

    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if(!isSpeechRecognitionAPIAvailable) {
      alert('Infelizmente a API de reconhecimento de fala não está disponível')
      return
    }

    const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition
    const speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR' // Idioma para a gravação
    speechRecognition.continuous = true // Essa propriedade faz com que a gravação só pare manualmente
    speechRecognition.maxAlternatives = 1 // Retorna apenas 1 opção quando não entende oq o usuário falou
    speechRecognition.interimResults = true // Retorna o resultado em tempo real, conforme o usuário fala

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
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
        <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] overflow-hidden bg-slate-700 md:rounded-md flex flex-col outline-none'>
          <Dialog.Close onClick={() => setShouldShowOnboard(true)} className='absolute right-0 p-1.5 text-slate-500 bg-slate-800 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>
          
          <form className='flex flex-1 flex-col' onSubmit={handleCreateNewNote}>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-slate-300'>
                Adicionar nota
              </span>
              {shouldShowOnboard ? 
                <p className='text-sm leading-6 text-slate-400'>
                  Comece <button type='button' onClick={handleStartRecording} className='text-lime-400 font-semibold hover:underline'>gravando sua nota</button> em áudio ou se preferir <button type="button" onClick={handleShowDashboard} className='text-lime-400 font-semibold hover:underline'>utilize apenas texto</button>
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

            {isRecording ?
              <button 
                type='button' 
                className='flex justify-center items-center gap-2 w-full bg-slate-900 py-4 font-semibold text-center text-sm text-slate-30 outline-none hover:text-slate-100'
                onClick={handleStopRecording}
              >
                <div className='rounded-full size-3 bg-red-600 animate-pulse' />
                Gravando! (clique para interromper e salvar)
              </button>
              : 
              <button 
                disabled={shouldShowOnboard} 
                type='submit' 
                className='w-full bg-lime-400 py-4 font-semibold text-center text-sm text-lime-950 outline-none hover:enabled:bg-lime-500 disabled:cursor-not-allowed'
              >
                Salvar nota
              </button>
            }
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}