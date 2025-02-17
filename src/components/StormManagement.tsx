import { useEffect, useRef, useState } from 'react'
import { useInterval } from 'react-use'
import ClassicStorm from '../assets/sounds/storm/storm_classic_1.mp3'
import LightStorm from '../assets/sounds/storm/storm_light_1.mp3'
import useStorms from '../hooks/useStorms.ts'
import { getRandomInt } from '../utils/numbers.ts'

type StormIntensity = 'none' | 'light'

const STORM_CHOICES: StormIntensity[] = ['none', 'light']
const MIN_SECONDS_BETWEEN_STORMS = 30
const MAX_SECONDS_BETWEEN_STORMS = 90

type Props = {
    isPlaying?: boolean
}

export default function StormManagement(props: Props) {
    const audioSource = useRef(new Audio())
    const [selectedStormChoice, selectStormChoice] = useState<StormIntensity | null>(STORM_CHOICES[0])
    const [delayAfterNextStorm, setDelayAfterNextStorm] = useState(MIN_SECONDS_BETWEEN_STORMS)
    const { playRandomHowl } = useStorms()

    useEffect(() => {
        audioSource.current.loop = true
    }, [])

    useInterval(
        () => {
            playRandomHowl()
            setDelayAfterNextStorm(getRandomInt(MIN_SECONDS_BETWEEN_STORMS, MAX_SECONDS_BETWEEN_STORMS) * 1000)
        },
        props.isPlaying && selectedStormChoice !== 'none' ? delayAfterNextStorm : null,
    )

    console.log(delayAfterNextStorm)

    // useEffect(() => {}, [props.isPlaying, selectedStormChoice])

    return (
        <div>
            <span className={'block'}>Storm</span>
            <select
                value={selectedStormChoice}
                onInput={(e) => {
                    selectStormChoice((e.target as HTMLSelectElement).value as StormIntensity)
                }}
            >
                {STORM_CHOICES.map((rainIntensity) => (
                    <option value={rainIntensity} key={rainIntensity}>
                        {rainIntensity}
                    </option>
                ))}
            </select>
        </div>
    )
}
