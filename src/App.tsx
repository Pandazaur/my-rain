import React, { useMemo, useState } from 'react'
import './App.css'
import Rain2 from './components/Rain2.tsx'
import RainManagement, { RainIntensity } from './components/RainManagement.tsx'
import StormManagement from './components/StormManagement.tsx'

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [rain, setRain] = useState<RainIntensity>('none')

    const dropCount = useMemo(() => {
        switch (rain) {
            case 'none':
                return 0
            case 'umbrella':
                return 300
            case 'light':
                return 500
            case 'heavy':
                return 2000
        }
    }, [rain])

    return (
        <div className={'bg-slate-900 text-white relative'}>
            <div className={'absolute inset-0'}>
                <Rain2 dropCount={dropCount} />
            </div>
            <div className={'px-20 py-20 flex flex-col min-h-screen h-full flex-1 relative'}>
                <div className={'flex-1'}>
                    <div className={'font-sour-gummy mb-20'}>
                        <h1 className={'text-4xl'}>My Rain</h1>
                        <p>Personalize your rain. Make it perfect for you.</p>
                    </div>

                    <div className={'flex flex-col gap-6'}>
                        <RainManagement
                            isPlaying={isPlaying}
                            onRainChange={(rainIntensity) => setRain(rainIntensity)}
                        />
                        <StormManagement isPlaying={isPlaying} />
                    </div>
                </div>

                <button
                    className={'mt-10 font-sour-gummy self-end text-4xl text-shadow-white'}
                    type={'button'}
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    )
}
