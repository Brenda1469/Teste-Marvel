import { NextRequest, NextResponse } from 'next/server';
import md5 from 'md5';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: 'API keys not configured' },
      { status: 500 }
    );
  }

  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);

  const params = new URLSearchParams({
    ts,
    apikey: publicKey,
    hash,
    limit: searchParams.get('limit') || '20',
    offset: searchParams.get('offset') || '0',
    ...(searchParams.get('search') && { 
      nameStartsWith: searchParams.get('search')! 
    })
  });

  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?${params}`
    );
    
    if (!response.ok) {
      throw new Error('Marvel API failed');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    );
  }
}