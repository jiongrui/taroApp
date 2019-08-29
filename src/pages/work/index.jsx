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
    this.handleSettingScrollTop = this.handleSettingScrollTop.bind(this);
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
    // console.log("eeee", e);
    const target = e.currentTarget;
    const { id, offsetTop } = target;
    const { midx, nidx } = target.dataset;
    const workItem = this.state.works[midx].list;

    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect(rect => {
        // console.log("rect", rect);
        const { width, top, left } = rect;
        const scale = width / this.systemInfo.screenWidth;
        const popupStyle = {
          top: `${top}px`,
          left: `${left}px`,
          transform: `translate(0,0px) scale(${scale})`
        };
        this.scrollTop = offsetTop - top;

        this.setState({
          workItem,
          showPopup: true,
          curIndex: nidx,
          popupStyle,
          rect
        });
      })
      .exec();
  }

  handleHidePopup() {
    this.setState({
      showPopup: false
    });
  }

  handleSettingScrollTop() {
    this.setState({
      scrollTop: this.scrollTop
    });
  }

  render() {
    return (
      <View className="work">
        <ScrollView scrollY scrollTop={this.state.scrollTop} className="list">
          {this.state.works.map((work, midx) => (
            <View className="list-item" key={`work${midx}`}>
              <View className="img-list">
                {work.list.map((item, nidx) => (
                  <View
                    className="img-box"
                    key={`work${nidx}`}
                    style={{
                      width:
                        work.list.length < 3
                          ? `calc(${100 / work.list.length}% - 5px)`
                          : `calc(${100 / 3}% - 5px)`,
                      marginLeft: "5px",
                      marginTop: nidx > 2 ? "5px" : 0
                    }}
                  >
                    <View
                      className="img-inbox"
                      onClick={this.handleShowPopup}
                      data-midx={midx}
                      data-nidx={nidx}
                      id={`work${midx}${nidx}`}
                      style={{ backgroundImage: `url(${item})` }}
                    >
                      {/* <Image className="img" src={item} /> */}
                    </View>
                  </View>
                ))}
              </View>
              <View className="introduce">{work.introduce}</View>
            </View>
          ))}
        </ScrollView>
        {this.state.showPopup && (
          <Popup
            list={this.state.workItem}
            onHandleHidePopup={this.handleHidePopup}
            onSettingScrollTop={this.handleSettingScrollTop}
            curId={this.state.curIndex}
            popupStyle={this.state.popupStyle}
            rect={this.state.rect}
          />
        )}
      </View>
    );
  }
}
