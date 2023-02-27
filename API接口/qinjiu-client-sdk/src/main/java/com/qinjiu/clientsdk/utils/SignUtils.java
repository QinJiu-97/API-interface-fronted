package com.qinjiu.clientsdk.utils;

import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;

/**
 * @author QinJiu
 * @Date 2022/11/27
 * <p>
 * 签名工具
 */
public class SignUtils {

    public static String genSign(String body, String secretKey) {
        Digester md5 = new Digester(DigestAlgorithm.SHA256);
        String content = body + secretKey;
        // 5393554e94bf0eb6436f240a4fd71282
        return md5.digestHex(content);
    }
}
