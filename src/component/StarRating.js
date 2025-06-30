import { useState } from "react";
const styleStar = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const style = {
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "white",
  alignItems: "center",
};
export default function StarRating({
  starLength = 5,
  defaultRate = 0,
  color = "#fff",
  removeNumberStars = false,
}) {
  const [rate, setRate] = useState(defaultRate);
  const [rateHover, setRateHover] = useState(rate);
  function handleRating(rating) {
    setRate(rating);
  }
  function handleHoverRating(ratingHover) {
    setRateHover(ratingHover);
  }
  function handleLeaveRating(ratingLeave) {
    setRateHover(ratingLeave);
  }

  return (
    <div style={style}>
      <div style={styleStar}>
        {Array.from({ length: starLength }, (_, i) => (
          <Star
            color={color}
            key={i}
            onHover={() => handleHoverRating(i + 1)}
            onLeave={() => handleLeaveRating(rate)}
            onClick={() => handleRating(i + 1)}
            fullHover={rateHover >= i + 1}
          />
        ))}
      </div>
      {!removeNumberStars && (
        <div style={{ color: color }}>
          {rate} / {starLength}
        </div>
      )}
    </div>
  );
}

function Star({ onClick, onHover, onLeave, fullHover, color }) {
  return (
    <div onMouseOver={onHover} onMouseOut={onLeave} onClick={onClick}>
      {fullHover ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill={color}
            d="m7.625 6.4l2.8-3.625q.3-.4.713-.587T12 2t.863.188t.712.587l2.8 3.625l4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9l.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25q-.125.05-.275.063T6.975 21q-.8 0-1.4-.6T5 18.925l.1-4.125l-2.725-3.875q-.2-.275-.288-.575T2 9.75q0-.625.363-1.162t1.012-.763z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill={color}
            d="m7.625 6.4l2.8-3.625q.3-.4.713-.587T12 2t.863.188t.712.587l2.8 3.625l4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9l.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25q-.125.05-.275.063T6.975 21q-.8 0-1.4-.6T5 18.925l.1-4.125l-2.725-3.875q-.2-.275-.288-.575T2 9.75q0-.625.363-1.162t1.012-.763zM8.85 8.125L4 9.725L7.1 14.2L7 18.975l5-1.375l5 1.4l-.1-4.8L20 9.775l-4.85-1.65L12 4zM12 11.5"
          />
        </svg>
      )}
    </div>
  );
}
