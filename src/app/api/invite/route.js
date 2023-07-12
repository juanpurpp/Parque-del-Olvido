import { NextResponse as res} from 'next/server'
import * as jwt from 'jsonwebtoken'
export async function POST(req) {
    const body = await req.json()
    try {
        return res.json({token:jwt.sign({ email:body.email, action:"invitation" }, process.env.APP_SECRET, { expiresIn: '1h' })},{status:200})
        }
      catch (err) {
        console.error(err)
        return res.json({message: 'error'}, {status:500})
      }
}