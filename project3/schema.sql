-- 사용자 테이블: 결재 시스템을 사용하는 모든 사용자 정보 저장
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '사용자 고유 식별자',
    username VARCHAR(50) NOT NULL COMMENT '사용자 이름',
    email VARCHAR(100) NOT NULL COMMENT '사용자 이메일',
    department VARCHAR(50) NOT NULL COMMENT '소속 부서',
    position VARCHAR(50) NOT NULL COMMENT '직위/직책',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '계정 생성일시',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '계정 수정일시',
    UNIQUE KEY unique_username (username),
    UNIQUE KEY unique_email (email)
) COMMENT '결재 시스템 사용자 정보';

-- 결재 문서 테이블: 결재가 필요한 모든 문서의 기본 정보 저장
CREATE TABLE approval_documents (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '문서 고유 식별자',
    title VARCHAR(200) NOT NULL COMMENT '문서 제목',
    content TEXT NOT NULL COMMENT '문서 내용',
    requester_id INT NOT NULL COMMENT '결재 요청자 ID',
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING' COMMENT '문서 상태(대기/승인/반려)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '문서 생성일시',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '문서 최종 수정일시',
    FOREIGN KEY (requester_id) REFERENCES users(id)
) COMMENT '결재 대상 문서 정보';

-- 결재 라인 테이블: 각 문서의 결재자 순서와 상태 정보 저장
CREATE TABLE approval_lines (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '결재 라인 고유 식별자',
    document_id INT NOT NULL COMMENT '대상 문서 ID',
    approver_id INT NOT NULL COMMENT '결재자 ID',
    approval_order INT NOT NULL COMMENT '결재 순서(1부터 시작)',
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING' COMMENT '결재 상태(대기/승인/반려)',
    comment TEXT COMMENT '결재자 코멘트(승인/반려 사유)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '결재 라인 생성일시',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '결재 상태 변경일시',
    FOREIGN KEY (document_id) REFERENCES approval_documents(id),
    FOREIGN KEY (approver_id) REFERENCES users(id),
    UNIQUE KEY unique_document_order (document_id, approval_order)
) COMMENT '결재 진행 상태 및 이력 정보'; 