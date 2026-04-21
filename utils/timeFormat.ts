export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secondsPart = Math.floor(seconds % 60)
  const centiseconds = Math.floor((seconds * 100) % 100)
  const centiStr = centiseconds.toString().padStart(2, '0')

  if (minutes > 0) {
    return `${minutes}:${secondsPart.toString().padStart(2, '0')}.${centiStr}`
  }

  return `${secondsPart}.${centiStr}`
}