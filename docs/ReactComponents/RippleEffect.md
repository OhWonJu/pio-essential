# `RippleEffect`

클릭 액션에 반응하는 잔물결 이펙트

<div align="center">
  <sup>
    <a href="https://6758546295e48c1f5cb91421-troqdvgxok.chromatic.com/?path=/docs/react-components-rippleeffect--docs">
      <h2 >📖 Storybook</h2>
    </a>
  </sup>
  <br />
  <br />
</div>

## Installation

CLI

```bash
npx pio-essential add RippleEffect
```

<br />

## Usage

```tsx
import { RippleEffect, RippleRef } from "@/components/ui/RippleEffect";
```

```tsx
export function RippleEffectDemo {
  const rippleRef = useRef<RippleRef>(null);

  const onClickHandler = (event: MouseEvent<HTMLElement>) => {
    rippleRef.current?.createRipple(event);
  };

  return (
    <Button
      onClick={(e) => onClickHandler(e)}
    >
      <RippleEffect
        ref={rippleRef}
        rippleColor={args.rippleColor ? args.rippleColor : "var(--puls)"}
      />
      <span>
        Click!
      </span>
    </Button>
  );
}
```

<br />

## Reference

- **`rippleColor?`**_`:  string`_ - Ripple Effect 색상 (#21212120 | optional)
