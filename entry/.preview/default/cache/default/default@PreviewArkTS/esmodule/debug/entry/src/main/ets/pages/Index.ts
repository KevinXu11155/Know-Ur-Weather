if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    weatherData?: WeatherData;
    currentCity?: string;
    isLoading?: boolean;
    controller?: web_webview.WebviewController;
    curBp?: string;
}
import { WeatherData } from "@normalized:N&&&entry/src/main/ets/model/WeatherData&";
import { StorageUtil } from "@normalized:N&&&entry/src/main/ets/utils/StorageUtil&";
import { HttpUtil } from "@normalized:N&&&entry/src/main/ets/utils/HttpUtil&";
import { WeatherCard } from "@normalized:N&&&entry/src/main/ets/components/WeatherCard&";
import { DatabaseUtil } from "@normalized:N&&&entry/src/main/ets/utils/DatabaseUtil&";
import web_webview from "@ohos:web.webview";
import router from "@ohos:router";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__weatherData = new ObservedPropertyObjectPU(new WeatherData(), this, "weatherData");
        this.__currentCity = new ObservedPropertySimplePU('北京', this, "currentCity");
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
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__curBp.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__weatherData.aboutToBeDeleted();
        this.__currentCity.aboutToBeDeleted();
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
    WeatherInfoItem(label: string, value: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(68:5)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(69:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(72:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(82:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(84:7)", "entry");
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
            Text.debugLine("entry/src/main/ets/pages/Index.ets(85:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Index.ets(89:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/Index.ets(91:9)", "entry");
            Button.width(36);
            Button.height(36);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.loadWeatherData();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.myapp", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/Index.ets(92:11)", "entry");
            Image.width(24);
            Image.height(24);
        }, Image);
        Button.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End });
            Tabs.debugLine("entry/src/main/ets/pages/Index.ets(108:7)", "entry");
            Tabs.width('100%');
            Tabs.layoutWeight(1);
            Tabs.barHeight(56);
            Tabs.barMode(BarMode.Fixed);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Index.ets(112:11)", "entry");
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
                                LoadingProgress.debugLine("entry/src/main/ets/pages/Index.ets(114:15)", "entry");
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
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 119, col: 15 });
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
                                Column.debugLine("entry/src/main/ets/pages/Index.ets(126:15)", "entry");
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
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(111:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                    Stack.debugLine("entry/src/main/ets/pages/Index.ets(143:11)", "entry");
                    Stack.width('100%');
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Web.create({
                        src: this.curBp === 'sm' ? 'http://m.nmc.cn/publish/forecast/ABJ/beijing.html' : 'http://www.nmc.cn/publish/forecast/ABJ/beijing.html',
                        controller: this.controller
                    });
                    Web.debugLine("entry/src/main/ets/pages/Index.ets(144:13)", "entry");
                    Web.width('100%');
                    Web.height('100%');
                    Web.zoomAccess(true);
                    Web.fileAccess(true);
                    Web.javaScriptAccess(true);
                    Web.domStorageAccess(true);
                    Web.mixedMode(MixedMode.All);
                    Web.onPageBegin((event) => {
                        console.info('网页开始加载:', event);
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
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(142:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Index.ets(169:11)", "entry");
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    List.create();
                    List.debugLine("entry/src/main/ets/pages/Index.ets(170:13)", "entry");
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
                        ListItem.debugLine("entry/src/main/ets/pages/Index.ets(171:15)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/Index.ets(172:17)", "entry");
                            Row.width('100%');
                            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
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
                            Column.debugLine("entry/src/main/ets/pages/Index.ets(173:19)", "entry");
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('城市管理');
                            Text.debugLine("entry/src/main/ets/pages/Index.ets(174:21)", "entry");
                            Text.fontSize(16);
                            Text.fontColor('#333333');
                            Text.margin({ bottom: 4 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('当前：' + this.currentCity);
                            Text.debugLine("entry/src/main/ets/pages/Index.ets(178:21)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#666666');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                            Blank.debugLine("entry/src/main/ets/pages/Index.ets(184:19)", "entry");
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.myapp", "moduleName": "entry" });
                            Image.debugLine("entry/src/main/ets/pages/Index.ets(186:19)", "entry");
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
                        ListItem.debugLine("entry/src/main/ets/pages/Index.ets(210:15)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/Index.ets(211:17)", "entry");
                            Row.width('100%');
                            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                            Row.backgroundColor(Color.White);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('自动更新');
                            Text.debugLine("entry/src/main/ets/pages/Index.ets(212:19)", "entry");
                            Text.fontSize(16);
                            Text.fontColor('#333333');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                            Blank.debugLine("entry/src/main/ets/pages/Index.ets(215:19)", "entry");
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Toggle.create({ type: ToggleType.Switch, isOn: false });
                            Toggle.debugLine("entry/src/main/ets/pages/Index.ets(216:19)", "entry");
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
                List.pop();
                Column.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '设置');
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(168:9)", "entry");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    TabBuilder(title: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(250:5)", "entry");
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(251:7)", "entry");
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
