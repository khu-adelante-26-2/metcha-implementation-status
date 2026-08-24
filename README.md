# 멧챠 카멜레온 공개 설계

축제 플랫폼의 멧챠 카멜레온 사용자 흐름과 현재 구현 상태를 공개하는 저장소입니다.

- 공개 현황: https://khu-adelante-26-2.github.io/metcha-implementation-status/
- 연결 와이어프레임: https://khu-adelante-26-2.github.io/metcha-implementation-status/wireframes.html
- 범위: 축제 웹 사진 인증·적립, 카카오 보호 링크의 이어하기·확인·쿠폰 사용
- 현재 상태: 사용자 흐름과 보안 경계 설계 완료, 앱·API 구현 전

와이어프레임은 확정된 사용자 흐름과 아직 확인할 정책을 구분합니다. 사진 1~3장의 최종 성공 집계와 스탬프·쿠폰 발급 기준은 담당자가 확정하기 전까지 구현된 규칙처럼 표시하지 않습니다.

## 검증

```bash
node scripts/validate-wireframes.mjs wireframes.html
```

공개 HTML 원본은 이 저장소에서 관리합니다.

