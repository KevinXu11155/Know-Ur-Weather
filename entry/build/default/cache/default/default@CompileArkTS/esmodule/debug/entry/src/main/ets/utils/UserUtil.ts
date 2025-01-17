import preferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
import { User } from "@normalized:N&&&entry/src/main/ets/model/UserModel&";
import type { ValidationResult } from "@normalized:N&&&entry/src/main/ets/model/UserModel&";
export class UserUtil {
    private static readonly PREFERENCES_NAME: string = 'user_preferences';
    private static readonly KEY_USERS: string = 'users';
    private static readonly KEY_CURRENT_USER: string = 'current_user';
    // 获取本地存储实例
    private static async getPreferences(): Promise<preferences.Preferences> {
        const context: common.UIAbilityContext = getContext() as common.UIAbilityContext;
        return await preferences.getPreferences(context, UserUtil.PREFERENCES_NAME);
    }
    // 保存用户信息
    static async saveUser(user: User): Promise<ValidationResult> {
        // 验证用户名格式
        if (!User.validateUsername(user.username)) {
            return { isValid: false, message: '用户名格式不正确，需要3-20个字符，只能包含字母、数字和下划线' };
        }
        // 验证密码强度
        if (!User.validatePassword(user.password)) {
            return { isValid: false, message: '密码格式不正确，至少6个字符，必须包含字母和数字' };
        }
        try {
            const prefer = await UserUtil.getPreferences();
            // 检查用户是否已存在
            const existingUsers = await UserUtil.getAllUsers();
            if (existingUsers.some(u => u.username === user.username)) {
                return { isValid: false, message: '用户名已存在' };
            }
            // 添加新用户
            existingUsers.push(user);
            await prefer.put(UserUtil.KEY_USERS, JSON.stringify(existingUsers));
            await prefer.flush();
            return { isValid: true, message: '注册成功' };
        }
        catch (error) {
            console.error('保存用户信息失败:', error);
            return { isValid: false, message: '注册失败，请稍后重试' };
        }
    }
    // 获取用户信息
    private static async getAllUsers(): Promise<User[]> {
        const prefer = await UserUtil.getPreferences();
        const usersJson = await prefer.get(UserUtil.KEY_USERS, '[]');
        try {
            return JSON.parse(usersJson as string);
        }
        catch {
            return [];
        }
    }
    // 验证用户登录
    static async validateUser(username: string, password: string): Promise<ValidationResult> {
        try {
            const users = await UserUtil.getAllUsers();
            const user = users.find(u => u.username === username);
            if (!user) {
                return { isValid: false, message: '用户名不存在' };
            }
            if (user.password !== password) {
                return { isValid: false, message: '密码错误' };
            }
            // 更新最后登录时间
            user.lastLoginTime = new Date().toISOString();
            const prefer = await UserUtil.getPreferences();
            await prefer.put(UserUtil.KEY_USERS, JSON.stringify(users));
            await prefer.flush();
            return { isValid: true, message: '登录成功' };
        }
        catch (error) {
            console.error('验证用户登录失败:', error);
            return { isValid: false, message: '登录失败，请稍后重试' };
        }
    }
    // 获取用户信息
    static async getUser(username: string): Promise<User | null> {
        const users = await UserUtil.getAllUsers();
        const user = users.find(u => u.username === username);
        return user || null;
    }
    //shezhidangqiandengluyonghu
    static async setCurrentUser(username: string): Promise<void> {
        const prefer = await UserUtil.getPreferences();
        await prefer.put(UserUtil.KEY_CURRENT_USER, username);
        await prefer.flush();
    }
    //qingchudengluzhuangtai
    static async clearLoginState(): Promise<void> {
        const prefer = await UserUtil.getPreferences();
        await prefer.delete(UserUtil.KEY_CURRENT_USER);
        await prefer.flush();
    }
}
