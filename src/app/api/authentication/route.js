import { NextResponse as res} from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '@/services/mongo'
const {get, add, update, remove} = await db('usuarios')
export async function POST(req) {
    try {
        const body = await req.json()
        const finded = (await get({email:body.email}))[0]
        if(finded === undefined) return res.json({message: 'Error en autenticación'},{status:401})
        const hash = finded.hash
        if(bcrypt.compareSync(body.password, hash)) return res.json({token:jwt.sign({ email:finded.email, rol:finded.rol }, process.env.APP_SECRET, { expiresIn: '42h' })},{status:200})
        return  res.json({message: 'Authentication failed'},{status:403})
        }
      catch (err) {
        console.error(err)
        return res.json({message: 'error'}, {status:500})
      }
}