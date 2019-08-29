import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import "../../assets/images/erha.jpg";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "一只dog"
  };

  constructor() {
    super();
    this.goWork = this.goWork.bind(this);

    this.state = {
      avatarUrl: "../../assets/images/erha.jpg"
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  goWork() {
    Taro.navigateTo({ url: "../work/index" });
  }

  render() {
    return (
      <View className="index">
        <View className="avatar">
          <Image className="avatar-img" src={this.state.avatarUrl} />
        </View>
        <View className="row">
          <View className="label">姓名</View>
          <View className="msg">一只dog</View>
        </View>
        <View className="row">
          <View className="label">技能</View>
          <View className="msg">ai、ps、pr、logo设计、字体设计</View>
        </View>
        <View className="what" />
        <View className="go-work" onClick={this.goWork}>
          点击查看作品
        </View>
      </View>
    );
  }
}
