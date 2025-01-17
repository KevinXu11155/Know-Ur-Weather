import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { User, ValidationResult } from '../model/UserModel';
import { UserUtil } from '../utils/UserUtil';

@Entry
@Component
struct Register {
  @State username: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
  @State isLoading: boolean = false;
  @State showPasswordError: boolean = false;
  @State passwordErrorMessage: string = '';

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

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .margin({ left: 16 })
          .onClick(() => {
            router.back();
          })

        Text('注册账号')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .backgroundColor(Color.White)

      // 注册表单
      Column() {
        TextInput({ placeholder: '请输入用户名（3-20个字符）' })
          .type(InputType.Normal)
          .placeholderColor('#99000000')
          .placeholderFont({ size: 16 })
          .caretColor('#007DFF')
          .height(50)
          .fontSize(16)
          .width('100%')
          .margin({ top: 32, bottom: 24 })
          .onChange((value: string) => {
            this.username = value;
          })

        TextInput({ placeholder: '请输入密码（至少6位，包含字母和数字）' })
          .type(InputType.Password)
          .placeholderColor('#99000000')
          .placeholderFont({ size: 16 })
          .caretColor('#007DFF')
          .height(50)
          .fontSize(16)
          .width('100%')
          .margin({ bottom: 24 })
          .onChange((value: string) => {
            this.password = value;
            if (this.showPasswordError) {
              this.showPasswordError = !User.validatePassword(value);
            }
          })

        TextInput({ placeholder: '请再次输入密码' })
          .type(InputType.Password)
          .placeholderColor('#99000000')
          .placeholderFont({ size: 16 })
          .caretColor('#007DFF')
          .height(50)
          .fontSize(16)
          .width('100%')
          .margin({ bottom: this.showPasswordError ? 8 : 36 })
          .onChange((value: string) => {
            this.confirmPassword = value;
          })

        if (this.showPasswordError) {
          Text(this.passwordErrorMessage)
            .fontSize(14)
            .fontColor(Color.Red)
            .margin({ bottom: 24 })
        }

        Button('注册')
          .width('100%')
          .height(50)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .borderRadius(8)
          .enabled(!this.isLoading)
          .onClick(async () => {
            await this.handleRegister();
          })
      }
      .padding({ left: 24, right: 24 })
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
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
      } else {
        promptAction.showToast({
          message: result.message,
          duration: 2000,
          bottom: 50
        });
      }
    } catch (error) {
      promptAction.showToast({
        message: '注册失败，请稍后重试',
        duration: 2000,
        bottom: 50
      });
    } finally {
      this.isLoading = false;
    }
  }
}

export default Register;