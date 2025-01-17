import data_rdb from '@ohos.data.rdb';
import { WeatherData } from '../model/WeatherData';
import common from '@ohos.app.ability.common';


interface GeneratedObjectLiteralInterface_1 {
  name: string;
  securityLevel: number;
}

export class DatabaseUtil {
  static rdbStore: data_rdb.RdbStore;
  static context: common.UIAbilityContext = getContext() as common.UIAbilityContext;

  private static readonly SQL_CREATE_WEATHER_TABLE: string = `
    CREATE TABLE IF NOT EXISTS weather_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      temperature INTEGER,
      weather TEXT,
      humidity INTEGER,
      updateTime TEXT,
      createTime TEXT
    )
  `;

  static async initDatabase(): Promise<void> {
    try {
      const storeConfig: GeneratedObjectLiteralInterface_1 = {
        name: "WeatherDB.db",
        securityLevel: 1
      };

      DatabaseUtil.rdbStore = await data_rdb.getRdbStore(
        DatabaseUtil.context,
        storeConfig,
        1  // 数据库版本
      );

      await DatabaseUtil.rdbStore.executeSql(DatabaseUtil.SQL_CREATE_WEATHER_TABLE);
      console.info('数据库初始化成功');
    } catch (error) {
      console.error('数据库初始化失败:', error);
    }
  }

  static async saveWeatherData(weatherData: WeatherData, city: string): Promise<void> {
    if (!DatabaseUtil.rdbStore) {
      console.error('数据库未初始化');
      return;
    }

    // 使用 ValuesBucket 类型
    const value: data_rdb.ValuesBucket = {
      city: city,
      temperature: weatherData.temperature,
      weather: weatherData.weather,
      humidity: weatherData.humidity,
      updateTime: weatherData.updateTime,
      createTime: new Date().toISOString()
    };

    try {
      await DatabaseUtil.rdbStore.insert('weather_data', value);
      console.info('天气数据保存成功');
    } catch (error) {
      console.error('保存天气数据失败:', error);
    }
  }

  static async getLatestWeatherData(city: string): Promise<WeatherData | null> {
    if (!DatabaseUtil.rdbStore) {
      console.error('数据库未初始化');
      return null;
    }

    try {
      const sql = `SELECT * FROM weather_data WHERE city = ? ORDER BY createTime DESC LIMIT 1`;
      const resultSet = await DatabaseUtil.rdbStore.querySql(sql, [city]);

      if (resultSet.rowCount > 0) {
        resultSet.goToFirstRow();
        const weatherData = new WeatherData();
        weatherData.temperature = resultSet.getDouble(resultSet.getColumnIndex('temperature'));
        weatherData.weather = resultSet.getString(resultSet.getColumnIndex('weather'));
        weatherData.humidity = resultSet.getDouble(resultSet.getColumnIndex('humidity'));
        weatherData.updateTime = resultSet.getString(resultSet.getColumnIndex('updateTime'));
        resultSet.close();
        return weatherData;
      }
      resultSet.close();
    } catch (error) {
      console.error('获取天气数据失败:', error);
    }
    return null;
  }

  static async getWeatherHistory(city: string, limit: number = 24): Promise<WeatherData[]> {
    if (!DatabaseUtil.rdbStore) {
      console.error('数据库未初始化');
      return [];
    }

    const history: WeatherData[] = [];
    try {
      const sql = `SELECT * FROM weather_data WHERE city = ? ORDER BY createTime DESC LIMIT ?`;
      const resultSet = await DatabaseUtil.rdbStore.querySql(sql, [city, limit.toString()]);

      while (resultSet.goToNextRow()) {
        const weatherData = new WeatherData();
        weatherData.temperature = resultSet.getDouble(resultSet.getColumnIndex('temperature'));
        weatherData.weather = resultSet.getString(resultSet.getColumnIndex('weather'));
        weatherData.humidity = resultSet.getDouble(resultSet.getColumnIndex('humidity'));
        weatherData.updateTime = resultSet.getString(resultSet.getColumnIndex('updateTime'));
        history.push(weatherData);
      }
      resultSet.close();
    } catch (error) {
      console.error('获取天气历史记录失败:', error);
    }
    return history;
  }

  static async clearWeatherHistory(city: string): Promise<void> {
    if (!DatabaseUtil.rdbStore) {
      console.error('数据库未初始化');
      return;
    }

    try {
      const sql = `DELETE FROM weather_data WHERE city = ?`;
      await DatabaseUtil.rdbStore.executeSql(sql, [city]);
      console.info('天气历史数据清除成功');
    } catch (error) {
      console.error('清除天气历史数据失败:', error);
    }
  }
}