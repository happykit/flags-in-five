import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "confetti-react";

export default function Banner() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
