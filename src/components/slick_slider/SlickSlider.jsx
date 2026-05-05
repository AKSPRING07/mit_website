import ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ReactSlick?.default ?? ReactSlick;

export const SlickSlider = (props) => <SliderComponent {...props} />;
