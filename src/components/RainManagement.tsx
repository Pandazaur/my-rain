import useRainStore, { RainKey } from '../stores/useRainStore.ts'

const RAIN_INTENSITY: RainKey[] = ['none', 'light', 'umbrella', 'heavy']

type Props = {
    isPlaying?: boolean
}

export default function RainManagement(props: Props) {
    const { playedRain, changeRain } = useRainStore()

    return (
        <div>
            <span className={'block'}>Rain</span>
            <select
                value={playedRain.key}
                onInput={(e) => {
                    changeRain((e.target as HTMLSelectElement).value as RainKey)
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
