# `Button`

<div align="center">
  <sup>
    <a href="https://6758546295e48c1f5cb91421-troqdvgxok.chromatic.com/?path=/docs/react-components-button--docs">
      <h2 >📖 Storybook</h2>
    </a>
  </sup>
  <br />
  <br />
</div>

## Installation

CLI

```bash
npx pio-essential add Button
```

<br />

## Usage

```tsx
import { Button } from "@/components/ui/Button";
```

```tsx
<Button>
  <span>{args.size === "icon" ? "🔥" : "Click!"}</span>
</Button>
```

<br />

## Reference

- **`variant?`**_`: "flat" | "plain" | "ghost" | "outline" | "link" | "disabled"`_ - 버튼 스타일 (flat | optional)
- **`size?`**_`:  "default" | "sm" | "lg" | "icon"`_ - 버튼 크기 (default | optional)
- **`width?`**_`:  number`_ - 버튼 넓이 명시 값 (-1) 이하 값의 경우 백분율로 치환 (content size | optional)
- **`loading?`**_`: boolean`_ - 로딩 상태 활성화 (false | optional)
- **`disabled?`**_`: boolean`_ - 버튼 비활성화 (false | optional)
- **`onClick`**_`: () => void`_ - 버튼 클릭 핸들러 함수 (required)
