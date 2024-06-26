'use client'

import { readStreamableValue } from 'ai/rsc'
import { useState } from 'react'
import { runThread } from './actions'

export default function Home() {
  const [state, setState] = useState<{ hotel: string; price: number }[]>([])

  return (
    <main className='flex min-h-screen flex-col items-center justify-evenly p-24'>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type='button'
          onClick={async () => {
            setState([])
            const { list } = await runThread()

            for await (const value of readStreamableValue(list)) {
              if (value?.length) {
                setState(prev => {
                  return [...prev, ...value].sort((a, b) => a.price - b.price)
                })
              }
            }
          }}
        >
          Search
        </button>
      </div>

      <div className='flex flex-col gap-4 p-4'>
        {state.map((entry, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div className='flex flex-row gap-16 table-auto' key={index}>
            <span>{entry.hotel}</span>
            <span className='flex-1 text-right'>$ {entry.price}</span>{' '}
          </div>
        ))}
      </div>
    </main>
  )
}
