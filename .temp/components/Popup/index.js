import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { Swiper, SwiperItem, View, Image } from "@tarojs/components";
import "./index.scss";

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: this.props.curId,
      showMask: true,
      addStyle: true,
      popupStyle2: this.props.popupStyle
    };
    this.handleChangeSwiper = this.handleChangeSwiper.bind(this);
    this.handleClickPopup = this.handleClickPopup.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }
  componentWillMount() {}
  componentDidMount() {
    this.transitionLock = true;
    Taro.getSystemInfo().then(res => {
      this.systemInfo = res;
    });
    this.setState({
      addStyle: false
    });
  }
  componentDidShow() {}
  handleChangeSwiper(e) {
    const { current } = e.detail;
    this.current = current;
  }

  handleClickPopup() {
    this.setPopupStyle();
    this.props.onSettingScrollTop();
    this.setState({
      addStyle: true,
      showMask: false,
      current: this.current
    });
    this.transitionLock = false;
  }

  setPopupStyle() {
    if (this.current === undefined) {
      this.current = this.props.curId;
    }

    if (this.current === this.props.curId) {
      return;
    }

    const MARGIN = 5;
    const { width, height, top, left } = this.props.rect;
    const scale = width / this.systemInfo.screenWidth;
    const baseTop = top - Math.floor(this.props.curId / 3) * (height + MARGIN);
    const baseLeft = left - this.props.curId % 3 * (width + MARGIN);
    const row = Math.floor(this.current / 3);
    const column = this.current % 3;
    const increaseTop = row * (height + MARGIN);
    const increaseLeft = column * (width + MARGIN);

    const popupStyle2 = {
      top: `${baseTop + increaseTop}px`,
      left: `${baseLeft + increaseLeft}px`,
      transform: `translate(0,0px) scale(${scale})`
    };

    this.setState({
      popupStyle2
    });
  }

  onTransitionEnd(e) {
    if (this.transitionLock) {
      return;
    }
    console.log("onTransitionEnd", e);
    this.props.onHandleHidePopup();
  }

  render() {
    return <View className="popup" onClick={this.handleClickPopup}>
        {this.state.showMask && <View className="mask" />}
        <View className="swiper-box" style={this.state.addStyle ? this.state.popupStyle2 : ""} onTransitionEnd={this.onTransitionEnd}>
          <Swiper className="swiper" indicatorColor="#999" indicatorActiveColor="#333" circular indicatorDots current={this.state.current} onChange={this.handleChangeSwiper}>
            {this.props.list && this.props.list.map((item, index) => {
            return <SwiperItem className="swiper-item" key={`swiper-item${index}`}>
                    <Image className="swiper-item-img" src={item} />
                  </SwiperItem>;
          })}
          </Swiper>
        </View>
      </View>;
  }
}

export default Popup;