import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('url')

    if (!url) return NextResponse.json({ error: 'No URL' }, { status: 400 })

    let targetUrl = url

    // Handle Google Drive links
    if (url.includes('drive.google.com')) {
      const driveIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/)
      if (driveIdMatch && driveIdMatch[1]) {
        targetUrl = `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`
      }
    }

    // If it's already a relative path to a local image
    if (targetUrl.startsWith('/')) {
      return NextResponse.redirect(new URL(targetUrl, req.url))
    }

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    })
    if (!response.ok) {
      console.error(`Failed to fetch image: ${url} - Status: ${response.status}`)
      return NextResponse.json({ error: 'Failed to fetch' }, { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      }
    })
  } catch (error) {
    console.error('Image Proxy Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
