import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { name, phone, address, paymentMethod, notes, items, total, deliveryTime } = await request.json()

    console.log('Creating order with data:', { 
      hasSession: !!session, 
      userId: session?.user?.id, 
      name, 
      phone, 
      address, 
      itemsCount: items?.length,
      total,
      items: items?.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    })

    // Проверяем, что все продукты существуют
    if (items && items.length > 0) {
      const productIds = items.map((item: any) => item.productId)
      const existingProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true }
      })
      
      console.log('Existing products:', existingProducts)
      
      const missingProducts = productIds.filter((id: string) => 
        !existingProducts.find(p => p.id === id)
      )
      
      if (missingProducts.length > 0) {
        console.error('Missing products:', missingProducts)
        return NextResponse.json(
          { error: `Products not found: ${missingProducts.join(', ')}` },
          { status: 400 }
        )
      }
    }

    // Create order (supports both authenticated and guest users)
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || null, // null for guest orders
        name: name || 'Guest Customer',
        status: 'PENDING',
        total,
        address,
        phone,
        notes,
        paymentMethod,
        deliveryTime,
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      }
    })

    console.log('Order created successfully:', order.id)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Create order API error:', error)
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
