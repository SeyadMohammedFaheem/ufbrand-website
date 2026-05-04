import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('url')

    if (!url) return NextResponse.json({ error: 'No URL' }, { status: 400 })

    // If it's already a relative path to a local image, just redirect or serve it directly
    if (url.startsWith('/')) {
      return NextResponse.redirect(new URL(url, req.url))
    }

    const response = await fetch(url)
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
