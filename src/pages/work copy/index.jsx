import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import Popup from "../../components/Popup/index";
import "./index.scss";
import { WORKS } from "../../utils/index";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "my works"
  };

  constructor() {
    super();

    this.state = {
      works: WORKS,
      showPopup: false
    };

    this.handleShowPopup = this.handleShowPopup.bind(this);
    this.handleHidePopup = this.handleHidePopup.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    Taro.getSystemInfo().then(res => {
      this.systemInfo = res;
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleShowPopup(e) {
    console.log("eeee", e);
    const target = e.currentTarget;
    const { midx } = target.dataset;
    const { id } = target;

    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect(rect => {
        console.log("rect", rect);
        const { width, top } = rect;
        const scale = width / this.systemInfo.screenWidth;
        const popupStyle = {
          top: `${top}px`,
          transform: `translate(-50%,0px) scale(${scale})`
        };

        this.setState({
          showPopup: true,
          curIndex: midx,
          popupStyle
        });
      })
      .exec();
  }

  handleHidePopup() {
    this.setState({
      showPopup: false
    });
  }

  render() {
    return (
      <View className="work">
        <ScrollView scrollY={!this.state.showPopup} className="list">
          {this.state.works.map((work, midx) => (
            <View className="list-item" key={`work${midx}`}>
              <View className="img-list">
                <View
                  className="img-box"
                  onClick={this.handleShowPopup}
                  data-midx={midx}
                  id={midx}
                >
                  <Image className="img" src={work.imgPath} />
                </View>
              </View>
              <View className="introduce">{work.introduce}</View>
            </View>
          ))}
        </ScrollView>
        {this.state.showPopup && (
          <Popup
            list={this.state.works}
            onHandleHidePopup={this.handleHidePopup}
            curId={this.state.curIndex}
            popupStyle={this.state.popupStyle}
          />
        )}
      </View>
    );
  }
}
