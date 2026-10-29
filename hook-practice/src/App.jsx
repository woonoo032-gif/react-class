// React에서 사용할 훅 가져오기
import { useEffect, useRef, useState } from 'react'
import './App.css' // CSS 파일 연결

function App() {
  // 1. 학생 이름 저장, name : 입력한 학생 이름. setName : 학생 이름 변경
  const [name, setName] = useState('')
  // 2. 출석 상태 저장, attendance : 출석 상태, 처음에는 '출석'
  const [attendance, setAttendance] = useState('출석')
  // 3. 메모 내용 저장, memo : 학생에 대한 메모
  const [memo, setMemo] = useState('')
  // 4. 등록된 학생 목록 저장, students : 등록 학생 배열
  const [students, setStudents] = useState([])
  // 5. 결과 메시지 저장
  const [message, setMessage] = useState('')
  // 6. 현재 시간 저장
  const [currentTime, setCurrentTime] = useState(new Date())
  // 7. 이름 입력창을 직접 가리키기 위한 useRef
  const nameInputRef = useRef(null)

  // 8. 현재 시간 자동 변경
  useEffect(() => {
    // 1초마다 실행
    const timer = setInterval(() => {
      // 현재 시간을 새로 저장
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      // 컴포넌트가 사라질 때 타이머 종료
      clearInterval(timer)
    }
  }, [])

  // 9. 화면이 처음 실행될 때 이름 입력창 선택
  useEffect(() => {
    // input 요소가 존재하면
    if (nameInputRef.current) {
      // 입력창으로 커서 이동
      nameInputRef.current.focus()
    }
  }, [])

  // 10. 학생 추가 함수
  const addStudent = () => {
    // 이름을 입력하지 않은 경우
    if (name === '') {
      setMessage('학생 이름을 입력하세요.')
      // 다시 이름 입력창으로 이동
      nameInputRef.current.focus()
      return
    }

    const newStudent = {
      // 새로운 학생 객체 생성
      id: Date.now(), // 고유 번호
      name: name, // 학생 이름
      attendance: attendance, // 출석 상태
      memo: memo // 메모
    }

    // 기존 학생 목록에 새로운 학생 추가
    const updatedStudents = students.concat(newStudent)
    // 새로운 배열 저장
    setStudents(updatedStudents)
    // 완료 메시지
    setMessage('학생이 등록되었습니다.')
    // 입력값 초기화
    setName('')
    setAttendance('출석')
    setMemo('')
    // 다시 이름 입력창으로 이동
    nameInputRef.current.focus()
  }

  // 11. 학생 한 명 삭제 함수
  const deleteStudent = (id) => {
    // 삭제할 학생을 제외한 새로운 배열 생성
    const updatedStudents = students.filter((student) =>
      student.id !== id
    )
    setStudents(updatedStudents) // 변경된 배열 저장
    // 결과 메시지
    setMessage('학생 정보가 삭제되었습니다.')
  }

  // 12. 전체 학생 초기화
  const clearStudents = () => {
    // 학생 배열 비우기
    setStudents([])
    // 메시지 출력
    setMessage('전체 학생 목록을 초기화했습니다.')
    // 이름 입력창으로 이동
    nameInputRef.current.focus()
  }

  // 13. 출석 학생 수 계산
  const presentStudents = students.filter((student) =>
    student.attendance === '출석'
  )

  // 14. 지각 학생 수 계산
  const lateStudents = students.filter((student) =>
    student.attendance === '지각'
  )

  // 15. 결석 학생 수 계산
  const absentStudents = students.filter((student) =>
    student.attendance === '결석'
  )

  // 16. 화면 출력
  return (
    <main className="page">
      {/* 제목 */}
      <h1>학생 출석·메모 관리</h1>

      {/* 현재 시간 */}
      <section className="time-box">
        <span>현재 시간</span>
        <strong>
          {currentTime.toLocaleTimeString()}
        </strong>
      </section>

      {/* 학생 입력 영역 */}
      <section className="form-box">
        <h2>학생 등록</h2>

        {/* 학생 이름 */}
        <div className="form-group">
          <label>학생 이름</label>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="학생 이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 출석 상태 */}
        <div className="form-group">
          <label>출석 상태</label>
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          >
            <option value="출석">출석</option>
            <option value="지각">지각</option>
            <option value="결석">결석</option>
          </select>
        </div>

        {/* 메모 */}
        <div className="form-group">
          <label>메모</label>
          <textarea
            placeholder="메모 입력"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          >
          </textarea>
        </div>

        {/* 학생 추가 버튼 */}
        <button className="add-button" onClick={addStudent}>
          학생 추가
        </button>

        {/* 결과 메시지 */}
        {message !== '' && (
          <p className="message">{message}</p>
        )}
      </section>

      {/* 출석 현황 */}
      <section className="summary-box">
        <h2>출석 현황</h2>
        <div className="summary-list">
          <div>
            <span>전체</span>
            <strong>{students.length}명</strong>
          </div>
          <div>
            <span>출석</span>
            <strong>{presentStudents.length}명</strong>
          </div>
          <div>
            <span>지각</span>
            <strong>{lateStudents.length}명</strong>
          </div>
          <div>
            <span>결석</span>
            <strong>{absentStudents.length}명</strong>
          </div>
        </div>
      </section>

      {/* 학생 목록 */}
      <section className="student-box">
        <div className="student-header">
          <h2>학생 목록</h2>
          <button onClick={clearStudents}>
            전체 초기화
          </button>
        </div>

        {/* 학생이 없을 경우 */}
        {students.length === 0 && (
          <p className="empty-message">
            등록된 학생이 없습니다.
          </p>
        )}

        {/* 학생 목록 반복 출력 */}
        {students.map((student) => (
          <article className="student-card" key={student.id}>
            <div>
              <h3>{student.name}</h3>
              <p>
                출석 상태 : {' '} {student.attendance}
              </p>
              <p>
                메모 : {' '}
                {student.memo === '' ? '없음' : student.memo}
              </p>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteStudent(student.id)}
            >
              삭제
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App