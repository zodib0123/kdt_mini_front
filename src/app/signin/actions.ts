
export async function authenticate(formData: any) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`;
    
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (resp.ok) {
            const token = resp.headers.get("Authorization");
            const data = await resp.json();
            return { success: true, data, token };
        }
        return { success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' };
    } catch (error) {
        return { success: false, message: '네트워크 에러가 발생했습니다.' };
    }
}