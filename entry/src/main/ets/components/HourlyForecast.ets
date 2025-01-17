import { HourlyWeather } from '../model/WeatherData';

@Component
export struct HourlyForecast {
  @Prop hourlyData: HourlyWeather[]

  build() {
    Column() {
      Text('24小时预报')
        .fontSize(20)
        .fontWeight(FontWeight.Medium)
        .alignSelf(ItemAlign.Start)
        .margin({ left: 20, top: 16, bottom: 8 })

      if (this.hourlyData.length > 0) {
        List({ space: 12 }) {
          ForEach(this.hourlyData, (item: HourlyWeather) => {
            ListItem() {
              Column() {
                Text(item.time)
                  .fontSize(14)
                Text(`${item.temperature}°`)
                  .fontSize(16)
                  .margin({ top: 4 })
                Text(item.weather)
                  .fontSize(14)
                  .margin({ top: 4 })
              }
              .width(80)
              .height(100)
              .backgroundColor('#fff')
              .borderRadius(12)
              .padding(8)
            }
          })
        }
        .width('100%')
        .height(120)
        .listDirection(Axis.Horizontal)
        .padding({ left: 16, right: 16 })
      } else {
        Text('暂无预报数据')
          .fontSize(14)
          .margin({ top: 8 })
      }
    }
    .width('100%')
    .margin({ top: 16 })
  }
}