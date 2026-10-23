import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const svgPath = path.resolve('apps/web/public/favicon.svg')
const publicDir = path.resolve('apps/web/public')

function createIco(pngBuffers) {
  const numImages = pngBuffers.length
  const headerSize = 6
  const dirSize = 16 * numImages
  let currentOffset = headerSize + dirSize

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(numImages, 4)

  const entries = []
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16)
    const w = item.width >= 256 ? 0 : item.width
    const h = item.height >= 256 ? 0 : item.height
    entry.writeUInt8(w, 0)
    entry.writeUInt8(h, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(item.buffer.length, 8)
    entry.writeUInt32LE(currentOffset, 12)
    entries.push(entry)
    currentOffset += item.buffer.length
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((b) => b.buffer)])
}

async function run() {
  const svgBuffer = fs.readFileSync(svgPath)

  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer()
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer()
  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer()
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer()
  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer()
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer()

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), p16)
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), p32)
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), p180)
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), p192)
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), p512)

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ])
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer)

  console.log('Successfully generated all favicons and favicon.ico!')
}

run().catch(console.error)
