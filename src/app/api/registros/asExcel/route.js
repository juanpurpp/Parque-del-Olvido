import XLSX from 'xlsx';
import fs from 'fs'
import db from '@/services/mongo'
import { NextResponse as res} from 'next/server';
const {get} = await db('registros')
const createExcel= async function(filename, filters){
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, 
        XLSX.utils.json_to_sheet(await get(filters)), 'Registros');
    XLSX.writeFile(wb,filename);

    return fs.readFileSync(filename)
}
export async function POST(req) {
	fs.mkdirSync(`/tmp/excel`, { recursive: true })
	const currentdate = new Date(); 
	const datetime = 	currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-"
                + currentdate.getFullYear() + "-"
                + currentdate.getHours() + "-"
                + currentdate.getMinutes() + "-"
                + currentdate.getSeconds();
	const filename=`/tmp/excel/${datetime}.xlsx`
	const body = await req.json()
    try {

      return new Response(await createExcel(filename, body), {
        status: 200,
        headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': ('attachment; filename=' + filename.substring(filename.lastIndexOf('/')+1, filename.length))
				},
      })
      }
    catch (err) {
      console.error(err)
      return res.json({message: 'error'}, {status:500})
    }
  }