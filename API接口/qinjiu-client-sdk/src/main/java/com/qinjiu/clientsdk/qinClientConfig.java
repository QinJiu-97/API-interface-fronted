package com.qinjiu.clientsdk;

import com.qinjiu.clientsdk.client.qinApiClient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author QinJiu
 * @Date 2022/11/27
 */
@Configuration
@ConfigurationProperties("qinjiu.client")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ComponentScan
public class qinClientConfig  {
    private String accessKey;
    private String secretKey;

    @Bean
    public qinApiClient qinClient() {
        return new qinApiClient(accessKey, secretKey);
    }
}
