
import { Suspense } from 'react'
import CallbackClient from './CallbackClient'

export default function SigninCallbackPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <CallbackClient />
        </Suspense>
    )
}