export function NoteCard() {
  return (
    <div className='rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative'>
      <span className='text-sm font-medium text-slate-300'>
        Adicionar nota
      </span>
      <p className='text-sm leading-6 text-slate-400'>
        Grave uma nota em áudio que será convertida para 
        texto automaticamente.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit eum \
        quasi ducimus fugit qui. Sed aspernatur, repellat amet minus ratione 
        cum est, quibusdam earum fugiat, ducimus atque culpa assumenda 
        laboriosam!
      </p>

      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/75 to-black/0 pointer-events-none' />
    </div>
  )
}