import { WeatherData } from '../model/WeatherData';
import { StorageUtil } from '../utils/StorageUtil';
import { HttpUtil } from '../utils/HttpUtil';
import { WeatherCard } from '../components/WeatherCard';
import { DatabaseUtil } from '../utils/DatabaseUtil';
import { UserUtil } from '../utils/UserUtil';
import { pinyin4js } from '@ohos/pinyin4js';
import web_webview from '@ohos.web.webview';
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import preferences from '@ohos.data.preferences';
import common from '@ohos.app.ability.common';

interface GeneratedObjectLiteralInterface_1 {
  success: boolean;
  message: string;
}

interface GeneratedObjectLiteralInterface_2 {
  success: boolean;
  message: string;
}

@Entry
@Component
struct Index {
  @State weatherData: WeatherData = new WeatherData();
  @State currentCity: string = '北京';
  @State CityID: string = '110011';
  @State currentCityPinYin: string = 'beijing';
  @State url_sm: string = 'http://m.nmc.cn/publish/forecast/ABJ/beijing.html';
  @State url_lg: string = 'http://www.nmc.cn/publish/forecast/ABJ/beijing.html';
  @State url: string = 'http://m.nmc.cn/publish/forecast/ABJ/beijing.html';
  @State province: string = 'BJ'
  @State province_id: string = '11'
  @State isLoading: boolean = true;
  controller: web_webview.WebviewController = new web_webview.WebviewController();
  @StorageProp('currentBreakpoint') curBp: string = ''

  // 监听页面显示事件，用于在返回时刷新数
  aboutToAppear() {
    this.loadWeatherData();
  }

  // 从城市管理页面返回时刷新数据
  onPageShow() {
    this.loadWeatherData();
  }

  async loadWeatherData() {
    try {
      this.isLoading = true;

      // 获取当前城市
      this.currentCity = await StorageUtil.getCurrentCity();
      this.CityID = await HttpUtil.getCityId(this.currentCity);
      this.currentCityPinYin = pinyin4js.convertToPinyinString(this.currentCity, '', pinyin4js.WITHOUT_TONE);
      if(this.currentCity == '呼和浩特'){
        this.currentCityPinYin = 'saihan1';
      }

      this.province_id  = this.CityID.substring(0,2);
      if (this.province_id === '11') {
        this.province = 'BJ'; // 北京
      } else if (this.province_id === '12') {
        this.province = 'TJ'; // 天津
      } else if (this.province_id === '13') {
        this.province = 'HE'; // 河北
      } else if (this.province_id === '14') {
        this.province = 'SX'; // 山西
      } else if (this.province_id === '15') {
        this.province = 'NM'; // 内蒙古
      } else if (this.province_id === '21') {
        this.province = 'LN'; // 辽宁
      } else if (this.province_id === '22') {
        this.province = 'JL'; // 吉林
      } else if (this.province_id === '23') {
        this.province = 'HL'; // 黑龙江
      } else if (this.province_id === '31') {
        this.province = 'SH'; // 上海
      } else if (this.province_id === '32') {
        this.province = 'JS'; // 江苏
      } else if (this.province_id === '33') {
        this.province = 'ZJ'; // 浙江
      } else if (this.province_id === '34') {
        this.province = 'AH'; // 安徽
      } else if (this.province_id === '35') {
        this.province = 'FJ'; // 福建
      } else if (this.province_id === '36') {
        this.province = 'JX'; // 江西
      } else if (this.province_id === '37') {
        this.province = 'SD'; // 山东
      } else if (this.province_id === '41') {
        this.province = 'HA'; // 河南
      } else if (this.province_id === '42') {
        this.province = 'HB'; // 湖北
      } else if (this.province_id === '43') {
        this.province = 'HN'; // 湖南
      } else if (this.province_id === '44') {
        this.province = 'GD'; // 广东
      } else if (this.province_id === '45') {
        this.province = 'GX'; // 广西
      } else if (this.province_id === '46') {
        this.province = 'HI'; // 海南
      } else if (this.province_id === '50') {
        this.province = 'CQ'; // 重庆
      } else if (this.province_id === '51') {
        this.province = 'SC'; // 四川
      } else if (this.province_id === '52') {
        this.province = 'GZ'; // 贵州
      } else if (this.province_id === '53') {
        this.province = 'YN'; // 云南
      } else if (this.province_id === '54') {
        this.province = 'XZ'; // 西藏
      } else if (this.province_id === '61') {
        this.province = 'SN'; // 陕西
      } else if (this.province_id === '62') {
        this.province = 'GS'; // 甘肃
      } else if (this.province_id === '63') {
        this.province = 'QH'; // 青海
      } else if (this.province_id === '64') {
        this.province = 'NX'; // 宁夏
      } else if (this.province_id === '65') {
        this.province = 'XJ'; // 新疆
      } else if (this.province_id === '81') {
        this.province = 'XG'; // 香港
      } else if (this.province_id === '82') {
        this.province = 'AM'; // 澳门
      } else if (this.province_id === '71') {
        this.province = 'TW'; // 台湾
      }
      this.url_sm =  'http://m.nmc.cn/publish/forecast/A' + this.province + '/' + this.currentCityPinYin + '.html';
      this.url_lg =  'http://www.nmc.cn/publish/forecast/A' + this.province + '/' + this.currentCityPinYin + '.html';
      if(this.curBp === 'sm'){
        this.url = this.url_sm;
      }
      else{
        this.url = this.url_lg;
      }
      this.controller.loadUrl(this.url);
      console.info('网页信息SM', this.url_sm);
      console.info('网页信息LG', this.url_lg);
      console.info('当前城市:', this.currentCity);

      // 先尝试从数据库获取缓存的天气数据
      const latestData = await DatabaseUtil.getLatestWeatherData(this.currentCity);
      // 检查数据是否过期（10分钟）
      const isDataValid = latestData && latestData.updateTime &&
        (new Date().getTime() - new Date(latestData.updateTime).getTime() < 10 * 60 * 1000);

      if (isDataValid) {
        console.info('使用数据库中的天气数据');
        this.weatherData = latestData;
      } else {
        console.info('获取新的天气数据');

        // 获取新数据
        const cityId = await HttpUtil.getCityId(this.currentCity);
        this.weatherData = await HttpUtil.getNowWeather(cityId);

        // 保存新数据到数据库
        await DatabaseUtil.saveWeatherData(this.weatherData, this.currentCity);
        await StorageUtil.saveUpdateTime(new Date().toISOString());
      }
      this.isLoading = false;

    } catch (error) {
      console.error('加载天气数据失败:', error);
      this.isLoading = false;
    }
  }

  async handleLogout() {
    try {
      await UserUtil.clearLoginState();

      promptAction.showToast({
        message: '已退出登录',
        duration: 2000
      });

      setTimeout(() => {
        router.replaceUrl({
          url: 'pages/Login'
        });
      }, 1000);
    } catch (error) {
      console.error('退出登录失败:', error);
      return ({
        success: false,
        message: '退出登录失败'
      } as GeneratedObjectLiteralInterface_1);
    }
    return ({
      success: true,
      message: '退出成功'
    } as GeneratedObjectLiteralInterface_2);
  }

  @Builder
  WeatherInfoItem(label: string, value: string) {
    Row() {
      Text(label)
        .fontSize(14)
        .fontColor('#666666')
      Text(value)
        .fontSize(14)
        .fontColor('#333333')
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ top: 8, bottom: 8 })
  }

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Text(this.currentCity)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)

        Blank()

        Button({ type: ButtonType.Circle }) {
          Image($r('app.media.refresh'))
            .width(24)
            .height(24)
        }
        .width(36)
        .height(36)
        .margin({ left: 8 })
        .onClick(() => {
          this.loadWeatherData();
        })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16, right: 16 })
      .backgroundColor(Color.White)

      Tabs({ barPosition: BarPosition.End }) {

        //当前天气页面
        TabContent() {
          Column() {
            if (this.isLoading) {
              LoadingProgress()
                .width(32)
                .height(32)
                .margin({ top: 120 })
            } else {
              WeatherCard({
                temperature: this.weatherData.temperature,
                weather: this.weatherData.weather,
                humidity: this.weatherData.humidity
              })
                .margin({ top: 16 })

              Column() {
                this.WeatherInfoItem("更新时间", this.weatherData.updateTime)
              }
              .margin({ top: 16 })
              .padding(16)
              .backgroundColor(Color.White)
              .borderRadius(12)
            }
          }
          .width('100%')
          .height('100%')
          .padding(16)
        }
        .tabBar(this.TabBuilder('当前天气'))

        // 天气详情页面，使用WebView
        TabContent() {
          Stack() {
            Web({
              src: this.url,
              controller: this.controller
            })
              .width('100%')
              .height('100%')
              .zoomAccess(true)// 允许缩放
              .fileAccess(true)// 允许文件访问
              .javaScriptAccess(true)
              .domStorageAccess(true)// 允许 DOM Storage
              .mixedMode(MixedMode.All)// 允许混合内容
              .onPageBegin((event) => {
                console.info('网页开始加载:', event);
                console.info('网页地址:', this.url);
                console.info('网页地址',this.curBp);
              })
              .onPageEnd((event) => {
                console.info('网页加载完成:', event);
              })
          }
          .width('100%')
          .height('100%')
        }
        .tabBar(this.TabBuilder('天气详情'))

        //设置
        TabContent() {
          Column() {
            List() {
              ListItem() {
                Row() {
                  Column() {
                    Text('城市管理')
                      .fontSize(16)
                      .fontColor('#333333')
                      .margin({ bottom: 4 })
                    Text('当前：' + this.currentCity)
                      .fontSize(14)
                      .fontColor('#666666')
                  }
                  .alignItems(HorizontalAlign.Start)

                  Blank()

                  Image($r('app.media.arrow_right'))
                    .width(20)
                    .height(20)
                    .margin({ right: 8 })
                }
                .width('100%')
                .padding({
                  left: 16,
                  right: 16,
                  top: 12,
                  bottom: 12
                })
                .backgroundColor(Color.White)
                .onClick(() => {
                  try {
                    router.pushUrl({
                      url: 'pages/CityManagement'
                    }).then(() => {
                      console.info('跳转成功');
                    }).catch((error: Error) => {
                      console.error('跳转失败:', error.message);
                    });
                  } catch (error) {
                    console.error('路由错误:', error);
                  }
                })
              }

              // 可以添加其他设置项
              ListItem() {
                Row() {
                  Text('自动更新')
                    .fontSize(16)
                    .fontColor('#333333')
                  Blank()
                  Toggle({ type: ToggleType.Switch, isOn: false })
                    .onChange((isOn: boolean) => {
                      console.info('自动更新:', isOn);
                    })
                }
                .width('100%')
                .padding({
                  left: 16,
                  right: 16,
                  top: 12,
                  bottom: 12
                })
                .backgroundColor(Color.White)
              }

              ListItem() {
                Row() {
                  Text('退出登录')
                    .fontSize(16)
                    .fontColor('#FF4D4F')
                  Blank()
                }
                .width('100%')
                .padding({
                  left: 16,
                  right: 16,
                  top: 12,
                  bottom: 12
                })
                .backgroundColor(Color.White)
                .onClick(async () => {
                  try {
                    await this.handleLogout();
                  } catch (error) {
                    console.error('退出登录失败:', error);
                    promptAction.showToast({
                      message: '退出失败，请重试',
                      duration: 2000
                    });
                  }
                })
              }
            }
            .backgroundColor('#F5F5F5')
            .divider({
              strokeWidth: 1,
              color: '#EEEEEE',
              startMargin: 16,
              endMargin: 16
            })
          }
          .width('100%')
        }
        .tabBar(this.TabBuilder('设置'))
      }
      .width('100%')
      .layoutWeight(1)
      .barHeight(56)
      .barMode(BarMode.Fixed)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  @Builder
  TabBuilder(title: string) {
    Column() {
      Text(title)
        .fontSize(16)
        .fontColor(Color.Black)
        .padding({ top: 8, bottom: 8 })
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}