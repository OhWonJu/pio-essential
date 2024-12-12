# `Sidebar`

Resizeable Sidebar Components

[storybook](https://6758546295e48c1f5cb91421-zthmjnwxmn.chromatic.com/?path=/docs/react-components-sidebar--docs)

<br/>

## Installation

CLI

```bash
npx pio-essential add useOutsideClick
npx pio-essential add ChevronLeft
npx pio-essentail add ChevronRight
npx pio-essential add Sidebar
```

<br />

```bash
npm install -D @types/body-scroll-lock
npm install body-scroll-lock
```

```bash
yarn add -D body-scroll-lock
yarn add body-scroll-lock
```

<br />

## Usage

중앙집중화된 형태로 Sidebar 를 사용하는 것을 권장합니다. <br/>
전역상태관리 라이브러리를 이용해 Sidebar 의 활성화 여부, Sidebar view 를 관리합니다.

<br />

**SidebarProivder**

```tsx
import { useSidebar } from "@/stores/useSidebarStore";

import { MenuSidebar, SettingSidebar } from "@/components/Sidebar/sidebarViews";

export function SidebarProvider() {
  const { type } = useSidebar();

  return (
    <>
      {type === "menu" && <MenuSidebar />}
      {type === "setting" && <SettingSidebar />}
      ...
    </>
  );
}

export default SidebarProvider;
```

<br />

**SidebarView**

```tsx
import { useSidebar } from "@/stores/useSidebarStore";

import {
  SidebarBody,
  SidebarFooter,
  SidebarLayout,
} from "@/components/ui/Sidebar";


export function MenuSidebar() {
  const { isOpne, onClose } = useSidebar();

  ...

  const SidebarHeader = <span>Menu</span>;

  return (
    <SidebarLayout
      isOpen={isOpen}
      onClose={onClose}
      headerComponent={SidebarHeader}
    >
      <SidebarBody>
        <div>Body</div>
      </SidebarBody>
      <SidebarFooter>
        <div>Footer</div>
      </SidebarFooter>
    </SidebarLayout>
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
      <SidebarProvider />
      ...
    </div>
  );
}
```

<br />

**Sidebar Consumer Component**

```tsx
export function SidebarConsumber() {
  const { onOpen } = useSidebar();

  ...

  return (
    <div>
      ...
      <button onClick={() => onOpne("menu")}>Menu</button>
      ...
    </div>
  );
}
```

<br />

## Advanced Usage

### 반응형 Sidebar

useMediaQuery 등을 사용하여 SidebarLayout 을 수정하면 화면의 크기에 따른 반응형 Sidebar 를 구현할 수 있습니다. <br />

**SidebarLayout**

```tsx
...
import useViewModeStore from "@/stores/useViewMode";
...
```

```tsx
export const SidebarLayout = ({
  children,
  headerComponent,
  disabled,
  minWidth = 200,
  maxWidth = 400,
  isOpen,
  outsideClickClose = true,
  onClose,
  resizeable = true,
  className,
  align = "left",
}: PropsWithChildren<SidebarLayoutProps>) => {
  ...
  const viewMode = useViewModeStore(state => state.viewMode);
  ...

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!resizeable) return;
    if (viewMode === "MOBILE") return;

    isResizeingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  ...

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!resizeable) return;
    if (viewMode === "MOBILE") return;

    isResizeingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizeingRef.current) return;
    if (!resizeable) return;
    if (viewMode === "MOBILE") return;

    let newWidth =
      align === "left" ? event.clientX : event.view.innerWidth - event.clientX;

    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    if (!resizeable) return;
    if (viewMode === "MOBILE") return;

    isResizeingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsResetting(true);

      sidebarRef.current.style.width = viewMode === "MOBILE" ? "100%" : "300px";

      setTimeout(() => setIsResetting(false), DURATION);
    }
  };

  ...

  useEffect(() => {
    resetWidth();
  }, [sidebarRef.current, viewMode]);

 ...
};
```

<br />

### 페이지 경로 변경 시 자동으로 Sidebar 비활성화

react-router-dom 등을 사용하여, path 가 변경되는 경우 Sidebar 를 닫는 로직을 SidebarLayout 로직에 추가할 수 있습니다.

**SidebarLayout**

```tsx
...
import { useLocation } from "react-router";
...
```

```tsx
export const SidebarLayout = ({
  children,
  headerComponent,
  disabled,
  minWidth = 200,
  maxWidth = 400,
  isOpen,
  outsideClickClose = true,
  onClose,
  resizeable = true,
  className,
  align = "left",
}: PropsWithChildren<SidebarLayoutProps>) => {
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

- **`align?`**_`:  "left" | "right`_ - Sidebar 배치 위치 (left | optional)
- **`maxWidth?`**_`:  number`_ - Sidebar 기본 넓이 및 최대 넓이 px (400 | optional)
- **`minWidth?`**_`:  number`_ -Sidebar 최소 넓이 px (200 | optional)
- **`outsideClickClose?`**_`:  booelan`_ - Sidebar 외부 클릭으로 Sidebar 닫기 활성화 (true | optional)
- **`resizeable?`**_`:  boolean`_ - Sidebar 넓이 조절 활성화 (true | optional)
