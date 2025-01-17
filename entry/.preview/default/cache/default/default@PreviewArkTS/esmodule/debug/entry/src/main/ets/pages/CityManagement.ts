if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CityManagement_Params {
    cityList?: string[];
    newCity?: string;
    currentCity?: string;
}
import router from "@ohos:router";
import { StorageUtil } from "@normalized:N&&&entry/src/main/ets/utils/StorageUtil&";
import promptAction from "@ohos:promptAction";
class CityManagement extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cityList = new ObservedPropertyObjectPU([], this, "cityList");
        this.__newCity = new ObservedPropertySimplePU('', this, "newCity");
        this.__currentCity = new ObservedPropertySimplePU('', this, "currentCity");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CityManagement_Params) {
        if (params.cityList !== undefined) {
            this.cityList = params.cityList;
        }
        if (params.newCity !== undefined) {
            this.newCity = params.newCity;
        }
        if (params.currentCity !== undefined) {
            this.currentCity = params.currentCity;
        }
    }
    updateStateVars(params: CityManagement_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cityList.purgeDependencyOnElmtId(rmElmtId);
        this.__newCity.purgeDependencyOnElmtId(rmElmtId);
        this.__currentCity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cityList.aboutToBeDeleted();
        this.__newCity.aboutToBeDeleted();
        this.__currentCity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cityList: ObservedPropertyObjectPU<string[]>;
    get cityList() {
        return this.__cityList.get();
    }
    set cityList(newValue: string[]) {
        this.__cityList.set(newValue);
    }
    private __newCity: ObservedPropertySimplePU<string>;
    get newCity() {
        return this.__newCity.get();
    }
    set newCity(newValue: string) {
        this.__newCity.set(newValue);
    }
    private __currentCity: ObservedPropertySimplePU<string>;
    get currentCity() {
        return this.__currentCity.get();
    }
    set currentCity(newValue: string) {
        this.__currentCity.set(newValue);
    }
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CityManagement.ets(27:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CityManagement.ets(29:7)", "entry");
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.height(56);
            // 顶部导航栏
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.myapp", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/CityManagement.ets(30:9)", "entry");
            Image.width(24);
            Image.height(24);
            Image.margin({ left: 16 });
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('城市管理');
            Text.debugLine("entry/src/main/ets/pages/CityManagement.ets(38:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CityManagement.ets(43:9)", "entry");
        }, Blank);
        Blank.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加城市输入区
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CityManagement.ets(50:7)", "entry");
            // 添加城市输入区
            Row.width('90%');
            // 添加城市输入区
            Row.margin({ top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                text: this.newCity,
                placeholder: '请输入城市名称'
            });
            TextInput.debugLine("entry/src/main/ets/pages/CityManagement.ets(51:9)", "entry");
            TextInput.width('70%');
            TextInput.height(40);
            TextInput.margin({ right: 16 });
            TextInput.onChange((value: string) => {
                this.newCity = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加');
            Button.debugLine("entry/src/main/ets/pages/CityManagement.ets(62:9)", "entry");
            Button.width('20%');
            Button.height(40);
            Button.onClick(() => {
                this.addCity();
            });
        }, Button);
        Button.pop();
        // 添加城市输入区
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 城市列表
            List.create();
            List.debugLine("entry/src/main/ets/pages/CityManagement.ets(73:7)", "entry");
            // 城市列表
            List.width('100%');
            // 城市列表
            List.layoutWeight(1);
            // 城市列表
            List.divider({
                strokeWidth: 1,
                color: '#EEEEEE'
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const city = _item;
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
                        ListItem.debugLine("entry/src/main/ets/pages/CityManagement.ets(75:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/CityManagement.ets(76:13)", "entry");
                            Row.width('100%');
                            Row.padding(16);
                            Row.backgroundColor(Color.White);
                            Row.onClick(() => {
                                this.switchCity(city);
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(city);
                            Text.debugLine("entry/src/main/ets/pages/CityManagement.ets(77:15)", "entry");
                            Text.fontSize(16);
                            Text.fontColor(city === this.currentCity ? '#0A59F7' : '#333333');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (city === this.currentCity) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('当前');
                                        Text.debugLine("entry/src/main/ets/pages/CityManagement.ets(82:17)", "entry");
                                        Text.fontSize(12);
                                        Text.fontColor('#0A59F7');
                                        Text.margin({ left: 8 });
                                    }, Text);
                                    Text.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                            Blank.debugLine("entry/src/main/ets/pages/CityManagement.ets(88:15)", "entry");
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (city !== '北京') { // 不允许删除默认城市
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Button.createWithChild({ type: ButtonType.Circle });
                                        Button.debugLine("entry/src/main/ets/pages/CityManagement.ets(91:17)", "entry");
                                        Button.width(32);
                                        Button.height(32);
                                        Button.onClick(() => {
                                            this.deleteCity(city);
                                        });
                                    }, Button);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.myapp", "moduleName": "entry" });
                                        Image.debugLine("entry/src/main/ets/pages/CityManagement.ets(92:19)", "entry");
                                        Image.width(20);
                                        Image.height(20);
                                    }, Image);
                                    Button.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.cityList, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 城市列表
        List.pop();
        Column.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CityManagement";
    }
}
registerNamedRoute(() => new CityManagement(undefined, {}), "", { bundleName: "com.example.myapp", moduleName: "entry", pagePath: "pages/CityManagement", pageFullPath: "entry/src/main/ets/pages/CityManagement", integratedHsp: "false" });
