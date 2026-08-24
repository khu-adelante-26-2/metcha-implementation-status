import { readFile } from "node:fs/promises";

const file = process.argv[2] ?? "wireframes.html";
const html = await readFile(file, "utf8");
const errors = [];

const count = (pattern) => html.match(pattern)?.length ?? 0;
const expect = (condition, message) => {
  if (!condition) errors.push(message);
};

expect(count(/data-frame=/g) >= 16, "모바일 화면이 16개 이상이어야 합니다.");
expect(count(/class="story"/g) === 4, "사용자 이야기는 사진 인증·전화번호 적립·3개 전·3개 완료의 4개여야 합니다.");
expect(count(/class="rail"/g) === 4, "각 사용자 이야기에 가로 레일이 하나씩 있어야 합니다.");
expect(/사진 1~3장/.test(html), "사진 1~3장 제출 규칙이 없습니다.");
expect(/data-ai-processing="per-image"/.test(html), "사진별 AI 처리 표식이 없습니다.");
expect(/data-capability="earn-only"/.test(html), "축제 웹의 적립 전용 표식이 없습니다.");
expect(/이어하기/.test(html) && /확인/.test(html) && /사용/.test(html), "카카오 링크의 이어하기·확인·사용 흐름이 불완전합니다.");
expect(/data-stamp-max="3"/.test(html), "스탬프 최대 3개 규칙이 없습니다.");
expect(html.includes('data-frame="continue-upload-from-one" data-upload-min="1" data-upload-max="2"'), "스탬프 1개일 때 최대 2장 선택 규칙이 없습니다.");
expect(html.includes('data-frame="continue-upload-from-two" data-upload-min="1" data-upload-max="1"'), "스탬프 2개일 때 최대 1장 선택 규칙이 없습니다.");
expect(html.includes('data-stamp-count="1" data-coupon-visible="false"'), "스탬프 1개일 때 쿠폰이 숨겨져야 합니다.");
expect(html.includes('data-stamp-count="2" data-coupon-visible="false"'), "스탬프 2개일 때 쿠폰이 숨겨져야 합니다.");
expect(html.includes('data-stamp-count="3" data-coupon-visible="true" data-registration-allowed="false"'), "스탬프 3개일 때 쿠폰 표시와 추가 적립 차단이 필요합니다.");
expect(/data-frame="retry-source-sheet"/.test(html) && /카메라로 다시 촬영/.test(html) && /사진 보관함에서 선택/.test(html), "인증 실패 뒤 바텀시트 재시도 흐름이 없습니다.");
expect(/data-requires-admin-password="true"/.test(html) && /관리자 비밀번호/.test(html), "사용자 휴대폰에서 관리자가 비밀번호를 입력하는 쿠폰 사용 흐름이 없습니다.");
const afterThree = html.slice(html.indexOf('id="after-three"'));
expect(!/data-action="continue"/.test(afterThree), "스탬프 3개 완료 뒤에는 이어하기가 없어야 합니다.");
expect(!/(보호 링크 확인|보호됨|전화번호·만료 링크|위변조·추측 링크|화면 뒤 요청 경계|정책으로 확인한 뒤)/.test(html), "사용자에게 불필요한 보안·시스템 메타 화면이 남아 있습니다.");
expect(!/SVG\s*(내보내기|다운로드)/i.test(html), "SVG 내보내기 기능을 넣지 않습니다.");
expect(!/foreignObject/i.test(html), "foreignObject를 넣지 않습니다.");
expect(!/cursor:\s*(grab|grabbing|move)/i.test(html), "패닝 커서를 넣지 않습니다.");
expect(/\.rail\s*\{[\s\S]*?overflow-x:\s*auto/.test(html), "가로 레일은 자연스럽게 스크롤되어야 합니다.");

if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: ${count(/data-frame=/g)}개 화면 · 4개 사용자 이야기 · 스탬프 3개 상한 · 관리자 비밀번호 쿠폰 사용`);
