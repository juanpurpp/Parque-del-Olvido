
import db from '@/services/mongo'
import { NextResponse as res } from 'next/server'

const {get, add, update, remove} = await db('registros')
export async function GET(req) {
  try {
    console.log('quechucha')
    return res.json(await get(),{status:200})
    }
  catch (err) {
    console.error(err)
    return res.json({message: 'error'}, {status:500})
  }
}
export async function POST(req) {
  try {
    const body = await req.json()
    await add(  body.document)
    return res.json({message: 'added'},{status:200})
    }
  catch (err) {
    console.error(err)
    return res.json({message: 'error'}, {status:500})
  }
}
export async function PUT(req) {
  try {
    const body = await req.json()
    await update(body.target,  body.document)
    return res.json({message: 'edited'},{status:200})
    }
  catch (err) {
    console.error(err)
    return res.json({message: 'error'}, {status:500})
  }
}
export async function DELETE(req) {
  try {
    const target = req.nextUrl.searchParams.get("target")
    await remove({name:target})
    return res.json({message: 'deleted'},{status:200})
    }
  catch (err) {
    console.error(err)
    return res.json({message: 'error'}, {status:500})
  }
}
