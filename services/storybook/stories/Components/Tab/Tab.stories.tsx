import React, { useRef } from "react";
import {
  TabHeader,
  TabProvider,
  TabSection,
  TabRef,
} from "@pio-essential/react-components-tab";

export default {
  title: "React Components/Tab",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultActiveTab: {
      options: [-1, 0, 1, 2],
      control: "select",
      description:
        "기본으로 선택된 Tab 지정 - -1 을 통해 Tab 비활성화를 표시할 수 있음 (0 | optional)",
    },
    useAnimation: {
      control: "boolean",
      description:
        "Tab Section view 의 x 축 transition 애니메이션 적용 유무 (true | optional)",
    },
    distance: {
      control: "number",
      description:
        "Tab Section view 의 애니메이션 x 축 transition 이동 거리 (10 | optional)",
    },
    duration: {
      control: "number",
      description:
        "Tab Section view 의 애니메이션 x 축 transition 이동 시간-초 (0.3 | optional)",
    },
  },
  args: {
    useAnimation: true,
    distance: 10,
    duration: 0.3,
    defaultActiveTab: 0,
  },
};
export const TabStory = {
  render: (args: {
    useAnimation: boolean;
    distance: number;
    duration: number;
    defaultActiveTab: number;
  }) => {
    const tabRef = useRef<TabRef>(null);

    const activeTab = (index: number) => {
      tabRef.current?.activeTab(index);
    };

    return (
      <div className="w-[500px] h-[500px] bg-background overflow-hidden">
        <TabProvider ref={tabRef} defaultActiveTab={args.defaultActiveTab}>
          <TabHeader className="h-[60px]">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </TabHeader>
          <TabSection
            className="p-4 w-full"
            distance={args.distance}
            duration={args.duration}
            useAnimation={args.useAnimation}
          >
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
  },
};
