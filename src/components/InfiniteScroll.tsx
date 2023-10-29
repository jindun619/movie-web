// components/InfiniteScroll.tsx
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps = {
  items: any[]; // 렌더링할 아이템 배열
  fetchMore: () => void; // 추가 데이터를 가져오는 함수
  hasMore: boolean; // 더 많은 아이템이 있는지 여부
};

const InfiniteScroll = ({ items, fetchMore, hasMore }: InfiniteScrollProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      fetchMore();
    }
  }, [inView, hasMore, fetchMore]);

  return (
    <div>
      {items.map((v, i) => (
        <div key={i}>{v}</div>
      ))}
      <div ref={ref}></div>
    </div>
  );
};

export default InfiniteScroll;
