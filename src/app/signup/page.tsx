'use client';

import { Activity, Lock, Undo2, UserRound, UserRoundPen, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveUserInfo } from './actions'

export default function SignupPage() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        pwd: '',
        alias: ''
    });

    const [errors, setErrors] = useState({
        userId: '',
        pwd: '',
        alias: ''
    });

    const isFormValid =
        Object.values(formData).every(value => value.trim() !== '') &&
        Object.values(errors).every(error => error === '');

    const validate = (name: string, value: string) => {
        let error = '';
        if (name === 'userId') {
            const idRegex = /^[a-z0-9]{6,12}$/;
            if (!idRegex.test(value)) {
                error = '아이디는 6~12자의 영문 소문자, 숫자만 가능합니다.';
            }
        } else if (name === 'pwd') {
            const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/;
            if (!pwRegex.test(value)) {
                error = '비밀번호는 8~18자, 대문자/소문자/숫자/특수문자를 각각 포함해야 합니다.';
            }
        } else if (name === 'alias') {
            const aliasRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
            if (!aliasRegex.test(value)) {
                error = '닉네임은 2~8자의 한글/대소문자/숫자만 가능합니다.';
            }
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validate(name, value); // 입력 시 실시간 검증
    };

    const handleSubmit = async () => {
        if (!isFormValid || isLoading) return;

        setIsLoading(true);
        try {
            const result = await saveUserInfo({
                mid: formData.userId,
                pwd: formData.pwd,
                alias: formData.alias
            });

            if (result) {
                alert('회원가입이 완료되었습니다!');
                router.push('/signin');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className="flex items-center gap-3 px-6 mb-12">
                <div className="bg-blue-600 p-2 mr-5 rounded-xl text-white">
                    <Activity size={40} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-wider">K-Sports Hub</h1>
            </div>
            <div className="w-130 h-100 bg-white border-gray-200 p-5 rounded-3xl border shadow-md flex flex-col text-center space-y-7 pt-8">
                <div className="flex flex-col gap-1">
                    <div className="relative px-5">
                        <div className="absolute ml-5 inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <UserRound className="text-gray-400" />
                        </div>
                        <input name="userId"
                            type="text"
                            placeholder="UserID"
                            value={formData.userId}
                            onChange={handleChange}
                            className={`w-full h-12 pl-12 text-lg px-3 border-2 border-gray-200 rounded-2xl focus:outline-none
                                focus:border-blue-500  active:border-blue-500 transition-all
                                ${errors.userId ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                        />
                    </div>
                    <div className="flex justify-start pl-10 h-2">
                        {errors.userId && <p className="text-red-500 text-xs pl-2">{errors.userId}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="relative px-5">
                        <div className="absolute ml-5 inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <Lock className="text-gray-400" />
                        </div>
                        <input name="pwd"
                            type="password"
                            placeholder="pwd"
                            value={formData.pwd}
                            onChange={handleChange}
                            className={`w-full h-12 pl-12 text-lg px-3 border-2 border-gray-200 rounded-2xl focus:outline-none
                                focus:border-blue-500  active:border-blue-500 transition-all
                                ${errors.pwd ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                        />
                    </div>
                    <div className="flex justify-start pl-10 h-2">
                        {errors.pwd && <p className="text-red-500 text-xs pl-2">{errors.pwd}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="relative px-5">
                        <div className="absolute ml-5 inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <UserRoundPen className="text-gray-400" />
                        </div>
                        <input name="alias"
                            type="text"
                            placeholder="Alias"
                            value={formData.alias}
                            onChange={handleChange}
                            className={`w-full h-12 pl-12 text-lg px-3 border-2 border-gray-200 rounded-2xl focus:outline-none
                                focus:border-blue-500  active:border-blue-500 transition-all
                                ${errors.alias ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                        />
                    </div>
                    <div className="flex justify-start pl-10 h-2">
                        {errors.alias && <p className="text-red-500 text-xs pl-2">{errors.alias}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5 px-5'>
                    <div className="relative">
                        <div className="absolute ml-5 inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                            <UserRoundPlus className="text-white" />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!isFormValid || isLoading}
                            className={`w-full h-12 pl-5 text-md text-white font-bold text-lg rounded-2xl transition-all 
                                ${isFormValid
                                    ? 'bg-blue-400 hover:bg-blue-500 cursor-pointer'
                                    : 'bg-gray-300 cursor-not-allowed opacity-70'}`}
                        >
                            {isLoading ? '처리 중...' : '회원가입'}
                        </button>
                    </div>
                    <Link href={`/signin`}
                        className="relative ">
                        <div className="absolute ml-5 inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <Undo2 className="text-white" />
                        </div>
                        <button className="w-full h-12 pl-5 text-md text-white font-bold text-lg rounded-2xl bg-red-400 hover:bg-red-500 transition-all cursor-pointer">
                            뒤로가기
                        </button>
                    </Link>
                </div>

            </div >
        </div >
    );
}