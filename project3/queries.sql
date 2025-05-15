/*
 * 특정 사용자가 처리해야 할 결재 건 조회 쿼리
 * 
 * 기능:
 * 1. 현재 사용자가 결재해야 할 문서 목록을 조회
 * 2. 이전 결재자들이 모두 승인한 문서만 표시
 * 3. 아직 최종 승인/반려되지 않은 문서만 표시
 * 4. 오래된 문서부터 순서대로 정렬
 */
SELECT 
    ad.id as document_id,          -- 문서 고유 번호
    ad.title,                      -- 문서 제목
    ad.content,                    -- 문서 내용
    u.username as requester_name,  -- 요청자 이름
    u.department as requester_department,  -- 요청자 부서
    ad.created_at as request_date, -- 요청 일시
    al.approval_order             -- 현재 결재 순서
FROM approval_documents ad
INNER JOIN users u ON ad.requester_id = u.id  -- 요청자 정보 조회
INNER JOIN approval_lines al ON ad.id = al.document_id  -- 결재 라인 정보 조회
WHERE al.approver_id = :user_id  -- 현재 사용자의 결재 대상 문서만 필터링
AND al.status = 'PENDING'  -- 아직 처리하지 않은 결재 건만 조회
AND ad.status = 'PENDING'  -- 최종 승인/반려되지 않은 문서만 조회
AND NOT EXISTS (  -- 이전 단계 결재가 모두 완료된 건만 조회
    SELECT 1 
    FROM approval_lines prev
    WHERE prev.document_id = ad.id
    AND prev.approval_order < al.approval_order  -- 현재 사용자의 결재 순서보다 앞선 순서
    AND prev.status != 'APPROVED'  -- 승인되지 않은 이전 단계가 있는지 확인
)
ORDER BY ad.created_at ASC;  -- 오래된 문서부터 정렬 