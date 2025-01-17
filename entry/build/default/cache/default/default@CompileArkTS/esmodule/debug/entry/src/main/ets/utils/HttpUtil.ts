import http from "@ohos:net.http";
import { WeatherData } from "@normalized:N&&&entry/src/main/ets/model/WeatherData&";
import { DatabaseUtil } from "@normalized:N&&&entry/src/main/ets/utils/DatabaseUtil&";
const API_KEY: string = 'b57ac62cf5c54328933477d01def570f';
const BASE_URL: string = 'https://restapi.amap.com/v3/weather';
// 高德天气API响应接口定义
interface LiveWeather {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    humidity: string;
    reporttime: string; // 注意：高德API返回的是 reporttime 而不是 reportTime
}
interface GaoDeWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives?: LiveWeather[];
}
interface DistrictItem {
    adcode: string;
    name: string;
}
interface DistrictResponse {
    status: string;
    info: string;
    infocode: string;
    districts: DistrictItem[];
}
export class HttpUtil {
    // 获取城市编码
    static async getCityId(cityName: string): Promise<string> {
        try {
            const encodedCity = encodeURIComponent(cityName);
            let httpRequest: http.HttpRequest = http.createHttp();
            let response: http.HttpResponse = await httpRequest.request(`https://restapi.amap.com/v3/config/district?keywords=${encodedCity}&subdistrict=0&key=${API_KEY}`, {
                method: http.RequestMethod.GET,
                header: {
                    'Content-Type': 'application/json'
                }
            });
            console.info('城市编码查询状态码:', response.responseCode);
            const responseText = response.result.toString();
            if (response.responseCode === http.ResponseCode.OK) {
                const result: DistrictResponse = JSON.parse(responseText);
                if (result.status === '1' && result.districts && result.districts.length > 0) {
                    return result.districts[0].adcode;
                }
            }
            httpRequest.destroy();
        }
        catch (error) {
            console.error('获取城市编码失败:', error);
        }
        return '110000'; // 默认返回北京的编码
    }
    // 获取实时天气
    static async getNowWeather(cityCode: string): Promise<WeatherData> {
        let weatherData: WeatherData = new WeatherData();
        try {
            let httpRequest: http.HttpRequest = http.createHttp();
            let response: http.HttpResponse = await httpRequest.request(`${BASE_URL}/weatherInfo?city=${cityCode}&key=${API_KEY}`, {
                method: http.RequestMethod.GET,
                header: {
                    'Content-Type': 'application/json'
                }
            });
            console.info('天气请求状态码:', response.responseCode);
            const responseText = response.result.toString();
            console.info('天气响应数据:', responseText);
            if (response.responseCode === http.ResponseCode.OK) {
                let result: GaoDeWeatherResponse = JSON.parse(responseText);
                if (result.status === '1' && result.lives && result.lives.length > 0) {
                    const live = result.lives[0];
                    weatherData.temperature = parseInt(live.temperature);
                    weatherData.weather = live.weather;
                    weatherData.humidity = parseInt(live.humidity);
                    weatherData.updateTime = new Date().toISOString();
                    // 将数据保存到数据库
                    await DatabaseUtil.saveWeatherData(weatherData, cityCode);
                    // 格式化更新时间显示
                    const now = new Date();
                    //const reportTime = new Date(live.reporttime);
                    weatherData.updateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                    console.info('更新时间:', weatherData.updateTime); // 添加日志
                }
            }
            httpRequest.destroy();
        }
        catch (error) {
            console.error('获取天气数据失败:', error);
        }
        return weatherData;
    }
}
