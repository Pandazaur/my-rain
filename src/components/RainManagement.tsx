import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import useRainStore, { RainKey } from '../stores/useRainStore.ts'
import BottomModal from './BottomModal.tsx'
import ElasticSlider from './reactbits/ElasticSlider/ElasticSlider.tsx'

const RAIN_INTENSITY: RainKey[] = ['none', 'light', 'umbrella', 'heavy']

export default function RainManagement() {
    const { playedRain, changeRain, rainVolume, changeVolume } = useRainStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className={'text-2xl font-medium flex items-center gap-4'}>
                Rain
                <ChevronRightIcon className={'w-6'} />
            </button>
            <BottomModal
                isOpen={isModalOpen}
                setOpen={(isOpen) => setIsModalOpen(isOpen)}
                title={'Customize your rain'}
            >
                <div className={'mb-10'}>
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
                <div>
                    <span className={'block mb-2'} onClick={() => setIsModalOpen(true)}>
                        Volume
                    </span>
                    <ElasticSlider
                        startingValue={0}
                        defaultValue={rainVolume * 100}
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
