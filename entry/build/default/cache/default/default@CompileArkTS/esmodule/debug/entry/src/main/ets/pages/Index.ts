if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    weatherData?: WeatherData;
    currentCity?: string;
    CityID?: string;
    currentCityPinYin?: string;
    url_sm?: string;
    url_lg?: string;
    url?: string;
    province?: string;
    province_id?: string;
    isLoading?: boolean;
    controller?: web_webview.WebviewController;
    curBp?: string;
}
import { WeatherData } from "@normalized:N&&&entry/src/main/ets/model/WeatherData&";
import { StorageUtil } from "@normalized:N&&&entry/src/main/ets/utils/StorageUtil&";
import { HttpUtil } from "@normalized:N&&&entry/src/main/ets/utils/HttpUtil&";
import { WeatherCard } from "@normalized:N&&&entry/src/main/ets/components/WeatherCard&";
import { DatabaseUtil } from "@normalized:N&&&entry/src/main/ets/utils/DatabaseUtil&";
import { UserUtil } from "@normalized:N&&&entry/src/main/ets/utils/UserUtil&";
import { pinyin4js } from "@normalized:N&&&@ohos/pinyin4js/index&2.0.0";
import web_webview from "@ohos:web.webview";
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
interface GeneratedObjectLiteralInterface_1 {
    success: boolean;
    message: string;
}
interface GeneratedObjectLiteralInterface_2 {
    success: boolean;
    message: string;
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__weatherData = new ObservedPropertyObjectPU(new WeatherData(), this, "weatherData");
        this.__currentCity = new ObservedPropertySimplePU('北京', this, "currentCity");
        this.__CityID = new ObservedPropertySimplePU('110011', this, "CityID");
        this.__currentCityPinYin = new ObservedPropertySimplePU('beijing', this, "currentCityPinYin");
        this.__url_sm = new ObservedPropertySimplePU('http://m.nmc.cn/publish/forecast/ABJ/beijing.html', this, "url_sm");
        this.__url_lg = new ObservedPropertySimplePU('http://www.nmc.cn/publish/forecast/ABJ/beijing.html', this, "url_lg");
        this.__url = new ObservedPropertySimplePU('http://m.nmc.cn/publish/forecast/ABJ/beijing.html', this, "url");
        this.__province = new ObservedPropertySimplePU('BJ', this, "province");
        this.__province_id = new ObservedPropertySimplePU('11', this, "province_id");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.controller = new web_webview.WebviewController();
        this.__curBp = this.createStorageProp('currentBreakpoint', ''
        // 监听页面显示事件，用于在返回时刷新数
        , "curBp");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.weatherData !== undefined) {
            this.weatherData = params.weatherData;
        }
        if (params.currentCity !== undefined) {
            this.currentCity = params.currentCity;
        }
        if (params.CityID !== undefined) {
            this.CityID = params.CityID;
        }
        if (params.currentCityPinYin !== undefined) {
            this.currentCityPinYin = params.currentCityPinYin;
        }
        if (params.url_sm !== undefined) {
            this.url_sm = params.url_sm;
        }
        if (params.url_lg !== undefined) {
            this.url_lg = params.url_lg;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.province !== undefined) {
            this.province = params.province;
        }
        if (params.province_id !== undefined) {
            this.province_id = params.province_id;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__weatherData.purgeDependencyOnElmtId(rmElmtId);
        this.__currentCity.purgeDependencyOnElmtId(rmElmtId);
        this.__CityID.purgeDependencyOnElmtId(rmElmtId);
        this.__currentCityPinYin.purgeDependencyOnElmtId(rmElmtId);
        this.__url_sm.purgeDependencyOnElmtId(rmElmtId);
        this.__url_lg.purgeDependencyOnElmtId(rmElmtId);
        this.__url.purgeDependencyOnElmtId(rmElmtId);
        this.__province.purgeDependencyOnElmtId(rmElmtId);
        this.__province_id.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__curBp.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__weatherData.aboutToBeDeleted();
        this.__currentCity.aboutToBeDeleted();
        this.__CityID.aboutToBeDeleted();
        this.__currentCityPinYin.aboutToBeDeleted();
        this.__url_sm.aboutToBeDeleted();
        this.__url_lg.aboutToBeDeleted();
        this.__url.aboutToBeDeleted();
        this.__province.aboutToBeDeleted();
        this.__province_id.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__curBp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __weatherData: ObservedPropertyObjectPU<WeatherData>;
    get weatherData() {
        return this.__weatherData.get();
    }
    set weatherData(newValue: WeatherData) {
        this.__weatherData.set(newValue);
    }
    private __currentCity: ObservedPropertySimplePU<string>;
    get currentCity() {
        return this.__currentCity.get();
    }
    set currentCity(newValue: string) {
        this.__currentCity.set(newValue);
    }
    private __CityID: ObservedPropertySimplePU<string>;
    get CityID() {
        return this.__CityID.get();
    }
    set CityID(newValue: string) {
        this.__CityID.set(newValue);
    }
    private __currentCityPinYin: ObservedPropertySimplePU<string>;
    get currentCityPinYin() {
        return this.__currentCityPinYin.get();
    }
    set currentCityPinYin(newValue: string) {
        this.__currentCityPinYin.set(newValue);
    }
    private __url_sm: ObservedPropertySimplePU<string>;
    get url_sm() {
        return this.__url_sm.get();
    }
    set url_sm(newValue: string) {
        this.__url_sm.set(newValue);
    }
    private __url_lg: ObservedPropertySimplePU<string>;
    get url_lg() {
        return this.__url_lg.get();
    }
    set url_lg(newValue: string) {
        this.__url_lg.set(newValue);
    }
    private __url: ObservedPropertySimplePU<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __province: ObservedPropertySimplePU<string>;
    get province() {
        return this.__province.get();
    }
    set province(newValue: string) {
        this.__province.set(newValue);
    }
    private __province_id: ObservedPropertySimplePU<string>;
    get province_id() {
        return this.__province_id.get();
    }
    set province_id(newValue: string) {
        this.__province_id.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private controller: web_webview.WebviewController;
    private __curBp: ObservedPropertyAbstractPU<string>;
    get curBp() {
        return this.__curBp.get();
    }
    set curBp(newValue: string) {
        this.__curBp.set(newValue);
    }
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
            this.province_id = this.CityID.substring(0, 2);
            if (this.province_id === '11') {
                this.province = 'BJ'; // 北京
            }
            else if (this.province_id === '12') {
                this.province = 'TJ'; // 天津
            }
            else if (this.province_id === '13') {
                this.province = 'HE'; // 河北
            }
            else if (this.province_id === '14') {
                this.province = 'SX'; // 山西
            }
            else if (this.province_id === '15') {
                this.province = 'NM'; // 内蒙古
            }
            else if (this.province_id === '21') {
                this.province = 'LN'; // 辽宁
            }
            else if (this.province_id === '22') {
                this.province = 'JL'; // 吉林
            }
            else if (this.province_id === '23') {
                this.province = 'HL'; // 黑龙江
            }
            else if (this.province_id === '31') {
                this.province = 'SH'; // 上海
            }
            else if (this.province_id === '32') {
                this.province = 'JS'; // 江苏
            }
            else if (this.province_id === '33') {
                this.province = 'ZJ'; // 浙江
            }
            else if (this.province_id === '34') {
                this.province = 'AH'; // 安徽
            }
            else if (this.province_id === '35') {
                this.province = 'FJ'; // 福建
            }
            else if (this.province_id === '36') {
                this.province = 'JX'; // 江西
            }
            else if (this.province_id === '37') {
                this.province = 'SD'; // 山东
            }
            else if (this.province_id === '41') {
                this.province = 'HA'; // 河南
            }
            else if (this.province_id === '42') {
                this.province = 'HB'; // 湖北
            }
            else if (this.province_id === '43') {
                this.province = 'HN'; // 湖南
            }
            else if (this.province_id === '44') {
                this.province = 'GD'; // 广东
            }
            else if (this.province_id === '45') {
                this.province = 'GX'; // 广西
            }
            else if (this.province_id === '46') {
                this.province = 'HI'; // 海南
            }
            else if (this.province_id === '50') {
                this.province = 'CQ'; // 重庆
            }
            else if (this.province_id === '51') {
                this.province = 'SC'; // 四川
            }
            else if (this.province_id === '52') {
                this.province = 'GZ'; // 贵州
            }
            else if (this.province_id === '53') {
                this.province = 'YN'; // 云南
            }
            else if (this.province_id === '54') {
                this.province = 'XZ'; // 西藏
            }
            else if (this.province_id === '61') {
                this.province = 'SN'; // 陕西
            }
            else if (this.province_id === '62') {
                this.province = 'GS'; // 甘肃
            }
            else if (this.province_id === '63') {
                this.province = 'QH'; // 青海
            }
            else if (this.province_id === '64') {
                this.province = 'NX'; // 宁夏
            }
            else if (this.province_id === '65') {
                this.province = 'XJ'; // 新疆
            }
            else if (this.province_id === '81') {
                this.province = 'XG'; // 香港
            }
            else if (this.province_id === '82') {
                this.province = 'AM'; // 澳门
            }
            else if (this.province_id === '71') {
                this.province = 'TW'; // 台湾
            }
            this.url_sm = 'http://m.nmc.cn/publish/forecast/A' + this.province + '/' + this.currentCityPinYin + '.html';
            this.url_lg = 'http://www.nmc.cn/publish/forecast/A' + this.province + '/' + this.currentCityPinYin + '.html';
            if (this.curBp === 'sm') {
                this.url = this.url_sm;
            }
            else {
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
            }
            else {
                console.info('获取新的天气数据');
                // 获取新数据
                const cityId = await HttpUtil.getCityId(this.currentCity);
                this.weatherData = await HttpUtil.getNowWeather(cityId);
                // 保存新数据到数据库
                await DatabaseUtil.saveWeatherData(this.weatherData, this.currentCity);
                await StorageUtil.saveUpdateTime(new Date().toISOString());
            }
            this.isLoading = false;
        }
        catch (error) {
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
        }
        catch (error) {
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
    WeatherInfoItem(label: string, value: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.height(56);
            // 顶部导航栏
            Row.padding({ left: 16, right: 16 });
            // 顶部导航栏
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentCity);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width(36);
            Button.height(36);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.loadWeatherData();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.myapp", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
        }, Image);
        Button.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End });
            Tabs.width('100%');
            Tabs.layoutWeight(1);
            Tabs.barHeight(56);
            Tabs.barMode(BarMode.Fixed);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                    Column.padding(16);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                LoadingProgress.create();
                                LoadingProgress.width(32);
                                LoadingProgress.height(32);
                                LoadingProgress.margin({ top: 120 });
                            }, LoadingProgress);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.margin({ top: 16 });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new WeatherCard(this, {
                                            temperature: this.weatherData.temperature,
                                            weather: this.weatherData.weather,
                                            humidity: this.weatherData.humidity
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 249, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                temperature: this.weatherData.temperature,
                                                weather: this.weatherData.weather,
                                                humidity: this.weatherData.humidity
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            temperature: this.weatherData.temperature,
                                            weather: this.weatherData.weather,
                                            humidity: this.weatherData.humidity
                                        });
                                    }
                                }, { name: "WeatherCard" });
                            }
                            __Common__.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.margin({ top: 16 });
                                Column.padding(16);
                                Column.backgroundColor(Color.White);
                                Column.borderRadius(12);
                            }, Column);
                            this.WeatherInfoItem.bind(this)("更新时间", this.weatherData.updateTime);
                            Column.pop();
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '当前天气');
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                    Stack.width('100%');
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Web.create({
                        src: this.url,
                        controller: this.controller
                    });
                    Web.width('100%');
                    Web.height('100%');
                    Web.zoomAccess(true);
                    Web.fileAccess(true);
                    Web.javaScriptAccess(true);
                    Web.domStorageAccess(true);
                    Web.mixedMode(MixedMode.All);
                    Web.onPageBegin((event) => {
                        console.info('网页开始加载:', event);
                        console.info('网页地址:', this.url);
                        console.info('网页地址', this.curBp);
                    });
                    Web.onPageEnd((event) => {
                        console.info('网页加载完成:', event);
                    });
                }, Web);
                Stack.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '天气详情');
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    List.create();
                    List.backgroundColor('#F5F5F5');
                    List.divider({
                        strokeWidth: 1,
                        color: '#EEEEEE',
                        startMargin: 16,
                        endMargin: 16
                    });
                }, List);
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({
                                left: 16,
                                right: 16,
                                top: 12,
                                bottom: 12
                            });
                            Row.backgroundColor(Color.White);
                            Row.onClick(() => {
                                try {
                                    router.pushUrl({
                                        url: 'pages/CityManagement'
                                    }).then(() => {
                                        console.info('跳转成功');
                                    }).catch((error: Error) => {
                                        console.error('跳转失败:', error.message);
                                    });
                                }
                                catch (error) {
                                    console.error('路由错误:', error);
                                }
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('城市管理');
                            Text.fontSize(16);
                            Text.fontColor('#333333');
                            Text.margin({ bottom: 4 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('当前：' + this.currentCity);
                            Text.fontSize(14);
                            Text.fontColor('#666666');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777228, "type": 20000, params: [], "bundleName": "com.example.myapp", "moduleName": "entry" });
                            Image.width(20);
                            Image.height(20);
                            Image.margin({ right: 8 });
                        }, Image);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            // 可以添加其他设置项
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({
                                left: 16,
                                right: 16,
                                top: 12,
                                bottom: 12
                            });
                            Row.backgroundColor(Color.White);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('自动更新');
                            Text.fontSize(16);
                            Text.fontColor('#333333');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Toggle.create({ type: ToggleType.Switch, isOn: false });
                            Toggle.onChange((isOn: boolean) => {
                                console.info('自动更新:', isOn);
                            });
                        }, Toggle);
                        Toggle.pop();
                        Row.pop();
                        // 可以添加其他设置项
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    // 可以添加其他设置项
                    ListItem.pop();
                }
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({
                                left: 16,
                                right: 16,
                                top: 12,
                                bottom: 12
                            });
                            Row.backgroundColor(Color.White);
                            Row.onClick(async () => {
                                try {
                                    await this.handleLogout();
                                }
                                catch (error) {
                                    console.error('退出登录失败:', error);
                                    promptAction.showToast({
                                        message: '退出失败，请重试',
                                        duration: 2000
                                    });
                                }
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('退出登录');
                            Text.fontSize(16);
                            Text.fontColor('#FF4D4F');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                        }, Blank);
                        Blank.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
                List.pop();
                Column.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '设置');
                } });
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    TabBuilder(title: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(16);
            Text.fontColor(Color.Black);
            Text.padding({ top: 8, bottom: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapp", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });
