'use client';

import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function CallbackClient() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth();

    useEffect(() => {
        const alias = searchParams.get('alias')
        const mid = searchParams.get('mid')
        const token = searchParams.get('token')

        if (alias && mid && token) {
            login(alias, mid, token);
            router.replace('/');
        } else {
            router.replace('/signin');
        }
    }, [searchParams, router, login])

    return <div>로그인 처리 중...</div>
}