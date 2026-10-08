import './App.css'

// 프로필 이미지 불러오기
import profileImg from './assets/photo.png'

// QR 코드 라이브러리 불러오기
import { QRCodeSVG } from 'qrcode.react'

function App() {
  const name = '그냥이'
  const studentId = '20220831'
  const department = '츄르영양학과 · 고양이'
  const goal = '하루 세 츄르를 과학적으로 정당화하기'

  // QR 코드에 들어갈 정보
  const qrData =
    '이름: ' + name +
    '\n학번: ' + studentId +
    '\n학과: ' + department

  return (
    <main className="page">
      <section className="profile-card">

        <span className="status">● LIVE</span>

        {/* 프로필 사진 */}
        <img
          src={profileImg}
          alt="프로필 사진"
          className="avatar-img"
        />

        <p className="eyebrow">HELLO REACT</p>

        <h1>{name}</h1>

        {/* 학번 표시 */}
        <p className="student-id">
          학번 : {studentId}
        </p>

        {/* 학과 정보 */}
        <p className="department">
          {department}
        </p>

        <div className="divider"></div>

        {/* 목표 */}
        <p className="goal">
          목표: {goal}
        </p>

        {/* 기술 스택 */}
        <div className="tags">
          <span>츄르</span>
          <span>낮잠</span>
          <span>집사관리</span>
        </div>

        {/* 학생 QR 코드 */}
        <div className="qr-area">
          <QRCodeSVG
            value={qrData}
            size={100}
          />

          <p>고양이 QR</p>
        </div>

        <button>츄르 후원하기</button>

      </section>
    </main>
  )
}

export default App