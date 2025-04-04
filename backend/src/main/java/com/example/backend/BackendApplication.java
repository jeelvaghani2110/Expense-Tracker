package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer configurer() {
		return new WebMvcConfigurer() {

			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// registry.addMapping("/**")
				// .allowedOrigins("http://localhost:3000")
				// .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				// .allowedHeaders("*")
				// .allowCredentials(true);
				registry.addMapping("/**") // Allow all endpoints
						.allowedOrigins("*") // Allow all origins
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all methods
						.allowedHeaders("*");
			}
		};
	}

}
