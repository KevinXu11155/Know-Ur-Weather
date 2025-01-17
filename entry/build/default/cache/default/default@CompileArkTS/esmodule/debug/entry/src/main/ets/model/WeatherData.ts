export class WeatherData {
    city: string = '';
    temperature: number = 0;
    weather: string = '';
    humidity: number = 0;
    updateTime: string = '';
}
export class HourlyWeather {
    time: string = '';
    temperature: number = 0;
    weather: string = '';
    // 添加模拟数据方法
    static getMockHourlyData(): HourlyWeather[] {
        const mockData: HourlyWeather[] = [];
        const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
        const temps = [13, 15, 17, 19, 20, 20, 19, 17];
        const weathers = ['晴', '晴', '多云', '多云', '晴', '晴', '多云', '多云'];
        for (let i = 0; i < 8; i++) {
            const hourly = new HourlyWeather();
            hourly.time = hours[i];
            hourly.temperature = temps[i];
            hourly.weather = weathers[i];
            mockData.push(hourly);
        }
        return mockData;
    }
}
