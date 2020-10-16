const KakaoStrategy = require('passport-kakao').Strategy
const userDB = require('../../models/user')

module.exports = new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: `${process.env.BASE_URL}/auth/kakao/callback`
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        // google, naver처럼 email 정보를 받아와서 그대로 넣으려고 했지만 나같은 경우가 있으면 곤란해지므로 예외적으로 id 사용
        // 회원가입 시 별도 이메일 인증 과정 필요
        // But, 그러면 유효하지 않은 이메일을 카카오 계정에 등록한 회원보다 더 많은 수의 회원이 귀찮지 않을까?
        // Then, 유효하지 않은 이메일인지 확인하는 과정(이메일 인증)을 거치도록 하자.

        const { id, provider, username, _json: { kakao_account: { email } } } = profile
        
        const params = { id, type: provider, email: email, fullName: username }

        if (await userDB.IsExists({ type: params.type, id: params.id })) await userDB.SignIn(params)
        else await userDB.SignUp(params)

        const user = await userDB.GetItem({ type: params.type, email: params.email })
        
        return done(null, user)
    }
    catch (err) {
        return done(null, { error: err })
    }
})