import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInterval } from 'react-use'
import { getRandomInt } from '../utils/numbers.ts'

interface Particle {
    x: number
    y: number
    l: number
    xs: number
    ys: number
}

type Props = {
    dropCount?: number
}

export default function Rain2(props: Props) {
    const dropCount = props.dropCount ?? 1000
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctx = useRef<CanvasRenderingContext2D | null>(null)
    // const particles = useRef<Particle[]>([])
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        initCanvas()
    }, [])

    const speed = useMemo(() => {
        return 15
    }, [])

    useInterval(() => {
        if (particles.length < dropCount) {
            setParticles([...particles, generateNewDrop(), generateNewDrop()])
        }
    }, 1)

    useInterval(() => {
        draw()
    }, speed)

    const initCanvas = () => {
        if (!canvasRef.current) {
            return
        }

        // Get canvas context and set its width and height
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        ctx.current = canvasRef.current.getContext('2d')

        if (!ctx.current) {
            throw new Error('Could not get canvas context')
        }

        // Set canvas drawing properties
        ctx.current.strokeStyle = 'rgba(174,194,224,0.5)'
        ctx.current.lineWidth = 1
        ctx.current.lineCap = 'round'

        // Initialize particles
        const init: Particle[] = []

        for (let a = 0; a < dropCount; a++) {
            init.push(generateNewDrop())
        }

        setParticles([...init])
    }

    const draw = () => {
        if (!canvasRef.current || !ctx.current) {
            return
        }

        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current?.height)

        for (let c = 0; c < particles.length; c++) {
            const p = particles[c]

            ctx.current.beginPath()
            ctx.current.moveTo(p.x, p.y)
            ctx.current.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys)
            ctx.current.stroke()
        }

        move()
    }

    const generateNewDrop = () => {
        return {
            x: Math.random() * window.innerWidth,
            y: getRandomInt(-window.innerHeight, -20),
            l: Math.random(),
            xs: getRandomInt(-1, 1), // -4 + Math.random() * 4 + 2,
            ys: getRandomInt(10, 20),
        }
    }

    const move = () => {
        for (let b = 0; b < particles.length; b++) {
            let p = particles[b]
            p.x += p.xs
            p.y += p.ys

            if (p.x > window.innerWidth || p.y > innerHeight) {
                if (particles.length <= dropCount) {
                    p.x = getRandomInt(0, window.innerWidth)
                    p.y = -20
                } else if (particles.length > dropCount) {
                    p.x = 0
                    p.y = 0
                    p.l = 0
                    p.xs = 0
                    p.ys = 0
                }
            }
        }

        setParticles(particles.filter((p) => p.xs && p.ys && p.l))
    }

    return <canvas ref={canvasRef} className="w-full h-full" />
}
