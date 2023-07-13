import { NextResponse } from 'next/server'
import * as jwt from 'jose'
import { cookies } from 'next/headers'



const publics = ['/register', '/login']

const alg = 'HS256'

const apiHandler = async (req)=>{
    const token = await req.headers.get("token")
    let decodedToken = undefined
    const secret = new TextEncoder().encode(
        process.env.APP_SECRET,
      )
    try{ const {payload} = token ? await jwt.jwtVerify(token,secret ,{
        iss: 'urn:example:issuer',
        aud: 'urn:example:audience',
      }) : {}
      decodedToken = payload
    }
    catch(e){ 
        console.error(e)
        decodedToken = 'INVALID'
    }

    const next = NextResponse.next({
        request: req,
    })
    const nonAuthorized = NextResponse.json({
        message: "No authorized",
    },{status:401})
    console.log('decoded',decodedToken )

    switch(req.method){
        case 'GET':
            switch( req.nextUrl.pathname ){
                default:return  next
            }
        case 'POST':
            switch( req.nextUrl.pathname ){
                case '/api/invite':
                    if(['Administrador'].some(rol=>rol===decodedToken.rol)) return next
                    return nonAuthorized
                default:next
            }
        default:    return next
    }
}
const frontHandler = async (req) =>{
    const cookie = await req.cookies.get('token')
    let token = cookie ?cookie.value : 'no token'
    console.log(token)
    const secret = new TextEncoder().encode(
			process.env.APP_SECRET,
		)
		let decodedToken = undefined
    try{ 
    	const {payload} = token ? await jwt.jwtVerify(token,secret ,{
        iss: 'urn:example:issuer',
        aud: 'urn:example:audience',
      }) : {}
      decodedToken = payload

    }
    catch(e){ 
        console.error(e)
        decodedToken = 'INVALID'
    }
    console.log('llamado front de ', req.nextUrl.pathname)
    console.log('token', decodedToken)
    

    switch(req.nextUrl.pathname){
        case '/Logo.svg':
        case '/Logo_black.svg': return NextResponse.next()
        case '/register':
        case '/login':
            if( decodedToken !== 'INVALID') return NextResponse.redirect(new URL('/', req.url))
            return NextResponse.next()
        case '/usuarios':
            if( decodedToken && decodedToken.rol==='Administrador') return NextResponse.next()
            return  NextResponse.redirect(new URL('/', req.url))
        default: 
            if(!decodedToken || decodedToken === 'INVALID') return NextResponse.redirect(new URL('/login', req.url))
            return NextResponse.next()
    }

}
export async function middleware(req) {
    if(req.nextUrl.pathname.startsWith('/api')) return await apiHandler(req)
    else return await frontHandler(req)
}
export const config = {
    matcher: [
      '/((?!_next/static|_next/image|.*\\..*|favicon.ico).*)',
    ],
  }
