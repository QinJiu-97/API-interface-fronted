package com.qinjiu.apigateway;

import com.qinjiu.clientsdk.utils.SignUtils;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
public class CustomGlobalFilter implements GlobalFilter, Ordered {

    private static final List<String> IP_WHITE = Arrays.asList("127.0.0.1");

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {


        //1. 请求日志
        ServerHttpRequest request = exchange.getRequest();
        log.info("请求唯一标识：" + request.getId());
        log.info("请求路径：" + request.getPath().value());
        log.info("请求方法：" + request.getMethod());
        log.info("请求参数：" + request.getQueryParams());
        String hostString = request.getLocalAddress().getHostString();
        log.info("请求来源地址：" + hostString);
        log.info("请求来源地址：" + request.getRemoteAddress());
        ServerHttpResponse response = exchange.getResponse();
        //2. 黑白名单
        if (!IP_WHITE.contains(hostString)) {
            return handleNoAuth(response);

        }
        //3. 用户鉴权
        HttpHeaders headers = request.getHeaders();
        String accessKey = headers.getFirst("accessKey");
        String body = headers.getFirst("body");
        String nonce = headers.getFirst("nonce");
        String timestamp = headers.getFirst("timestamp");
        String sign = headers.getFirst("sign");
        //todo 实际情况应该是去数据库查询，看是否已经分配给用户
        if (!"qinjiu".equals(accessKey)) {
            return handleNoAuth(response);
        }
        // 时间差不超过五分钟
        long currentTime = System.currentTimeMillis() / 1000;
        long FIVE_MINUTES = 60 * 5L;
        if (currentTime - Long.parseLong(timestamp) >= FIVE_MINUTES) {
            return handleNoAuth(response);
        }

        // todo 实际情况是从数据库查询secretKey，
        String serverSign = SignUtils.genSign(body, "asdfasdf");

        if (!serverSign.equals(sign)) {
            return handleNoAuth(response);

        }


        //4. 请求的模拟接口是否存在
        //todo 从数据库中查询模拟接口是否存在，以及请求方法是否一致

        //5. 请求转发，调用模拟接口
        Mono<Void> filter = chain.filter(exchange);
        //6. 响应日志
        return handleResponseLog(exchange, chain);


//        log.info("custom global filter");
//        return chain.filter(exchange);
    }


    /**
     * 处理响应
     *
     * @param exchange
     * @param chain
     * @return
     */
    public Mono<Void> handleResponseLog(ServerWebExchange exchange, GatewayFilterChain chain) {
        try {
            ServerHttpResponse originalResponse = exchange.getResponse();
            //缓存数据的工厂
            DataBufferFactory bufferFactory = originalResponse.bufferFactory();
            //拿到响应码
            HttpStatus statusCode = originalResponse.getStatusCode();
            if (statusCode == HttpStatus.OK) {
                //装饰器，增强能力
                ServerHttpResponseDecorator decoratedResponse = new ServerHttpResponseDecorator(originalResponse) {

                    //等调用完转发的接口后才会调用
                    @Override
                    public Mono<Void> writeWith(Publisher<? extends DataBuffer> body) {
                        log.info("body instanceof Flux: {}", (body instanceof Flux));
                        if (body instanceof Flux) {
                            Flux<? extends DataBuffer> fluxBody = Flux.from(body);
                            //往返回值里面写数据
                            //拼接字符串
                            return super.writeWith(

                                    fluxBody.map(dataBuffer -> {
                                        //7.  todo 调用成功，接口调用次数+1

                                        byte[] content = new byte[dataBuffer.readableByteCount()];
                                        dataBuffer.read(content);
                                        DataBufferUtils.release(dataBuffer);//释放掉内存
                                        // 构建日志
                                        String data = new String(content, StandardCharsets.UTF_8);//data
                                        log.info("响应日志为：" + data);//log.info("<-- {} {}\n", originalResponse.getStatusCode(), data);
                                        return bufferFactory.wrap(content);
                                    }));
                        } else {
                            //8. 调用失败，返回一个规范的错误码
                            log.error("<--- {} 响应code异常", getStatusCode());
                        }
                        return super.writeWith(body);
                    }
                };
                //设置 response 对象为装饰过的
                return chain.filter(exchange.mutate().response(decoratedResponse).build());
            }
            return chain.filter(exchange);//降级处理返回数据
        } catch (Exception e) {
            log.error("gateway log exception.\n" + e);
            return chain.filter(exchange);
        }
    }


    @Override
    public int getOrder() {
        return -1;
    }

    public Mono<Void> handleNoAuth(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.FORBIDDEN);
        return response.setComplete();
    }
}

