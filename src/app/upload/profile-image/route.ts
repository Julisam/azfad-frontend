import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  console.log('Upload API called')
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const oldFilename = formData.get('oldFilename') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    if (file.size > 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 1MB' }, { status: 400 })
    }

    // Generate random filename
    const extension = file.name.split('.').pop() || 'jpg'
    const randomFilename = `${randomBytes(16).toString('hex')}.${extension}`

    // Save file to public/profilepics
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const path = join(process.cwd(), 'public/profilepics', randomFilename)
    
    await writeFile(path, buffer)

    // Delete old file if exists
    if (oldFilename) {
      try {
        const oldPath = join(process.cwd(), 'public/profilepics', oldFilename)
        await unlink(oldPath)
      } catch (error) {
        console.log('Old file not found or already deleted')
      }
    }

    console.log('Upload successful:', randomFilename)
    return NextResponse.json({ filename: randomFilename })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: `Upload failed: ${error}` }, { status: 500 })
  }
}