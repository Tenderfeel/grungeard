import { NextResponse } from 'next/server';
import characters from '@/data/characters';

export async function GET() {
    return NextResponse.json(characters);
}