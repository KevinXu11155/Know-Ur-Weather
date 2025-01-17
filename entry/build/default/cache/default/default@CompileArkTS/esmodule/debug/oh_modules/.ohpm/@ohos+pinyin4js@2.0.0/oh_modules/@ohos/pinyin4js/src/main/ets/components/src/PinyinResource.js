/**
 * 字典加载
 * 
 * @auth superbiger(superbiger@qq.com)
 */
import { chinese_dict } from "@normalized:N&&&@ohos/pinyin4js/src/main/ets/components/src/dict/chinese.dict&2.0.0"
import { mutil_pinyin_dict } from "@normalized:N&&&@ohos/pinyin4js/src/main/ets/components/src/dict/mutil_pinyin.dict&2.0.0"
import { pinyin_dict } from "@normalized:N&&&@ohos/pinyin4js/src/main/ets/components/src/dict/pinyin.dict&2.0.0"

export class PinyinResource {
    //单字拼音字典库
    static getPinyinResource() {
        return pinyin_dict;
    }
    //词组拼音字典库
    static getMutilPinyinResource() {
        return mutil_pinyin_dict;
    }
    //简繁对照库
    static getChineseResource() {
        return chinese_dict;
    }
}