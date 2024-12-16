# `useHorizontalScroll`

수평 리스트의 Grabbing 이벤트를 통한 스크롤을 제공하는 Hook

<!-- <div align="center">
  <sup>
    <a href="">
      <h2 >📖 Storybook</h2>
    </a>
  </sup>
  <br />
  <br />
</div> -->

## Installation

CLI

```bash
npx pio-essential add useHorizontalScroll
```

<br />

## Usage

```tsx
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export function UseHorizontalScrollDemo() {
  const listRef = useRef<HTMLDivElement>(null);
  const isGrabbing = useHorizontalScroll(listRef, 50);

  return (
    <div ref={listRef} className="relative">
      {RenderedItems}
      {/* RenderedItems 클릭 방지를 위한 요소 */}
      <div
        className={cn(
          "absolute top-0 left-0 h-full bg-transparent",
          !isGrabbing && "hidden",
        )}
        style={{ width: listRef.current?.scrollWidth }}
      />
    </div>
  );
}
```

<br />

## Reference

- **`ref`**_`: React.RefObject<HTMLElement>`_ - 수평 스크롤 Grabbing 대상 컨테이너 요소의 ref
- **`sensitive?`**_`: number (10 | optional)`_ - 수평 스크롤 Grabbing 이벤트 활성화에 대한 임계값
