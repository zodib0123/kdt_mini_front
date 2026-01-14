
export interface AddReviewRequest {
    fid: number;
    mid: string;
    cont: string;
    star: number;
};

export async function addReview(params: AddReviewRequest) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/review`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
            credentials: 'include',
        });

        if (!resp.ok) return false;
        
        return true;
    } catch (error) {
        console.error('리뷰 저장 실패:', error);
        return null;
    }
}

export async function deleteReview(seq: number) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/${seq}`;
        const resp = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!resp.ok) return false;
        
        return true;
    } catch (error) {
        console.error('리뷰 삭제 실패:', error);
        return null;
    }
}
