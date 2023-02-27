package com.qinjiu.qinjiuinterface.controller;

import com.qinjiu.clientsdk.model.User;
import com.qinjiu.clientsdk.utils.SignUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author QinJiu
 * @Date 2022/11/26
 */
@RestController
@RequestMapping("/name")
public class NameController {
    @GetMapping("/get")
    public  String getNameByGet(String name,HttpServletRequest request){
        System.out.println("<<<<<<<<<<<" + request.getHeader("qinjiu"));
        return "GET你的名字是" + name;
    }
    @PostMapping("/post")
    public  String getNameByPost(@RequestParam String name){
        return "POST你的名字是" + name;
    }



    @PostMapping ("/user")
    public  String getUserNameByPost(@RequestBody User user, HttpServletRequest request){
        String accessKey = request.getHeader("accessKey");
        String body = request.getHeader("body");
        String nonce = request.getHeader("nonce");
        String timestamp = request.getHeader("timestamp");
        String sign = request.getHeader("sign");
        //todo 实际情况应该是去数据库查询，看是否已经分配给用户
        if (!"qinjiu".equals(accessKey) ){
            throw new RuntimeException("无权限");
        }
        // .
        // .
        // .
        // todo 实际情况是从数据库查询secretKey，
        String serverSign = SignUtils.genSign(body, "asdfasdf");

        if (!serverSign.equals(sign)){
            throw new RuntimeException("密钥有问题");
        }
        return "POST你的名字是" + user.getName();
    }
}
