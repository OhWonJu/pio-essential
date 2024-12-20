# `Tab`

Compound Components 패턴, motion(구 Framer-motion) 기반 Tab Components

[storybook](https://6758546295e48c1f5cb91421-qzkaggnqsg.chromatic.com/?path=/docs/react-components-tab--docs)

<br/>

## Installation

CLI

```bash
npx pio-essential add Tab
```

<br />

```bash
npm install motion
```

```bash
yarn add motion
```

<br />

## Usage

```tsx
import { TabHeader, TabProvider, TabSection } from "@/components/ui/Tab";

export function TabDemo() {
  return (
    <div className="w-[500px] h-[500px] bg-background overflow-hidden">
      <TabProvider defaultActiveTab={0}>
        <TabHeader className="h-[60px]">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </TabHeader>
        <TabSection className="p-4" distance={30} duration={0.4} useAnimation>
          <div className="bg-red-100">tab1</div>
          <div className="bg-blue-200">tab2</div>
          <div className="bg-green-200">tab3</div>
        </TabSection>
      </TabProvider>
    </div>
  );
}
```

<br />

## Advanced Usage

### TabProvider 외부 스코프에서 Tab 조작하기

TabProvider 에 Ref 를 전달하여 TabProvider 내부의 activeTab 함수를 사용할 수 있습니다.
이를 통해 TabHeader 와 같은 TabProvider 내부 스코프 밖에서 Tab 활성화를 제어 할 수 있습니다.

```tsx
import {
  TabHeader,
  TabProvider,
  TabSection,
  TabRef,
} from "@/components/ui/Tab";

export function TabDemo() {
  const tabRef = useRef<TabRef>(null);

  const activeTab = (index: number) => {
    tabRef.current?.activeTab(index);
  };

  return (
    <div className="w-[500px] h-[500px] bg-background overflow-hidden">
      <TabProvider ref={tebRef} defaultActiveTab={0}>
        <TabHeader className="h-[60px]">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </TabHeader>
        <TabSection className="p-4" distance={30} duration={0.4} useAnimation>
          <div className="bg-red-100">tab1</div>
          <div className="bg-blue-200">tab2</div>
          <div className="bg-green-200">tab3</div>
        </TabSection>
      </TabProvider>

      <div className="mt-4 w-full grid place-items-center">
          <button
            onClick={() => activeTab(1)}
            className="p-2 border rounded-md"
          >
            active Tab2
          </button>
      </div>
    </div>
  );
}
```

<br />

## Reference

- **`defaultActiveTab?`**_`:  string`_ - 기본으로 선택된 Tab 지정 - -1 을 통해 Tab 비활성화를 표시할 수 있음 (0 | optional)
- **`useAnimation?`**_`:  string`_ - Tab Section view 의 x 축 transition 애니메이션 적용 유무 (true | optional)
- **`distance?`**_`:  string`_ - Tab Section view 의 애니메이션 x 축 transition 이동 거리 (10 | optional)
- **`duration?`**_`:  string`_ - Tab Section view 의 애니메이션 x 축 transition 이동 시간-초 (0.3 | optional)
