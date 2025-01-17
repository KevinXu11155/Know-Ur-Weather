if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HourlyForecast_Params {
    hourlyData?: HourlyWeather[];
}
import type { HourlyWeather } from '../model/WeatherData';
export class HourlyForecast extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__hourlyData = new SynchedPropertyObjectOneWayPU(params.hourlyData, this, "hourlyData");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HourlyForecast_Params) {
    }
    updateStateVars(params: HourlyForecast_Params) {
        this.__hourlyData.reset(params.hourlyData);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__hourlyData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__hourlyData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __hourlyData: SynchedPropertySimpleOneWayPU<HourlyWeather[]>;
    get hourlyData() {
        return this.__hourlyData.get();
    }
    set hourlyData(newValue: HourlyWeather[]) {
        this.__hourlyData.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/components/HourlyForecast.ets(8:5)", "entry");
            Column.width('100%');
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('24小时预报');
            Text.debugLine("entry/src/main/ets/components/HourlyForecast.ets(9:7)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 20, top: 16, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hourlyData.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 12 });
                        List.debugLine("entry/src/main/ets/components/HourlyForecast.ets(16:9)", "entry");
                        List.width('100%');
                        List.height(120);
                        List.listDirection(Axis.Horizontal);
                        List.padding({ left: 16, right: 16 });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
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
                                    ListItem.debugLine("entry/src/main/ets/components/HourlyForecast.ets(18:13)", "entry");
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.debugLine("entry/src/main/ets/components/HourlyForecast.ets(19:15)", "entry");
                                        Column.width(80);
                                        Column.height(100);
                                        Column.backgroundColor('#fff');
                                        Column.borderRadius(12);
                                        Column.padding(8);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.time);
                                        Text.debugLine("entry/src/main/ets/components/HourlyForecast.ets(20:17)", "entry");
                                        Text.fontSize(14);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(`${item.temperature}°`);
                                        Text.debugLine("entry/src/main/ets/components/HourlyForecast.ets(22:17)", "entry");
                                        Text.fontSize(16);
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.weather);
                                        Text.debugLine("entry/src/main/ets/components/HourlyForecast.ets(25:17)", "entry");
                                        Text.fontSize(14);
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.hourlyData, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无预报数据');
                        Text.debugLine("entry/src/main/ets/components/HourlyForecast.ets(42:9)", "entry");
                        Text.fontSize(14);
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
