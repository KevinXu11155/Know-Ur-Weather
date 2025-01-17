@Component
export struct WeatherCard {
  @Prop temperature: number;
  @Prop weather: string;
  @Prop humidity: number;

  build() {
    Column() {
      Text(`${this.temperature}°`)
        .fontSize(64)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 20 })

      Text(this.weather)
        .fontSize(24)
        .margin({ top: 8 })

      Row() {
        Text('湿度:')
          .fontSize(16)
        Text(`${this.humidity}%`)
          .fontSize(16)
      }
      .margin({ top: 8, bottom: 20 })
    }
    .width('90%')
    .padding(20)
    .backgroundColor(Color.White)
    .borderRadius(16)
    .shadow({ radius: 6, color: '#1F000000', offsetX: 2, offsetY: 4 })
  }
}