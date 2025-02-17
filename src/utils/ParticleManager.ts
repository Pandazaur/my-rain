import { useCallback, useEffect, useState } from 'react'
import { getRandomInt } from './numbers.ts'

export type Particle = {
    x: number
    y: number
    l: number
    xs: number
    ys: number
}

/**
 * A hook that manages particles for animations like rain
 */
export const useParticleManager = (initialCount = 100, maxCount = 1000) => {
    const [particles, setParticles] = useState<Particle[]>(Array.from({ length: initialCount }))

    // Generate a new particle with random properties
    const generateNewDrop = useCallback((): Particle => {
        return {
            x: Math.random() * window.innerWidth,
            y: getRandomInt(-window.innerHeight, -20),
            l: Math.random(),
            xs: getRandomInt(-1, 1),
            ys: getRandomInt(10, 20),
        }
    }, [])

    // Initialize particles on mount
    useEffect(() => {
        const initialParticles: Particle[] = []
        for (let i = 0; i < initialCount; i++) {
            initialParticles.push(generateNewDrop())
        }
        setParticles(initialParticles)
    }, [initialCount, generateNewDrop])

    // Add a new particle
    const createNewParticle = useCallback(() => {
        setParticles((prevParticles) => [...prevParticles, generateNewDrop()])
    }, [generateNewDrop])

    // Remove a particle at specified index
    const removeParticle = useCallback((index: number) => {
        setParticles((prevParticles) => prevParticles.filter((_, i) => i !== index))
    }, [])

    // Move a single particle and handle boundaries
    const moveParticle = useCallback(
        (index: number) => {
            setParticles((prevParticles) => {
                // If this index doesn't exist anymore, just return the current state
                if (index >= prevParticles.length) return prevParticles

                const newParticles = [...prevParticles]
                const particle = { ...newParticles[index] }

                particle.x += particle.xs
                particle.y += particle.ys

                // Check if particle is out of bounds
                if (particle.x > window.innerWidth || particle.y > window.innerHeight) {
                    // Remove this particle
                    const filteredParticles = newParticles.filter((_, i) => i !== index)

                    // Add new particles if we're below max count
                    if (filteredParticles.length < maxCount) {
                        return [
                            ...filteredParticles,
                            generateNewDrop(),
                            generateNewDrop(), // Add two new particles
                        ]
                    }

                    return filteredParticles
                }

                // Update the particle in our copy
                newParticles[index] = particle
                return newParticles
            })
        },
        [generateNewDrop, maxCount],
    )

    // Move all particles in a single update
    const moveAllParticles = useCallback(() => {
        setParticles((prevParticles) => {
            const newParticles: Particle[] = []
            const particlesToAdd: Particle[] = []

            // Process each particle
            for (let i = 0; i < prevParticles.length; i++) {
                const particle = { ...prevParticles[i] }

                particle.x += particle.xs
                particle.y += particle.ys

                // Check if particle is out of bounds
                if (particle.x > window.innerWidth || particle.y > window.innerHeight) {
                    // Don't add this particle to newParticles

                    // Add new particles if we're below max count
                    if (newParticles.length + particlesToAdd.length < maxCount) {
                        particlesToAdd.push(generateNewDrop())
                        particlesToAdd.push(generateNewDrop()) // Add two new particles
                    }
                } else {
                    // Particle is still in bounds, keep it
                    newParticles.push(particle)
                }
            }

            return [...newParticles, ...particlesToAdd]
        })
    }, [generateNewDrop, maxCount])

    return {
        particles,
        createNewParticle,
        removeParticle,
        moveParticle,
        moveAllParticles,
        generateNewDrop,
    }
}
