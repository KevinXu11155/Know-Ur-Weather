import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { UserUtil } from '../utils/UserUtil';

@Entry
@Component
struct Login {
  @State username: string = '';
  @State password: string = '';
  @State isLoading: boolean = false;
  @State lastLocalTime: string = ""
  @State last: string = '';


  aboutToAppear(): void {
    this
  }

  build() {
    Column() {
      Text("懂你天气")
        .fontColor('#096789')
        .fontSize(70)

      Text('登录')
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 80, bottom: 50 });

      Column() {
        TextInput({ placeholder: '请输入用户名' })
          .type(InputType.Normal)
          .placeholderColor('#99000000')
          .placeholderFont({ size: 16 })
          .caretColor('#007DFF')
          .height(50)
          .fontSize(16)
          .width('100%')
          .margin({ bottom: 24 })
          .onChange((value: string) => {
            this.username = value;
          });

        TextInput({ placeholder: '请输入密码' })
          .type(InputType.Password)
          .placeholderColor('#99000000')
          .placeholderFont({ size: 16 })
          .caretColor('#007DFF')
          .height(50)
          .fontSize(16)
          .width('100%')
          .margin({ bottom: 36 })
          .onChange((value: string) => {
            this.password = value;
          });

        Button('登录')
          .width('100%')
          .height(50)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .borderRadius(8)
          .enabled(!this.isLoading)
          .onClick(async () => {
            await this.handleLogin();
          });

        Row() {
          Text('没有账号？')
            .fontSize(14)
            .fontColor('#666666')
          Text('立即注册')
            .fontSize(14)
            .fontColor('#007DFF')
            .onClick(() => {
              router.pushUrl({ url: 'pages/Register' });
            })
        }
        .margin({ top: 16 })
      }
      .width('90%')
      .padding(24)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
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
      } else {
        promptAction.showToast({
          message: result.message,
          duration: 2000,
          bottom: 50
        });
      }
    } catch (error) {
      promptAction.showToast({
        message: '登录失败，请稍后重试',
        duration: 2000,
        bottom: 50
      });
    } finally {
      this.isLoading = false;
    }
  }
}

export default Login;
