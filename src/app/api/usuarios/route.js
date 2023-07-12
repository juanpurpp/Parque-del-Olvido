
import db from '@/services/mongo'
import { NextResponse as res } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const {get, add, update, remove} = await db('usuarios')
export async function GET(req) {
  try {
    return res.json(await get({},['hash']),{status:200})
    }
  catch (err) {
    console.error(err)
    return res.json({message: 'error'}, {status:500})
  }
}
export async function POST(req) {
  try {
    const body = await req.json()
    const token = req.nextUrl.searchParams.get('token')
    const decoded = token?jwt.verify(token, process.env.APP_SECRET):'INVALID'
    if(!decoded || decoded.action !== 'invitation') return res.json({message:'No authorized'}, {status:401})
    await add( {email:decoded.email, hash: bcrypt.hashSync(body.password, 10), rol:'Lector'} )
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
    await remove({email:target})
    return res.json({message: 'deleted'},{status:200})
    }
  catch (err) {
    console.error(err)
    return res.json({message: 'error'}, {status:500})
  }
}
