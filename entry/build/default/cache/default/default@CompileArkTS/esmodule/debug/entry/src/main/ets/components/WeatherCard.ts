if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WeatherCard_Params {
    temperature?: number;
    weather?: string;
    humidity?: number;
}
export class WeatherCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__temperature = new SynchedPropertySimpleOneWayPU(params.temperature, this, "temperature");
        this.__weather = new SynchedPropertySimpleOneWayPU(params.weather, this, "weather");
        this.__humidity = new SynchedPropertySimpleOneWayPU(params.humidity, this, "humidity");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WeatherCard_Params) {
    }
    updateStateVars(params: WeatherCard_Params) {
        this.__temperature.reset(params.temperature);
        this.__weather.reset(params.weather);
        this.__humidity.reset(params.humidity);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__temperature.purgeDependencyOnElmtId(rmElmtId);
        this.__weather.purgeDependencyOnElmtId(rmElmtId);
        this.__humidity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__temperature.aboutToBeDeleted();
        this.__weather.aboutToBeDeleted();
        this.__humidity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __temperature: SynchedPropertySimpleOneWayPU<number>;
    get temperature() {
        return this.__temperature.get();
    }
    set temperature(newValue: number) {
        this.__temperature.set(newValue);
    }
    private __weather: SynchedPropertySimpleOneWayPU<string>;
    get weather() {
        return this.__weather.get();
    }
    set weather(newValue: string) {
        this.__weather.set(newValue);
    }
    private __humidity: SynchedPropertySimpleOneWayPU<number>;
    get humidity() {
        return this.__humidity.get();
    }
    set humidity(newValue: number) {
        this.__humidity.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(20);
            Column.backgroundColor(Color.White);
            Column.borderRadius(16);
            Column.shadow({ radius: 6, color: '#1F000000', offsetX: 2, offsetY: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.temperature}°`);
            Text.fontSize(64);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.weather);
            Text.fontSize(24);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 8, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('湿度:');
            Text.fontSize(16);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.humidity}%`);
            Text.fontSize(16);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
