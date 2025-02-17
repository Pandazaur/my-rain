import { useEffect, useRef, useState } from 'react'
import HeavyRain from '../assets/sounds/rain/heavy_loop.wav'
import LightRain from '../assets/sounds/rain/light_loop.wav'
import UmbrellaRain from '../assets/sounds/rain/rain_umbrella_loop.wav'

export type RainIntensity = 'none' | 'light' | 'umbrella' | 'heavy'

const RAIN_INTENSITY: RainIntensity[] = ['none', 'light', 'umbrella', 'heavy']

type Props = {
    isPlaying?: boolean
    onRainChange?: (itensity: RainIntensity) => unknown
}

export default function RainManagement(props: Props) {
    const audioSource = useRef(new Audio())
    const [selectedRainIntensity, selectRainIntensity] = useState<RainIntensity>(RAIN_INTENSITY[0])

    useEffect(() => {
        audioSource.current.loop = true
    }, [])

    useEffect(() => {
        props.onRainChange?.(selectedRainIntensity)
    }, [selectedRainIntensity, props.onRainChange])

    useEffect(() => {
        if (props.isPlaying) {
            switch (selectedRainIntensity) {
                case 'none':
                    audioSource.current.src = undefined
                    break
                case 'light':
                    audioSource.current.src = LightRain
                    break
                case 'umbrella':
                    audioSource.current.src = UmbrellaRain
                    break
                case 'heavy':
                    audioSource.current.src = HeavyRain
                    break
                default:
                    audioSource.current.src = undefined
            }

            audioSource.current.play().catch((err) => {
                console.error(err)
            })
        } else {
            audioSource.current.pause()
            audioSource.current.src = undefined
        }
    }, [props.isPlaying, selectedRainIntensity])

    return (
        <div>
            <span className={'block'}>Rain</span>
            <select
                value={selectedRainIntensity}
                onInput={(e) => {
                    selectRainIntensity((e.target as HTMLSelectElement).value as RainIntensity)
                }}
            >
                {RAIN_INTENSITY.map((rainIntensity) => (
                    <option value={rainIntensity} key={rainIntensity}>
                        {rainIntensity}
                    </option>
                ))}
            </select>
        </div>
    )
}
