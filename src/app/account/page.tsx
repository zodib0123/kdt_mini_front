'use client';



export default function LoginPage() {

    const loginButton = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8080/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(credentials),
    //         });
    //         if (response.ok) {
    //             const jwtToken = response.headers.get("Authorization");
    //             if (jwtToken) {
    //                 sessionStorage.setItem("jwtToken", jwtToken);
    //                 sessionStorage.setItem("username", credentials.username);
    //             }
    //             navigate("/welcome");
    //         } else {
    //             alert("로그인 실패!");
    //         }
    //     } catch (error) {
    //         console.error("로그인 오류!", error);
    //     }
    };
    return (
        <div className="login-container" style={{ textAlign: "center" }}>
            <h2>로그인</h2>
            <div className="form-group">
                <label htmlFor="username">사용자명</label>
                <input type="text" id="username" placeholder="사용자명을 입력하세요" />
                    {/* value={credentials.username} onChange={handleChange} /> */}
            </div >
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
                    {/* value={credentials.password} onChange={handleChange} /> */}
            </div >
            <button type="button" className="login-btn" onClick={loginButton}>
                로그인
            </button>
            <div className="divider">
                <span>또는</span>
            </div>
            <a href="http://localhost:8080/oauth2/authorization/google"
                className="google-login" > 구글 로그인</a >
            <a href="http://localhost:8080/oauth2/authorization/naver"
                className="naver-login" > 네이버 로그인</a >
        </div >
    );
}