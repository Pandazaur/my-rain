import { Howl } from 'howler'
import { create } from 'zustand/react'
// @ts-ignore
import Storm1 from '../assets/sounds/thunders/distant-thunder-01.wav'
// @ts-ignore
import Storm2 from '../assets/sounds/thunders/distant-thunder-02.wav'
// @ts-ignore
import Storm3 from '../assets/sounds/thunders/distant-thunder-03.wav'
// @ts-ignore
import Storm4 from '../assets/sounds/thunders/distant-thunder-04.wav'
// @ts-ignore
import Storm5 from '../assets/sounds/thunders/distant-thunder-05.wav'
// @ts-ignore
import Storm6 from '../assets/sounds/thunders/distant-thunder-06.wav'
// @ts-ignore
import Storm7 from '../assets/sounds/thunders/distant-thunder-07.wav'
// @ts-ignore
import Storm8 from '../assets/sounds/thunders/distant-thunder-08.wav'
// @ts-ignore
import Storm9 from '../assets/sounds/thunders/distant-thunder-09.wav'
// @ts-ignore
import Storm10 from '../assets/sounds/thunders/distant-thunder-10.wav'
// @ts-ignore
import Storm11 from '../assets/sounds/thunders/distant-thunder-11.wav'
// @ts-ignore
import Storm12 from '../assets/sounds/thunders/distant-thunder-12.wav'
// @ts-ignore
import Storm13 from '../assets/sounds/thunders/distant-thunder-13.wav'
// @ts-ignore
import Storm14 from '../assets/sounds/thunders/distant-thunder-14.wav'
// @ts-ignore
import Storm15 from '../assets/sounds/thunders/distant-thunder-15.wav'
// @ts-ignore
import Storm16 from '../assets/sounds/thunders/distant-thunder-16.wav'
// @ts-ignore
import Storm17 from '../assets/sounds/thunders/distant-thunder-17.wav'
// @ts-ignore
import Storm18 from '../assets/sounds/thunders/distant-thunder-18.wav'
// @ts-ignore
import Storm19 from '../assets/sounds/thunders/distant-thunder-19.wav'
import { getRandomInt } from '../utils/numbers.ts'

export type StormKey = 'none' | 'light'

type Store = {
    stormPlayed?: Howl
    stormVolume: number
    // changeStorm: (key: StormKey) => unknown
    changeVolume: (volume: number) => unknown
    playRandomStorm: () => unknown
}

const storms = [
    new Howl({ src: [Storm1] }),
    new Howl({ src: [Storm2] }),
    new Howl({ src: [Storm3] }),
    new Howl({ src: [Storm4] }),
    new Howl({ src: [Storm5] }),
    new Howl({ src: [Storm6] }),
    new Howl({ src: [Storm7] }),
    new Howl({ src: [Storm8] }),
    new Howl({ src: [Storm9] }),
    new Howl({ src: [Storm10] }),
    new Howl({ src: [Storm11] }),
    new Howl({ src: [Storm12] }),
    new Howl({ src: [Storm13] }),
    new Howl({ src: [Storm14] }),
    new Howl({ src: [Storm15] }),
    new Howl({ src: [Storm16] }),
    new Howl({ src: [Storm17] }),
    new Howl({ src: [Storm18] }),
    new Howl({ src: [Storm19] }),
]

const useRainStore = create<Store>((set) => ({
    stormPlayed: undefined,
    stormVolume: 1,
    changeVolume: (volume: number) => {
        set((state) => {
            if (state.stormPlayed) {
                state.stormPlayed.volume(volume)
            }

            return { stormVolume: volume }
        })
    },
    playRandomStorm: () => {
        set((state) => {
            const randomIndex = getRandomInt(0, storms.length - 1)
            const storm = storms[randomIndex]

            storm.volume(state.stormVolume)
            storm.play()

            return { stormPlayed: storm }
        })
    },
}))

export default useRainStore
