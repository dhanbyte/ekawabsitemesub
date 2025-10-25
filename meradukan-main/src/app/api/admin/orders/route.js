// Legacy API route - redirect to new orders API
import { NextResponse } from 'next/server'

export async function GET(request) {
  return NextResponse.redirect(new URL('/api/orders', request.url))
}

export async function PUT(request) {
  return NextResponse.redirect(new URL('/api/orders', request.url))
}