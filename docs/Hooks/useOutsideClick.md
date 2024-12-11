# `useOutsideClick`

특정 영역 외부 클릭에 대한 callback 기능을 제공하는 Hook

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
npx pio-essential add useOutsideClick
```

<br />

## Usage

```tsx
import { useOutsideClick } from "@/hooks/useOutsideClick";

export function UseOutsideClickDemo() {
  ...
  const [showModal, setShowModal] = useState(false);

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleClose = () => {
    ...
  };

  useOutsideClick(showModal, containerRef, handleClose);

  return (
    <ModalOverlay ref={ref} role="dialog">
      <ModalCotainer
        ref={containerRef}
      >
        <ModalHeader>
          {header}
        </ModalHeader>
        <ModalContent>{body}</ModalContent>
        <ModalFooter>{footer}</ModalFooter>
      </ModalCotainer>
    </ModalOverlay>
  );
}
```

<br />

## Reference

- **`enabled`**_`: boolean`_ - 불필요한 이벤트 리스너 등록 방지를 위한 값
- **`elementRef`**_`: React.MutableRefObject<HTMLElement | null>`_ - 대상 React Component의 Ref, 해당 컴포넌트 외부 클릭시 callback 실행
- **`callback`**_`: () => void`_
