# `RippleEffect`

클릭 액션에 의해 생성되는 잔물결 이펙트 컴포넌트

[storybook](https://6758546295e48c1f5cb91421-qzkaggnqsg.chromatic.com/?path=/docs/react-components-rippleeffect--docs)

<br/>

## Installation

CLI

```bash
npx pio-essential add RippleEffect
```

<br />

## Usage

```tsx
import { RippleEffect, RippleRef } from "@/components/ui/RippleEffect";

export function RippleEffectDemo() {
  const rippleRef = useRef<RippleRef>(null);

  const onClickHandler = (event: MouseEvent<HTMLElement>) => {
    rippleRef.current?.createRipple(event);
  };

  return (
    <Button
      onClick={(e) => onClickHandler(e)}
      className="relative overflow-hidden"
    >
      <RippleEffect
        ref={rippleRef}
        rippleColor={args.rippleColor ? args.rippleColor : "var(--puls)"}
      />
      <span>Click!</span>
    </Button>
  );
}
```

RippleEffect 의 범위를 제한하기 위해 RippleEffect 의 대상이 되는 컨테이너 컴포넌트에 다음의 스타일을 지정해야 합니다.

```css
position: relative;
overflow: hidden;
```

<br />

## Reference

- **`rippleColor?`**_`:  string`_ - Ripple Effect 색상 (#21212120 | optional)
