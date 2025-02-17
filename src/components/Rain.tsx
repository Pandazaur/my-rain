import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getRandomInt } from '../utils/numbers.ts'

// Define interfaces for component props and raindrop data
interface RaindropData {
    x: number
    y: number
    length: number
    speed: number
}

interface RainCanvasProps {
    force?: number
    color?: string
    count?: number
    width?: number
    height?: number
    isPlaying?: boolean
}

const Rain: React.FC<RainCanvasProps> = ({ force = 5, color = '#a0d8ef', isPlaying = false }: RainCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [raindrops, setRaindrops] = useState<RaindropData[]>([])
    const animationRef = useRef<number | null>(null)

    const count = useMemo(() => {
        return force * 100
    }, [force])

    // Initialize the raindrops
    useEffect(() => {
        const initialRaindrops: RaindropData[] = []
        for (let i = 0; i < count; i++) {
            initialRaindrops.push({
                x: getRandomInt(0, window.innerWidth),
                y: getRandomInt(0, window.innerHeight),
                length: getRandomInt(10, 20),
                speed: getRandomInt(5, 5 + force),
            })
        }
        setRaindrops(initialRaindrops)
    }, [count, force])

    // Animation loop
    useEffect(() => {
        if (!isPlaying || !canvasRef.current) return

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return

        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
            ctx.strokeStyle = color
            ctx.lineWidth = 1

            const updatedRaindrops = raindrops.map((drop) => {
                ctx.beginPath()
                ctx.moveTo(drop.x, drop.y)
                ctx.lineTo(drop.x, drop.y + drop.length)
                ctx.stroke()

                // Update position
                const newY = drop.y + drop.speed

                // Reset if raindrop goes beyond the canvas
                if (newY > window.innerHeight) {
                    return {
                        ...drop,
                        y: -drop.length,
                        x: Math.random() * window.innerWidth,
                    }
                }

                return {
                    ...drop,
                    y: newY,
                }
            })

            setRaindrops(updatedRaindrops)
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [raindrops, color, isPlaying])

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
}

export default Rain
