import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useInterval } from 'react-use'
import useStormStore, { type StormKey } from '../stores/useStormStore.ts'
import { getRandomInt } from '../utils/numbers.ts'
import BottomModal from './BottomModal.tsx'
import ElasticSlider from './reactbits/ElasticSlider/ElasticSlider.tsx'

export const STORM_CHOICES: StormKey[] = ['none', 'light']
const MIN_SECONDS_BETWEEN_STORMS = 30
const MAX_SECONDS_BETWEEN_STORMS = 90

export default function StormManagement() {
    const [selectedStormChoice, selectStormChoice] = useState<StormKey | null>(STORM_CHOICES[0])
    const [delayAfterNextStorm, setDelayAfterNextStorm] = useState(MIN_SECONDS_BETWEEN_STORMS)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { playRandomStorm, changeVolume, stormVolume } = useStormStore()

    useInterval(
        () => {
            playRandomStorm()
            setDelayAfterNextStorm(getRandomInt(MIN_SECONDS_BETWEEN_STORMS, MAX_SECONDS_BETWEEN_STORMS) * 1000)
        },
        selectedStormChoice !== 'none' ? delayAfterNextStorm : null,
    )

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className={'text-2xl font-medium flex items-center gap-4'}>
                Storm
                <ChevronRightIcon className={'w-6'} />
            </button>
            <BottomModal
                isOpen={isModalOpen}
                setOpen={(isOpen) => setIsModalOpen(isOpen)}
                title={'Customize your storm'}
                showCloseButton
            >
                <div className={'mb-10'}>
                    <span className={'block'}>Storm</span>
                    <select
                        value={selectedStormChoice as string}
                        onInput={(e) => {
                            selectStormChoice((e.target as HTMLSelectElement).value as StormKey)
                        }}
                    >
                        {STORM_CHOICES.map((rainIntensity) => (
                            <option value={rainIntensity} key={rainIntensity}>
                                {rainIntensity}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <span className={'block mb-2'} onClick={() => setIsModalOpen(true)}>
                        Volume
                    </span>
                    <ElasticSlider
                        startingValue={0}
                        defaultValue={stormVolume * 100}
                        maxValue={100}
                        onChange={(newVolume) => {
                            changeVolume(newVolume / 100)
                        }}
                    />
                </div>
            </BottomModal>
        </div>
    )
}
