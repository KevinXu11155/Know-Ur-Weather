import preferences from '@ohos.data.preferences';
import common from '@ohos.app.ability.common';
import { WeatherData } from '../model/WeatherData';

const PREFERENCES_NAME: string = 'weather_preferences';
const KEY_CURRENT_CITY: string = 'current_city';
const KEY_LAST_UPDATE: string = 'last_update';
const KEY_WEATHER_DATA: string = 'weather_data';
const KEY_CITY_LIST: string = 'city_list';

export class StorageUtil {
  private static async getPreferences(): Promise<preferences.Preferences> {
    const context: common.UIAbilityContext = getContext() as common.UIAbilityContext;
    return await preferences.getPreferences(context, PREFERENCES_NAME);
  }

  // 保存当前城市
  public static async saveCity(city: string): Promise<void> {
    const prefer = await StorageUtil.getPreferences();
    await prefer.put(KEY_CURRENT_CITY, city);
    await prefer.flush();
  }

  // 获取当前城市
  public static async getCurrentCity(): Promise<string> {
    const prefer = await StorageUtil.getPreferences();
    return (await prefer.get(KEY_CURRENT_CITY, '北京')) as string;
  }

  // 保存更新时间
  public static async saveUpdateTime(time: string): Promise<void> {
    const prefer = await StorageUtil.getPreferences();
    await prefer.put(KEY_LAST_UPDATE, time);
    await prefer.flush();
  }

  // 获取最后更新时间
  public static async getLastUpdateTime(): Promise<string> {
    const prefer = await StorageUtil.getPreferences();
    return (await prefer.get(KEY_LAST_UPDATE, '')) as string;
  }

  // 保存天气数据
  public static async saveWeatherData(weatherData: WeatherData): Promise<void> {
    const prefer = await StorageUtil.getPreferences();
    await prefer.put(KEY_WEATHER_DATA, JSON.stringify(weatherData));
    await prefer.flush();
    console.info('天气数据已保存');
  }

  // 获取缓存的天气数据
  public static async getCachedWeatherData(): Promise<WeatherData | null> {
    const prefer = await StorageUtil.getPreferences();
    const cachedData = await prefer.get(KEY_WEATHER_DATA, '');
    if (cachedData) {
      try {
        return JSON.parse(cachedData as string) as WeatherData;
      } catch (error) {
        console.error('解析缓存天气数据失败:', error);
      }
    }
    return null;
  }

  // 保存城市列表
  public static async saveCityList(cityList: string[]): Promise<void> {
    const prefer = await StorageUtil.getPreferences();
    await prefer.put(KEY_CITY_LIST, JSON.stringify(cityList));
    await prefer.flush();
    console.info('城市列表已保存');
  }

  // 获取城市列表
  public static async getCityList(): Promise<string[]> {
    const prefer = await StorageUtil.getPreferences();
    const cachedList = await prefer.get(KEY_CITY_LIST, '[]');
    try {
      return JSON.parse(cachedList as string) as string[];
    } catch (error) {
      console.error('解析城市列表失败:', error);
      return [];
    }
  }

  // 清除所有存储的数据
  public static async clearAll(): Promise<void> {
    const prefer = await StorageUtil.getPreferences();
    await prefer.clear();
    console.info('所有数据已清除');
  }

  //城市切换
  public static async switchCity(city: string): Promise<void> {
    await StorageUtil.saveCity(city);
    // 可以在这里添加其他需要处理的数据，比如清除旧城市的天气缓存等
    console.info('城市切换成功:', city);
  }
}