package com.qinjiu.qinjiuinterface;

import com.qinjiu.clientsdk.client.qinApiClient;
import com.qinjiu.clientsdk.model.User;

import javax.annotation.Resource;

/**
 * @author QinJiu
 * @Date 2022/11/26
 */
public class Main {
    @Resource
    static
    qinApiClient qinApiClient;

    public static void main(String[] args) {

        String res1 = qinApiClient.getNameByGet("琴酒");
        String res2 = qinApiClient.getNameByPost("琴酒");
        User user = new User();
        user.setName("qinjiujiu");
        String res3 = qinApiClient.getUserNameByPost(user);
        System.out.println(res1);
        System.out.println(res2);
        System.out.println(res3);
    }
}
