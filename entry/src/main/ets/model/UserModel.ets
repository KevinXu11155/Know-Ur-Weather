export class User {
  username: string = '';
  password: string = '';
  createTime: string = '';
  lastLoginTime: string = '';

  constructor() {
    this.createTime = new Date().toISOString();
    this.lastLoginTime = '';
  }

  // 验证用户名格式
  static validateUsername(username: string): boolean {
    // 用户名长度在3-20个字符之间，只能包含字母、数字和下划线
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  }

  // 验证密码强度
  static validatePassword(password: string): boolean {
    // 密码长度至少6个字符，必须包含字母和数字
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  }
}

// 用于验证结果的接口
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

