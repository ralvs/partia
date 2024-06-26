'use server'

import { createStreamableValue } from 'ai/rsc'

export const runThread = async () => {
  const data = [
    [
      { hotel: 'source1 - hotel11', price: 100 },
      { hotel: 'source1 - hotel12', price: 200 },
    ],
    [
      { hotel: 'source2 - hotel21', price: 300 },
      { hotel: 'source2 - hotel22', price: 50 },
    ],
    [
      { hotel: 'source3 - hotel31', price: 150 },
      { hotel: 'source3 - hotel32', price: 250 },
    ],
  ]

  const streamableStatus = createStreamableValue<{ hotel: string; price: number }[]>()

  setTimeout(async () => {
    Promise.all(
      [0, 1, 2].map(async i => {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 5000)) // simulate delay

        return streamableStatus.update(data[i])
      }),
    ).then(() => {
      streamableStatus.done([])
    })
  }, 1000)

  return { list: streamableStatus.value }
}
