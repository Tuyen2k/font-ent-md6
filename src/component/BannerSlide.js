import React, {Component} from "react";
import Slider from "react-slick";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "white" }}
            onClick={onClick}>
        </div>

    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "white" }}
            onClick={onClick}
        />
    );
}
export default class BannerSlide extends Component {
    render() {
        var settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div>
                <Slider {...settings}>
                    <div className="banner-item">
                        <img src="https://tea-3.lozi.vn/v1/images/resized/banner-mobile-4899-1679481807?w=600&type=o"
                             alt=""/>
                    </div>
                    <div className="banner-item">
                        <img src="https://tea-3.lozi.vn/v1/images/resized/banner-mobile-4899-1679481807?w=600&type=o"
                             alt=""/>
                    </div>
                    <div className="banner-item">
                        <img src="https://tea-3.lozi.vn/v1/images/resized/banner-mobile-4899-1679481807?w=600&type=o"
                             alt=""/>
                    </div>
                    <div className="banner-item">
                        <img src="https://tea-3.lozi.vn/v1/images/resized/banner-mobile-4899-1679481807?w=600&type=o"
                             alt=""/>
                    </div>
                    <div className="banner-item">
                        <img src="https://tea-3.lozi.vn/v1/images/resized/banner-mobile-4899-1679481807?w=600&type=o"
                             alt=""/>
                    </div>
                    <div className="banner-item">
                        <img src="https://tea-3.lozi.vn/v1/images/resized/banner-mobile-4899-1679481807?w=600&type=o"
                             alt=""/>
                    </div>
                </Slider>
            </div>
        );
    }
}