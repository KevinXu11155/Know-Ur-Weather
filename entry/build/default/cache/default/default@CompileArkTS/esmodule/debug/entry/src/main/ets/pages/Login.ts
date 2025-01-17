if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Login_Params {
    username?: string;
    password?: string;
    isLoading?: boolean;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { UserUtil } from "@normalized:N&&&entry/src/main/ets/utils/UserUtil&";
class Login extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Login_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
    }
    updateStateVars(params: Login_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('登录');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 80, bottom: 50 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(24);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入用户名' });
            TextInput.type(InputType.Normal);
            TextInput.placeholderColor('#99000000');
            TextInput.placeholderFont({ size: 16 });
            TextInput.caretColor('#007DFF');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.margin({ bottom: 24 });
            TextInput.onChange((value: string) => {
                this.username = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入密码' });
            TextInput.type(InputType.Password);
            TextInput.placeholderColor('#99000000');
            TextInput.placeholderFont({ size: 16 });
            TextInput.caretColor('#007DFF');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.margin({ bottom: 36 });
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('登录');
            Button.width('100%');
            Button.height(50);
            Button.fontSize(18);
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor('#007DFF');
            Button.borderRadius(8);
            Button.enabled(!this.isLoading);
            Button.onClick(async () => {
                await this.handleLogin();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('没有账号？');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('立即注册');
            Text.fontSize(14);
            Text.fontColor('#007DFF');
            Text.onClick(() => {
                router.pushUrl({ url: 'pages/Register' });
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    async handleLogin() {
        if (!this.username.trim() || !this.password.trim()) {
            promptAction.showToast({
                message: '请输入用户名和密码',
                duration: 2000,
                bottom: 50
            });
            return;
        }
        this.isLoading = true;
        try {
            const result = await UserUtil.validateUser(this.username.trim(), this.password);
            if (result.isValid) {
                //设置当前登录用户
                await UserUtil.setCurrentUser(this.username.trim());
                router.replaceUrl({
                    url: 'pages/Index',
                    params: {
                        username: this.username
                    }
                });
            }
            else {
                promptAction.showToast({
                    message: result.message,
                    duration: 2000,
                    bottom: 50
                });
            }
        }
        catch (error) {
            promptAction.showToast({
                message: '登录失败，请稍后重试',
                duration: 2000,
                bottom: 50
            });
        }
        finally {
            this.isLoading = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Login";
    }
}
export default Login;
registerNamedRoute(() => new Login(undefined, {}), "", { bundleName: "com.example.myapp", moduleName: "entry", pagePath: "pages/Login", pageFullPath: "entry/src/main/ets/pages/Login", integratedHsp: "false" });
