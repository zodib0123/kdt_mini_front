
export interface SignupRequest {
    mid: string;
    pwd: string;
    alias: string;
}

export async function saveUserInfo(params: SignupRequest) {
    const { mid, pwd, alias } = params;

    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mid, pwd, alias }),
            cache: 'no-store'
        });

        if (!resp.ok) return false;
        
        return true;
    } catch (error) {
        console.error('네트워크 에러:', error);
        return null;
    }
}