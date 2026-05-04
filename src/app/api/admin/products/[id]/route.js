import { NextResponse } from 'next/server'
import { updateProduct, deleteProduct } from '@/lib/sheets'

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    
    await updateProduct(id, body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    await deleteProduct(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
