
import db from '@/services/mongo'
import { NextResponse as res } from 'next/server'

const {get, add, update, remove} = await db('registros')
export async function GET(req) {
  try {
    
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
    return res.json(await get(body),{status:200}) }
  catch (err) {
    console.error(err)
    return res.json({message: 'error'}, {status:500})
  }
}