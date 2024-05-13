import state from './state'

export default function testSpeed() {
  let endTime
  const startTime = (new Date()).getTime()
  const cacheBuster = `?nnn=${startTime}`

  return fetch(`../more-premium/images/content/test.jpg${cacheBuster}`)
  .then(response => {
    endTime = (new Date()).getTime()
    return response.blob()
  })
  .then(blob => {
    const duration = (endTime - startTime) / 1000

    const bitsLoaded = blob.size * 8
    console.log(`${bitsLoaded} bits in ${duration}s`)

    const speedBps = (bitsLoaded / duration).toFixed(2)
    const speedKbps = (speedBps / 1024).toFixed(2)
    const speedMbps = (speedKbps / 1024).toFixed()

    console.log({speedMbps, speedKbps})

    return {
      isOk: +speedMbps >= (state.isMobile ? 5 : 6),
      speedMbps,
      speedKbps
    }
  })
}
