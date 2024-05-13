import state from './state'

export default function testSpeed() {
  let endTime
  const startTime = (new Date()).getTime()
  const cacheBuster = `?nnn=${startTime}`

  const download = new Image()

  return new Promise((resolve) => {
    download.onload = () => {
      const downloadSize = 63472

      endTime = (new Date()).getTime()

      const duration = (endTime - startTime) / 1000
      const bitsLoaded = downloadSize * 8

      // console.log(`${bitsLoaded} bits in ${duration}s`)

      const speedBps = (bitsLoaded / duration).toFixed(2)
      const speedKbps = (speedBps / 1024).toFixed(2)
      const speedMbps = (speedKbps / 1024).toFixed()

      console.log({speedKbps})

      resolve({
          isOk: +speedMbps >= (state.isMobile ? 3 : 1),
          Mbps: speedMbps
      })
    }
    download.src = `../images/content/test.jpg${cacheBuster}`
  })
}
