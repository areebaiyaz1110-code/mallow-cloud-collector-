import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Generates a gentle rain ambience with the Web Audio API — no audio files needed.
 * The AudioContext is only created after the visitor presses play.
 */
export default function useRainSound() {
  const ctxRef = useRef(null)
  const nodesRef = useRef(null)
  const dripRef = useRef(null)
  const suspendRef = useRef(null)

  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [intensity, setIntensity] = useState(0.5)

  const supported =
    typeof window !== 'undefined' && !!(window.AudioContext || window.webkitAudioContext)

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null

    const ctx = new AC()

    // Two seconds of looping white noise…
    const length = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    // …shaped into a soft "shhh" of rain.
    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 400

    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 3000

    const master = ctx.createGain()
    master.gain.value = 0

    source.connect(highpass)
    highpass.connect(lowpass)
    lowpass.connect(master)
    master.connect(ctx.destination)
    source.start()

    ctxRef.current = ctx
    nodesRef.current = { highpass, lowpass, master }
    return ctx
  }, [])

  const toggle = useCallback(async () => {
    const ctx = ensureContext()
    if (!ctx) return
    if (!playing) {
      clearTimeout(suspendRef.current)
      try {
        await ctx.resume()
      } catch {
        /* ignore */
      }
    }
    setPlaying(!playing)
  }, [ensureContext, playing])

  // Fade the rain bed in/out and retune it as the sliders move.
  useEffect(() => {
    const ctx = ctxRef.current
    const nodes = nodesRef.current
    if (!ctx || !nodes) return
    const t = ctx.currentTime
    const target = playing ? volume * 0.4 * (0.45 + intensity * 0.9) : 0
    nodes.master.gain.setTargetAtTime(target, t, 0.15)
    nodes.lowpass.frequency.setTargetAtTime(1400 + intensity * 4200, t, 0.2)
    nodes.highpass.frequency.setTargetAtTime(300 + intensity * 500, t, 0.2)

    if (!playing) {
      clearTimeout(suspendRef.current)
      suspendRef.current = setTimeout(() => {
        if (ctx.state === 'running') ctx.suspend().catch(() => {})
      }, 900)
    }
  }, [playing, volume, intensity])

  // Occasional soft drips on top of the rain bed.
  useEffect(() => {
    if (!playing) return undefined
    let stopped = false

    const schedule = () => {
      const wait = (500 + Math.random() * 1800) / (0.5 + intensity)
      dripRef.current = setTimeout(() => {
        if (stopped) return
        const ctx = ctxRef.current
        if (ctx && ctx.state === 'running') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          const now = ctx.currentTime
          const freq = 700 + Math.random() * 1100
          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, now)
          osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.08)
          gain.gain.setValueAtTime(0.0001, now)
          gain.gain.exponentialRampToValueAtTime(0.06 * volume + 0.0002, now + 0.01)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.16)
        }
        schedule()
      }, wait)
    }

    schedule()
    return () => {
      stopped = true
      clearTimeout(dripRef.current)
    }
  }, [playing, intensity, volume])

  // Tidy up when the component unmounts.
  useEffect(
    () => () => {
      clearTimeout(dripRef.current)
      clearTimeout(suspendRef.current)
      const ctx = ctxRef.current
      ctxRef.current = null
      nodesRef.current = null
      if (ctx && ctx.state !== 'closed') ctx.close().catch(() => {})
    },
    []
  )

  return { supported, playing, toggle, volume, setVolume, intensity, setIntensity }
}
