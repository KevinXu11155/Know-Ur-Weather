import router from '@ohos.router';
import { StorageUtil } from '../utils/StorageUtil';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct CityManagement {
  @State cityList: string[] = [];
  @State newCity: string = '';
  @State currentCity: string = '';

  aboutToAppear() {
    this.loadCityList();
  }

  async loadCityList() {
    this.cityList = await StorageUtil.getCityList();
    if (this.cityList.length === 0) {
      // 如果城市列表为空，添加默认城市
      this.cityList = ['北京'];
      await StorageUtil.saveCityList(this.cityList);
    }
    this.currentCity = await StorageUtil.getCurrentCity(); // 设置当前城市
  }

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .margin({ left: 16 })
          .onClick(() => {
            router.back();
          })

        Text('城市管理')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ left: 16 })

        Blank()
      }
      .width('100%')
      .height(56)
      .backgroundColor(Color.White)

      // 添加城市输入区
      Row() {
        TextInput({
          text: this.newCity,
          placeholder: '请输入城市名称'
        })
          .width('70%')
          .height(40)
          .margin({ right: 16 })
          .onChange((value: string) => {
            this.newCity = value;
          })

        Button('添加')
          .width('20%')
          .height(40)
          .onClick(() => {
            this.addCity();
          })
      }
      .width('90%')
      .margin({ top: 16, bottom: 16 })

      // 城市列表
      List() {
        ForEach(this.cityList, (city: string) => {
          ListItem() {
            Row() {
              Text(city)
                .fontSize(16)
                .fontColor(city === this.currentCity ? '#0A59F7' : '#333333')  // 当前选中的城市显示蓝色

              if (city === this.currentCity) {
                Text('当前')
                  .fontSize(12)
                  .fontColor('#0A59F7')
                  .margin({ left: 8 })
              }

              Blank()

              if (city !== '北京') {  // 不允许删除默认城市
                Button({ type: ButtonType.Circle }) {
                  Image($r('app.media.delete'))
                    .width(20)
                    .height(20)
                }
                .width(32)
                .height(32)
                .onClick(() => {
                  this.deleteCity(city);
                })
              }
            }
            .width('100%')
            .padding(16)
            .backgroundColor(Color.White)
            .onClick(() => {  // 添加点击事件
              this.switchCity(city);
            })
          }
        })
      }
      .width('100%')
      .layoutWeight(1)
      .divider({
        strokeWidth: 1,
        color: '#EEEEEE'
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  private async switchCity(city: string) {
    await StorageUtil.saveCity(city);
    promptAction.showToast({
      message: '切换城市成功',
      duration: 2000,
    });
    // 返回首页并刷新数据
    router.back();
  }

  private async addCity() {
    if (!this.newCity.trim()) {
      promptAction.showToast({
        message: '请输入城市名称',
        duration: 2000,
      });
      return;
    }

    if (this.cityList.includes(this.newCity.trim())) {
      promptAction.showToast({
        message: '该城市已存在',
        duration: 2000,
      });
      return;
    }

    // 添加新城市
    this.cityList.push(this.newCity.trim());
    await StorageUtil.saveCityList(this.cityList);

    // 清空输入
    this.newCity = '';

    promptAction.showToast({
      message: '添加成功',
      duration: 2000,
    });
  }

  private async deleteCity(city: string) {
    let newList = this.cityList.filter(item => item !== city);
    await StorageUtil.saveCityList(newList);
    this.cityList = newList;

    promptAction.showToast({
      message: '删除成功',
      duration: 2000,
    });
  }
}