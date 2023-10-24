import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/utils/mongodb';

export async function GET(request: Request) {

//     const { db } = await connectToDatabase();
//     const collection = db.collection("musics");

    return NextResponse.json({});
}