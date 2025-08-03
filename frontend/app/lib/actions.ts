'use server';
import { cookies } from 'next/headers'

const isProduction = process.env.NODE_ENV === 'production';


export async function handleRefresh() {
    console.log("handleRefresh");

    const refreshToken = await getRefreshToken();

    
    const token=await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/token/refresh/`, 
     { 
        method: 'POST', 
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ refresh: refreshToken })

    }).then(response => response.json())

    .then(async (json)=>{
        console.log('Response - Refresh:', json);
        
        if (json.access) {
                const cookieStore = await cookies();
                cookieStore.set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: isProduction,
                    maxAge: 60 * 60, // 60 minutes
                    path: '/'
                });

                return json.access;
         } else {
                resetAuthCookies();
        }        
    })
    .catch(error =>{        
        console.log('error', error);
        resetAuthCookies();
    });

    return token;
}


export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}



export async function resetAuthCookies() {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/logout`, {
      method: "POST",
    });
}


//로그인한 회원정보 가져오기
export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_userid')?.value;
    return userId??null;
}


export async function getAccessToken() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }
    return accessToken;
}



export async function getRefreshToken() {
    const cookieStore = await cookies();
    let refreshToken = cookieStore.get('session_refresh_token')?.value;
    
    if(!refreshToken) {
        return resetAuthCookies();
    }

    return refreshToken;
}

