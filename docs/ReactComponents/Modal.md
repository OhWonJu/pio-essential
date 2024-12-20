# `Modal`

Modal Components

[storybook](https://6758546295e48c1f5cb91421-qzkaggnqsg.chromatic.com/?path=/docs/react-components-modal--docs)

<br/>

## Installation

CLI

```bash
npx pio-essential add useOutsideClick
npx pio-essential add Cross
npx pio-essential add Modal
```

<br />

```bash
npm install -D @types/body-scroll-lock
npm install body-scroll-lock
```

```bash
yarn add -D @types/body-scroll-lock
yarn add body-scroll-lock
```

<br />

## Usage

중앙집중화된 형태로 Modal 을 사용하는 것을 권장합니다. <br/>
전역상태관리 라이브러리를 이용해 Modal 의 활성화 여부, Modal view 를 관리합니다.

<br />

**ModalProivder**

```tsx
import { useModal } from "@/stores/useModalStore";

import { CartModal, ConfrimModal } from "@/components/Modal/modalViews";

export function ModalProvider() {
  const { type } = useModal();

  return (
    <>
      {type === "cart" && <CartModal />}
      {type === "confirm" && <ConfrimModal />}
      ...
    </>
  );
}

export default ModalProvider;
```

<br />

**ModalView**

```tsx
import { useModal } from "@/stores/useModalStore";

import { ModalBody, ModalFooter, ModalLayout } from "@/components/ui/Modal";

export function CartModal() {
  const { isOpne, onClose } = useModal();

  ...

  const ModalHeader = <span>Cart</span>;

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      mode={args.mode}
      headerComponent={ModalHeader}
    >
      <ModalBody>
        <div>Body</div>
      </ModalBody>
      <ModalFooter>
        <div>Footer</div>
      </ModalFooter>
    </ModalLayout>
  );
}
```

<br />

**Layout**

```tsx
export function App() {
  ...

  return (
    <div>
      ...
      <ModalProvider />
      ...
    </div>
  );
}
```

**Modal Consumer Component**

```tsx
export function ModalConsumer() {
  const { onOpen } = useModal();

  ...

  return (
    <div>
      ...
      <button onClick={() => onOpne("cart")}>Open Cart</button>
      ...
    </div>
  );
}
```

<br />

## Advanced Usage

### 페이지 경로 변경 시 자동으로 Modal 비활성화

react-router-dom 등을 사용하여, path 가 변경되는 경우 Modal 를 닫는 로직을 ModalLayout 로직에 추가할 수 있습니다.

**MoalLayout**

```tsx
...
import { useLocation } from "react-router";
...
```

```tsx
export const ModalLayout = ({
  children,
  headerComponent,
  disabled,
  isOpen,
  className,
  mode = "fade",
  onClose,
}: PropsWithChildren<ModalLayoutProps>) => {
  ...
  const location = useLocation();
  const currentPath = useRef(location.pathname);
  ...

  useEffect(() => {
    if (currentPath.current !== location.pathname) handleClose();
  }, [currentPath.current, location.pathname]);
  ...
};
```

<br />

## Reference

- **`mode?`**_`:  "fade" | "slide`_ - 모달 popup animation (fade | optional)
