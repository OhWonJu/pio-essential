# `HorizontalList`

[storybook](https://6758546295e48c1f5cb91421-cmrntqxcen.chromatic.com/?path=/docs/react-components-horizontal-list--docs)

<br />

## Installation

CLI

```bash
npx pio-essential add useHorizontalScroll
npx pio-essential add HorizontalList
```

<br />

## Usage

```tsx
import { HorizontalList } from "@/components/ui/HorizontalList";

export function HorizontalListDemo() {
  const data = use(data.promise) as Data[];

  const clickHandler = () => {
    // Some Click event logic for list item
  };

  const listRenderer = () => {
    return data.map((_, index) => (
      <div
        key={index}
        onClick={clickHandler}
        className={`w-[150px] aspect-square grid place-items-center ${data[index] ? "bg-blue-100" : "bg-neutral-300"}`}
      >
        {index}
      </div>
    ));
  };

  return (
    <div className="min-w-[400px] w-full bg-background p-10">
      <HorizontalList
        title={args.title}
        renderer={listRenderer}
        maxHeight={args.maxHeight}
        hasMore={args.hasMore}
        hasMoreGuide={args.hasMoreGuide}
        exceptionGuide={args.exceptionGuide}
        singleLine={args.singleLine}
      />
    </div>
  );
}
```

<br />

## Reference

- **`title?`**_`: string`_ - 수평 리스트 제목 (optional)
- **`hasMore?`**_`:  boolean`_ - 더보기 옵션 활성화 (true | optional)
- **`hasMoreGuide?`**_`:  string`_ - 더보기 가이드 텍스트 (더보기 | optional)
- **`hasMoreAction?`**_`:  () => void`_ - 더보기 액선 함수 (() => void | optional)
- **`exceptionGuide?`**_`:  string`_ - 리스트 예외 가이드 텍스트 (optional)
- **`exceptionAction?`**_`:  () => void`_ - 리스트 에외 액선 함수 (() => void | optional)
- **`singleLine?`**_`:  boolean`_ - 단일 행 여부 설정, 다중 행인 경우 list Height 와 render item height 에 맞게 행으로 item 표시 (false | optional)
- **`maxHeight?`**_`: number`_ - 수평 리스트 아이템 영역 최대 높이 (400 | optional)
- **`disabled?`**_`: boolean`_ - 버튼 비활성화 (false | optional)
- **`renderer`**_`: () => JSX.Element[] | undefined`_ - List Item 렌더러 함수 (() => JSX.Element[] | undefined | optional)
