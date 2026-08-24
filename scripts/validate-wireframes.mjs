import { readFile } from "node:fs/promises";

const file = process.argv[2] ?? "wireframes.html";
const html = await readFile(file, "utf8");
const errors = [];

const count = (pattern) => html.match(pattern)?.length ?? 0;
const expect = (condition, message) => {
  if (!condition) errors.push(message);
};

expect(count(/data-frame=/g) >= 20, "모바일 화면이 20개 이상이어야 합니다.");
expect(count(/class="story"/g) >= 5, "사용자 이야기가 5개 이상이어야 합니다.");
expect(count(/class="rail"/g) >= 5, "가로 레일이 5개 이상이어야 합니다.");
expect(/사진 1~3장/.test(html), "사진 1~3장 제출 규칙이 없습니다.");
expect(/한 장씩 독립/.test(html), "Core의 장별 AI 요청 경계가 없습니다.");
expect(/축제 웹은 적립만/.test(html), "축제 웹의 적립 전용 경계가 없습니다.");
expect(/이어하기/.test(html) && /확인/.test(html) && /사용/.test(html), "카카오 링크의 이어하기·확인·사용 흐름이 불완전합니다.");
expect(/만료/.test(html) && /위변조/.test(html) && /추측 불가/.test(html), "보호 링크 보안 상태가 불완전합니다.");
expect(/확인 필요/.test(html), "미정 정책 표시가 없습니다.");
expect(!/SVG\s*(내보내기|다운로드)/i.test(html), "SVG 내보내기 기능을 넣지 않습니다.");
expect(!/foreignObject/i.test(html), "foreignObject를 넣지 않습니다.");
expect(!/cursor:\s*(grab|grabbing|move)/i.test(html), "패닝 커서를 넣지 않습니다.");
expect(/\.rail\s*\{[\s\S]*?overflow-x:\s*auto/.test(html), "가로 레일은 자연스럽게 스크롤되어야 합니다.");

if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log(`PASS: ${count(/data-frame=/g)}개 화면, ${count(/class="story"/g)}개 이야기의 구조와 권한 경계를 확인했습니다.`);

