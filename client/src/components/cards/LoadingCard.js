import { Skeleton, Card } from "antd";
import React from "react";

export default function LoadingCard({ count }) {
  const cards = () => {
    const totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-4">
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="row pb-5">{ cards() }</div>;
}
