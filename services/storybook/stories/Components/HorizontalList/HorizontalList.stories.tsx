import React, { useState } from "react";

import { HorizontalList } from "@pio-essential/react-components-horizontal-list";

export default {
  title: "React Components/Horizontal List",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "수평 리스트 제목 (optional)",
    },
    hasMore: {
      control: "boolean",
      description: "더보기 옵션 활성화 (true | optional)",
    },
    hasMoreGuide: {
      control: "text",
      description: "더보기 가이드 텍스트 (더보기 | optional)",
    },
    hasMoreAction: {
      description: "더보기 액선 함수 (() => void | optional)",
    },
    exceptionGuide: {
      control: "text",
      description: "리스트 예외 가이드 텍스트 (optional)",
    },
    exceptionAction: {
      description: "리스트 에외 액선 함수 (() => void | optional)",
    },
    singleLine: {
      control: "boolean",
      description:
        "단일 행 여부 설정, 다중 행인 경우 list Height 와 render item height 에 맞게 행으로 item 표시 (false | optional)",
    },
    maxHeight: {
      control: "number",
      description: "수평 리스트 아이템 영역 최대 높이 (400 | optional)",
    },
    renderer: {
      description:
        "List Item 렌더러 함수 (() => JSX.Element[] | undefined | optional)",
    },
  },
  args: {
    title: "수평 리스트",
    hasMore: true,
    hasMoreGuide: "더보기",
    exceptionGuide: "보여줄 리스트가 없어요",
    singleLine: false,
    maxHeight: 400,
  },
};

export const HorizontalListStory = {
  render: (args: {
    title?: string;
    hasMore?: boolean;
    hasMoreGuide?: string;
    exceptionGuide?: string;
    singleLine?: boolean;
    maxHeight?: number;
  }) => {
    const Renderer = () => {
      const [data, setData] = useState(new Array(20).fill(false));

      const clickHandler = (index: number) => {
        const newData = [...data];

        newData[index] = !newData[index];

        setData(newData);
      };

      const listRenderer = () => {
        return data.map((_, index) => (
          <div
            key={index}
            onClick={() => clickHandler(index)}
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
    };

    return <Renderer />;
  },
};

export const HorizontalListExceptionStory = {
  render: (args: { exceptionGuide?: string }) => {
    const Renderer = () => {
      const listRenderer = () => undefined;

      return (
        <div className="min-w-[400px] w-full bg-background p-10">
          <HorizontalList
            title="수평 리스트 예외"
            renderer={listRenderer}
            exceptionGuide={args.exceptionGuide}
          />
        </div>
      );
    };

    return <Renderer />;
  },
};
