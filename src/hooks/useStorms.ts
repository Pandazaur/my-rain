import { Howl } from 'howler'
import Storm1 from '../assets/sounds/thunders/distant-thunder-01.wav'
import Storm2 from '../assets/sounds/thunders/distant-thunder-02.wav'
import Storm3 from '../assets/sounds/thunders/distant-thunder-03.wav'
import Storm4 from '../assets/sounds/thunders/distant-thunder-04.wav'
import Storm5 from '../assets/sounds/thunders/distant-thunder-05.wav'
import Storm6 from '../assets/sounds/thunders/distant-thunder-06.wav'
import Storm7 from '../assets/sounds/thunders/distant-thunder-07.wav'
import Storm8 from '../assets/sounds/thunders/distant-thunder-08.wav'
import Storm9 from '../assets/sounds/thunders/distant-thunder-09.wav'
import Storm10 from '../assets/sounds/thunders/distant-thunder-10.wav'
import Storm11 from '../assets/sounds/thunders/distant-thunder-11.wav'
import Storm12 from '../assets/sounds/thunders/distant-thunder-12.wav'
import Storm13 from '../assets/sounds/thunders/distant-thunder-13.wav'
import Storm14 from '../assets/sounds/thunders/distant-thunder-14.wav'
import Storm15 from '../assets/sounds/thunders/distant-thunder-15.wav'
import Storm16 from '../assets/sounds/thunders/distant-thunder-16.wav'
import Storm17 from '../assets/sounds/thunders/distant-thunder-17.wav'
import Storm18 from '../assets/sounds/thunders/distant-thunder-18.wav'
import Storm19 from '../assets/sounds/thunders/distant-thunder-19.wav'
import { getRandomInt } from '../utils/numbers.ts'

export default function useStorms() {
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

    const playRandomHowl = () => {
        const randomIndex = getRandomInt(0, storms.length - 1)

        storms[randomIndex].play()
    }

    return { playRandomHowl, storms }
}
