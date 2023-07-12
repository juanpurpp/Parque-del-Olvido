import { NextResponse as res} from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '@/services/mongo'
const {get, add, update, remove} = await db('usuarios')
export async function POST(req) {
    try {
        const body = await req.json()
        const decoded = jwt.verify(body.token, process.env.APP_SECRET, { expiresIn: '2h' })
        if(body.token) return res.json({rol:decoded.rol}, {status:200})
        return  res.json({message: 'Authentication failed'},{status:403})
        }
      catch (err) {
        console.error(err)
        return res.json({message: 'error'}, {status:500})
      }
}