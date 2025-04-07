declare module "react-responsive-carousel" {
  import React from "react";

  export interface CarouselProps {
    showArrows?: boolean;
    showStatus?: boolean;
    showIndicators?: boolean;
    showThumbs?: boolean;
    infiniteLoop?: boolean;
    autoPlay?: boolean;
    stopOnHover?: boolean;
    interval?: number;
    transitionTime?: number;
    swipeable?: boolean;
    dynamicHeight?: boolean;
    emulateTouch?: boolean;
    centerMode?: boolean;
    centerSlidePercentage?: number;
    selectedItem?: number;
    onChange?: (index: number, item: React.ReactNode) => void;
    onClickItem?: (index: number, item: React.ReactNode) => void;
    onClickThumb?: (index: number, item: React.ReactNode) => void;
    className?: string;
    children?: React.ReactNode;
  }

  export class Carousel extends React.Component<CarouselProps> {}
}
