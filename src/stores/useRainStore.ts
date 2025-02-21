import { Howl } from 'howler'
import { create } from 'zustand/react'
// @ts-ignore
import HeavyRain from '../assets/sounds/rain/heavy_loop.wav'
// @ts-ignore
import LightRain from '../assets/sounds/rain/light_loop.wav'
// @ts-ignore
import UmbrellaRain from '../assets/sounds/rain/rain_umbrella_loop.wav'

export type RainKey = 'none' | 'light' | 'umbrella' | 'heavy'

type Rain = {
    key: RainKey
    sound?: Howl
}

type Store = {
    playedRain: Rain
    rainVolume: number
    changeRain: (rainKey: RainKey) => unknown
    changeVolume: (volume: number) => unknown
}

const FADE_DURATION = 2_000

function createRainSound(src: string) {
    const rainSound = new Howl({ src })

    rainSound.loop(true)
    rainSound.volume(1)

    return rainSound
}

const rainSounds: Rain[] = [
    {
        key: 'none',
    },
    {
        key: 'light',
        sound: createRainSound(LightRain),
    },
    {
        key: 'umbrella',
        sound: createRainSound(UmbrellaRain),
    },
    {
        key: 'heavy',
        sound: createRainSound(HeavyRain),
    },
]

const useRainStore = create<Store>((set) => ({
    playedRain: rainSounds[0],
    rainVolume: 1,
    changeRain: (rainKey: string) => {
        const newRainToPlay = rainSounds.find((rainSound) => rainSound.key === rainKey)

        if (!newRainToPlay) {
            throw new Error(`Rain with key "${newRainToPlay}" does not exist`)
        }

        set((state) => {
            if (state.playedRain.sound) {
                state.playedRain.sound.fade(1, 0, FADE_DURATION)
            }

            if (newRainToPlay.sound) {
                newRainToPlay.sound.volume(state.rainVolume)
                newRainToPlay.sound.play()
                newRainToPlay.sound.fade(0, 1, FADE_DURATION)
            }

            return {
                playedRain: newRainToPlay,
            }
        })
    },
    changeVolume: (volume: number) => {
        set((state) => {
            if (state.playedRain.sound) {
                state.playedRain.sound.volume(volume)
            }

            return { rainVolume: volume }
        })
    },
}))

export default useRainStore
