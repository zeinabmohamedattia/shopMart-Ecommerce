import { NextResponse } from "next/server"
// prisma ==> 
export async function GET() {
    const users = {
        message: 'success',
        users:[
        { id: 111, name: 'ahmed', age: 20 },
        { id: 121, name: 'ali', age: 23 },
        { id: 144, name: 'khaled', age: 21 },
    ]}
    return NextResponse.json(users)
}