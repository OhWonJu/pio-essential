<div align="center">
  <h1>
    <br/>
    <br/>
    <br />
      pio-essential
  </h1>
  <span>
     TailwindCSS Based Design System
    <br />
    <br />
    <br />
  </span>
  <br />
  <br />
</div>

# Getting Start

## Introduction

<div align="center">
  <strong style="font-size: 16px;">
    만들어둔 컴포넌트나 훅을 다른 프로젝트에 계속 copy/paste 하는건 너무 귀찮아!
  </strong>
  <br />
  <br />
  <br />
</div>

그래서 만들어 봤습니다. <br/>
PIO 가 애정하고 자주 쓰는 React Components, Hooks 모음집 _**pio-essential**_
<br />
<br />

> **pio-essential:** <br/>
> 필요한 컴포넌트, 훅을 프로젝트에 복사하여 붙여넣을 수 있는 React 오픈 소스 라이브러리 입니다.

<br />

pio-essnital 은 npx 를 통해 필요한 컴포넌트, 훅을 복사하여 붙여넣을 수 있는 재사용 가능한 컴포넌트, 훅 모음입니다. <br />
필요한 컴포넌트, 훅을 선택하고 프로젝트에 복사하세요! 그리고 필요한 부분들을 수정해서 사용하세요! <br />
<br />
_pio-essential 의 컴포넌트, 훅은 npm 을 통해 제공되지 않습니다._ <br />
<br />

## Installation

**pio-essential** 은 [**shadcn/ui**](https://ui.shadcn.com/docs/installation) 으로부터 모티브를 얻었으며, **TailwindCSS** 를 기반으로 작성되었습니다. <br />
그렇기 때문에 pio-essential 의 컴포넌트를 사용하기 위해서는 다음의 종속성 설치 및 환경 설정이 필요합니다. <br />
<br />

> **Note**: Shadcn UI 를 사용하고 있다면 해당 단계를 건너뛰어도 무방합니다. <br /> [shadcn UI 를 통해 좀 더 자세하게 종속성 설치 및 환경 설정하기 (권장)](https://ui.shadcn.com/docs/installation/vite)

<br />

### 1. TailwindCSS 설치

<div style="display: flex; align-items: center;">
  <div style="display:grid; place-items: center; width:25px; height:25px; background-color: #fbfbf030; font-size: 16px; border-radius: 10px; margin-right:5px;">1</div>
  <span>Install Tailwind CSS</span>
</div>
<br />

Terminal

```
npm install -D tailwindcss postcss autoprefixer
```

```
yarn add -D tailwindcss postcss autoprefixer
```

<br />

```
npx tailwindcss init
```

<br />

<div style="display: flex; align-items: center;">
  <div style="display:grid; place-items: center; width:25px; height:25px; background-color: #fbfbf030; font-size: 16px; border-radius: 10px; margin-right:5px;">2</div>
  <span>Add Tailwind to your PostCSS configuration</span>
</div>
<br />

postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

<br />

<div style="display: flex; align-items: center;">
  <div style="display:grid; place-items: center; width:25px; height:25px; background-color: #fbfbf030; font-size: 16px; border-radius: 10px; margin-right:5px;">3</div>
  <span>Configure your template paths</span>
</div>
<br />

tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

<br />

<div style="display: flex; align-items: center;">
  <div style="display:grid; place-items: center; width:25px; height:25px; background-color: #fbfbf030; font-size: 16px; border-radius: 10px; margin-right:5px;">4</div>
  <span>Add the Tailwind directives to your CSS</span>
</div>
<br />

main.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

NextJS, Vite 등 다양한 환경에서의 TailwindCSS 설정은 [TailwindCSS 공식 문서](https://tailwindcss.com/docs/installation/framework-guides)를 따라주세요.
<br />
<br />

### 2. 그 외 종속성 설치 및 유틸리티 함수 생성

```
npm install tailwind-merge clsx class-variance-authority
```

```
yarn add tailwind-merge clsx class-variance-authority
```

<br />

src/lib/utils.ts

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

<br />

### 3. path alias 설정

pio-essential 의 컴포넌트, 훅은 다음의 구조에 복사됩니다.

```
root
└── 📦 src
    ├── 📂 components
    |   ├── 📂 ui
    |   └── 📂 icons
    └── 📂 hooks
```

연관된 컴포넌트, 유틸리티 함수 import 를 위해 path alias 설정이 필요합니다.
<br />
<br />

tsconfig

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

<br />
<br />

# StoryBook 을 통해 사용법 알아보기

[StoryBook](https://6758546295e48c1f5cb91421-zthmjnwxmn.chromatic.com/) 을 통해 컴포넌트 및 훅의 Reference를 알아보세요!

<br />
<br />

# Usage
```
npx pio-essential add <NAME>
```
<br />
<br />

# Components

- [`Button`](./docs/ReactComponents/Button.md)
- [`LoadingDots`](./docs/ReactComponents/LoadingDots.md)
- [`Modal`](./docs/ReactComponents//Modal.md)
- [`RippleEffect`](./docs/ReactComponents/RippleEffect.md) &mdash; 잔물결 이펙트를 생성하는 컴포넌트
- [`Sidebar`](./docs/ReactComponents//Sidebar.md) &mdash; Resizeable Sidebar 컴포넌트
- [`Tab`](./docs/ReactComponents/Tab.md) &mdash; React Context API 기반 Tab Header, Tab Section

<br />
<br />

# Hooks

- [`useOutsideClick`](./docs/Hooks/useOutsideClick.md) &mdash; 특정 영역 외부 클릭에 대한 callback 기능을 제공하는 Hook

<br />
