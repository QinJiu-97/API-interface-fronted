package com.qinjiu.clientsdk.client;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import com.qinjiu.clientsdk.model.User;
import com.qinjiu.clientsdk.utils.SignUtils;


import java.util.HashMap;
import java.util.Map;

/**
 * @author QinJiu
 * @Date 2022/11/26
 */
public class qinApiClient {
    private String accessKey;
    private String secretKey;


    private static final String GATEWAY_HOST = "http://127.0.0.1:8001";

    public qinApiClient(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    public String getNameByGet(String name) {
        //可以单独传入http参数，这样参数会自动做URL编码，拼接在URL中
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", name);

        String result3 = HttpUtil.get(GATEWAY_HOST + "/api/name/", paramMap);
        System.out.println(result3);
        return result3;
    }

    public String getNameByPost(String name) {
        //可以单独传入http参数，这样参数会自动做URL编码，拼接在URL中
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", name);

        String result3 = HttpUtil.post(GATEWAY_HOST + "/api/name/", paramMap);
        System.out.println(result3);
        return result3;
    }


    private Map<String, String> getHeader(String body) {
        Map<String, String> hashMap = new HashMap<>();
        hashMap.put("accessKey", accessKey);
        //该参数一定不能在网络中传输
//        hashMap.put("secretKey",secretKey);
        hashMap.put("body", body);
        hashMap.put("nonce", RandomUtil.randomNumbers(4));
        hashMap.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        hashMap.put("sign", SignUtils.genSign(body, secretKey));
        return hashMap;
    }

    public String getUserNameByPost(User user) {
        String json = JSONUtil.toJsonStr(user);
        HttpResponse response = HttpRequest.post(GATEWAY_HOST + "/api/name/user/")
                .body(json)
                .addHeaders(getHeader(json))
                .execute();
        String result2 = response.body();
        System.out.println(result2);
        return result2;
    }
}
