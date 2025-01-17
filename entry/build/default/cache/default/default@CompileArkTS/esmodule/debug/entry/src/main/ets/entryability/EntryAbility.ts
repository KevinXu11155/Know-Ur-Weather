import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import display from "@ohos:display";
import type window from "@ohos:window";
import { DatabaseUtil } from "@normalized:N&&&entry/src/main/ets/utils/DatabaseUtil&";
export default class EntryAbility extends UIAbility {
    private windowObj?: window.Window;
    private curBp: string = '';
    private updateBreakpoint(windowWidth: number): void {
        let windowWidthVp = windowWidth / display.getDefaultDisplaySync().densityPixels;
        let newBp: string = '';
        if (windowWidthVp < 320) {
            newBp = 'xs';
        }
        else if (windowWidthVp < 600) {
            newBp = 'sm';
        }
        else if (windowWidthVp < 840) {
            newBp = 'md';
        }
        else {
            newBp = 'lg';
        }
        if (this.curBp !== newBp) {
            this.curBp = newBp;
            AppStorage.setOrCreate('currentBreakpoint', this.curBp);
        }
    }
    async onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): Promise<void> {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
        // 初始化数据库
        try {
            await DatabaseUtil.initDatabase();
            hilog.info(0x0000, 'testTag', '%{public}s', '数据库初始化成功');
        }
        catch (error) {
            hilog.error(0x0000, 'testTag', '数据库初始化失败: %{public}s', JSON.stringify(error));
        }
    }
    onDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage.getMainWindow().then((windowObj) => {
            this.windowObj = windowObj;
            this.updateBreakpoint(windowObj.getWindowProperties().windowRect.width);
            windowObj.on('windowSizeChange', (windowSize) => {
                this.updateBreakpoint(windowSize.width);
            });
        });
        windowStage.loadContent('pages/Login', (err) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
        });
    }
    onWindowStageDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
