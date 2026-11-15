
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class Main {

    private static final List<Map<String, String>> businesses =
            new ArrayList<>();

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8080), 0
        );

        // Home API
        server.createContext("/api/status", exchange -> {
            sendResponse(exchange, 200,
                    "{\"status\":\"online\",\"app\":\"GrowFund\"}");
        });

        // Business registration API
        server.createContext("/api/business", exchange -> {

            if (!exchange.getRequestMethod().equals("POST")) {
                sendResponse(exchange, 405,
                        "{\"error\":\"POST method required\"}");
                return;
            }

            try {
                String body = new String(
                        exchange.getRequestBody().readAllBytes(),
                        StandardCharsets.UTF_8
                );

                Map<String, String> data = parseForm(body);

                String name = data.get("businessName");
                String founder = data.get("founderName");

                if (name == null || name.isBlank()
                        || founder == null || founder.isBlank()) {

                    sendResponse(exchange, 400,
                            "{\"error\":\"Business name and founder are required\"}");
                    return;
                }

                businesses.add(data);

                sendResponse(exchange, 201,
                        "{\"message\":\"Business registered successfully\"}");

                System.out.println("New Business: " + name);
                System.out.println("Founder: " + founder);

            } catch (Exception e) {
                sendResponse(exchange, 400,
                        "{\"error\":\"Invalid request\"}");
            }
        });

        // View registered businesses
        server.createContext("/api/businesses", exchange -> {

            StringBuilder json = new StringBuilder("[");
            int count = 0;

            for (Map<String, String> business : businesses) {

                if (count++ > 0) json.append(",");

                json.append("{")
                    .append("\"name\":\"")
                    .append(escapeJson(business.get("businessName")))
                    .append("\",")
                    .append("\"founder\":\"")
                    .append(escapeJson(business.get("founderName")))
                    .append("\"}");
            }

            json.append("]");

            sendResponse(exchange, 200, json.toString());
        });

        server.setExecutor(null);
        server.start();

        System.out.println("------------------------------");
        System.out.println("   GRO​​WFUND SERVER ONLINE");
        System.out.println("------------------------------");
        System.out.println("Server: http://localhost:8080");
        System.out.println("API: http://localhost:8080/api/status");
    }

    // Parse HTML form data
    private static Map<String, String> parseForm(String body)
            throws UnsupportedEncodingException {

        Map<String, String> result = new HashMap<>();

        for (String pair : body.split("&")) {

            String[] parts = pair.split("=", 2);

            String key = URLDecoder.decode(
                    parts[0], StandardCharsets.UTF_8
            );

            String value = parts.length > 1
                    ? URLDecoder.decode(parts[1], StandardCharsets.UTF_8)
                    : "";

            result.put(key, value);
        }

        return result;
    }

    // Send HTTP response
    private static void sendResponse(
            HttpExchange exchange,
            int status,
            String response
    ) throws IOException {

        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);

        exchange.getResponseHeaders().set(
                "Content-Type", "application/json; charset=UTF-8"
        );

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Origin", "http://localhost:5500"
        );

        exchange.sendResponseHeaders(status, bytes.length);

        try (OutputStream output = exchange.getResponseBody()) {
            output.write(bytes);
        }
    }

    // Escape JSON strings
    private static String escapeJson(String value) {

        if (value == null) return "";

        return value.replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r");
    }
}
