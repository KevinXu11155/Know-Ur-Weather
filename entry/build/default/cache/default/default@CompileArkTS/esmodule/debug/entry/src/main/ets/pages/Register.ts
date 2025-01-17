if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Register_Params {
    username?: string;
    password?: string;
    confirmPassword?: string;
    isLoading?: boolean;
    showPasswordError?: boolean;
    passwordErrorMessage?: string;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { User } from "@normalized:N&&&entry/src/main/ets/model/UserModel&";
import { UserUtil } from "@normalized:N&&&entry/src/main/ets/utils/UserUtil&";
class Register extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__showPasswordError = new ObservedPropertySimplePU(false, this, "showPasswordError");
        this.__passwordErrorMessage = new ObservedPropertySimplePU('', this, "passwordErrorMessage");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Register_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.showPasswordError !== undefined) {
            this.showPasswordError = params.showPasswordError;
        }
        if (params.passwordErrorMessage !== undefined) {
            this.passwordErrorMessage = params.passwordErrorMessage;
        }
    }
    updateStateVars(params: Register_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__showPasswordError.purgeDependencyOnElmtId(rmElmtId);
        this.__passwordErrorMessage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__showPasswordError.aboutToBeDeleted();
        this.__passwordErrorMessage.aboutToBeDeleted();
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
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __showPasswordError: ObservedPropertySimplePU<boolean>;
    get showPasswordError() {
        return this.__showPasswordError.get();
    }
    set showPasswordError(newValue: boolean) {
        this.__showPasswordError.set(newValue);
    }
    private __passwordErrorMessage: ObservedPropertySimplePU<string>;
    get passwordErrorMessage() {
        return this.__passwordErrorMessage.get();
    }
    set passwordErrorMessage(newValue: string) {
        this.__passwordErrorMessage.set(newValue);
    }
    validateForm(): boolean {
        if (!this.username.trim()) {
            promptAction.showToast({
                message: '请输入用户名',
                duration: 2000,
                bottom: 50
            });
            return false;
        }
        if (!this.password.trim()) {
            promptAction.showToast({
                message: '请输入密码',
                duration: 2000,
                bottom: 50
            });
            return false;
        }
        if (this.password !== this.confirmPassword) {
            promptAction.showToast({
                message: '两次输入的密码不一致',
                duration: 2000,
                bottom: 50
            });
            return false;
        }
        return true;
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
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777229, "type": 20000, params: [], "bundleName": "com.example.myapp", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.margin({ left: 16 });
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册账号');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册表单
            Column.create();
            // 注册表单
            Column.padding({ left: 24, right: 24 });
            // 注册表单
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入用户名（3-20个字符）' });
            TextInput.type(InputType.Normal);
            TextInput.placeholderColor('#99000000');
            TextInput.placeholderFont({ size: 16 });
            TextInput.caretColor('#007DFF');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.margin({ top: 32, bottom: 24 });
            TextInput.onChange((value: string) => {
                this.username = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入密码（至少6位，包含字母和数字）' });
            TextInput.type(InputType.Password);
            TextInput.placeholderColor('#99000000');
            TextInput.placeholderFont({ size: 16 });
            TextInput.caretColor('#007DFF');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.margin({ bottom: 24 });
            TextInput.onChange((value: string) => {
                this.password = value;
                if (this.showPasswordError) {
                    this.showPasswordError = !User.validatePassword(value);
                }
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请再次输入密码' });
            TextInput.type(InputType.Password);
            TextInput.placeholderColor('#99000000');
            TextInput.placeholderFont({ size: 16 });
            TextInput.caretColor('#007DFF');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.margin({ bottom: this.showPasswordError ? 8 : 36 });
            TextInput.onChange((value: string) => {
                this.confirmPassword = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showPasswordError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.passwordErrorMessage);
                        Text.fontSize(14);
                        Text.fontColor(Color.Red);
                        Text.margin({ bottom: 24 });
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
            Button.createWithLabel('注册');
            Button.width('100%');
            Button.height(50);
            Button.fontSize(18);
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor('#007DFF');
            Button.borderRadius(8);
            Button.enabled(!this.isLoading);
            Button.onClick(async () => {
                await this.handleRegister();
            });
        }, Button);
        Button.pop();
        // 注册表单
        Column.pop();
        Column.pop();
    }
    async handleRegister() {
        if (!this.validateForm()) {
            return;
        }
        this.isLoading = true;
        try {
            const user = new User();
            user.username = this.username.trim();
            user.password = this.password;
            const result = await UserUtil.saveUser(user);
            if (result.isValid) {
                promptAction.showToast({
                    message: '注册成功',
                    duration: 2000,
                    bottom: 50
                });
                // 延迟返回登录页面，让用户看到成功提示
                setTimeout(() => {
                    router.back();
                }, 1000);
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
                message: '注册失败，请稍后重试',
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
        return "Register";
    }
}
export default Register;
registerNamedRoute(() => new Register(undefined, {}), "", { bundleName: "com.example.myapp", moduleName: "entry", pagePath: "pages/Register", pageFullPath: "entry/src/main/ets/pages/Register", integratedHsp: "false" });
