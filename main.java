import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class Main {

    private static final List> businesses =
            new ArrayList<>();

    static {
        String[][] rawData = {
            {"Daybreak Foods", "Amara Okafor", "Entrepreneur", "Food & Beverage", "Seed", "Oakland, CA"},
            {"Lumen Care", "Sofia Reyes", "Entrepreneur", "Healthcare", "Seed", "Boston, MA"},
            {"Field Notes Studio", "Theo Martin", "Entrepreneur", "Creative Tools", "Pre-seed", "Brooklyn, NY"},
            {"Apex Horizon Ventures", "Vikram Mehta", "Investor", "Technology", "Series A", "Mumbai, India"},
            {"Nordic Seed Fund", "Elena Rostova", "Investor", "CleanTech", "Pre-seed", "Stockholm, Sweden"},
            {"BioHarvest Analytics", "Liam O'Connor", "Entrepreneur", "AgriTech", "Seed", "Dublin, Ireland"},
            {"FinPulse India", "Priya Sharma", "Entrepreneur", "FinTech", "Seed", "Bengaluru, India"},
            {"Vance Capital Partners", "Marcus Vance", "Investor", "Technology", "Series A", "San Francisco, CA"},
            {"Atelier Vert", "Chloe Dubois", "Entrepreneur", "Sustainable Fashion", "Pre-seed", "Paris, France"},
            {"NeuroCraft AI", "Kenji Sato", "Entrepreneur", "Technology", "Seed", "Tokyo, Japan"},
            {"Horizon Angel Network", "Rachel Greenwald", "Investor", "Consumer Goods", "Pre-seed", "Chicago, IL"},
            {"CloudScale Systems", "David Kim", "Entrepreneur", "Technology", "Series A", "Seattle, WA"},
            {"Oasis Desalination", "Zara Al-Mansoor", "Entrepreneur", "CleanTech", "Seed", "Dubai, UAE"},
            {"Latitude South Ventures", "Lucas Silva", "Investor", "Technology", "Seed", "São Paulo, Brazil"},
            {"SwiftFleet Logistics", "Hannah Abbott", "Entrepreneur", "Supply Chain", "Pre-seed", "Austin, TX"},
            {"MedSecure Ledger", "Tariq Jameel", "Entrepreneur", "Healthcare", "Seed", "Lahore, Pakistan"},
            {"Ironwood Syndicate", "Oliver Thorne", "Investor", "Industrial Tech", "Series A", "London, UK"},
            {"CodeSpark Academy", "Maya Lin", "Entrepreneur", "EdTech", "Pre-seed", "Vancouver, Canada"},
            {"AgroDrone Solutions", "Gabriel Santos", "Entrepreneur", "AgriTech", "Seed", "Belo Horizonte, Brazil"},
            {"BioHealth Angels", "Dr. Aris Thorne", "Investor", "Healthcare", "Seed", "Zurich, Switzerland"},
            {"CyberShield Labs", "Nadia Petrova", "Entrepreneur", "Technology", "Series A", "Berlin, Germany"},
            {"QuantumRoute AI", "Ethan Huntley", "Entrepreneur", "Technology", "Seed", "Boston, MA"},
            {"Gulf Crescent Capital", "Fatimah Al-Farsi", "Investor", "FinTech", "Series A", "Riyadh, Saudi Arabia"},
            {"SolarGrid Dynamics", "Julian Vance", "Entrepreneur", "CleanTech", "Pre-seed", "Denver, CO"},
            {"Lumière Optics", "Clara Dupont", "Entrepreneur", "Hardware", "Seed", "Lyon, France"},
            {"Gujarat Growth Fund", "Sanjay Patel", "Investor", "Technology", "Seed", "Ahmedabad, India"},
            {"ZenWork Spaces", "Beatrice Wong", "Entrepreneur", "Future of Work", "Pre-seed", "Singapore"},
            {"CafeStream Analytics", "Mateo Morales", "Entrepreneur", "Food & Beverage", "Pre-seed", "Bogotá, Colombia"},
            {"Baltic Ventures", "Ingrid Lindqvist", "Investor", "Consumer Tech", "Pre-seed", "Helsinki, Finland"},
            {"AquaPure Technologies", "Ryan O'Neill", "Entrepreneur", "CleanTech", "Seed", "Melbourne, Australia"},
            {"AgriPay Africa", "Aisha Bello", "Entrepreneur", "FinTech", "Seed", "Lagos, Nigeria"},
            {"Tokyo Tech Syndicate", "Hiroshi Tanaka", "Investor", "Technology", "Series A", "Tokyo, Japan"},
            {"EcoPackaging Solutions", "Samantha Brooks", "Entrepreneur", "CleanTech", "Seed", "Toronto, Canada"},
            {"SkillForge India", "Devendra Joshi", "Entrepreneur", "EdTech", "Pre-seed", "Pune, India"},
            {"Paris Angel Fund", "Catherine Moreau", "Investor", "Consumer Goods", "Pre-seed", "Paris, France"},
            {"NextGen Robotics", "Liam Vance", "Entrepreneur", "Robotics", "Series A", "Pittsburgh, PA"},
            {"HealthFirst Telemed", "Zara Patel", "Entrepreneur", "Healthcare", "Seed", "London, UK"},
            {"Sterling & Co. Wealth", "Marcus Sterling", "Investor", "Technology", "Series A", "New York, NY"},
            {"Nordic BioThreads", "Freja Johansen", "Entrepreneur", "Sustainable Fashion", "Pre-seed", "Copenhagen, Denmark"},
            {"Ruta Logistics", "Carlos Mendez", "Entrepreneur", "Supply Chain", "Seed", "Mexico City, Mexico"},
            {"Bengal Angel Network", "Ananya Roy", "Investor", "EdTech", "Pre-seed", "Kolkata, India"},
            {"AeroDeliver Drones", "Benjamin Cole", "Entrepreneur", "Logistics", "Seed", "Seattle, WA"},
            {"Maghreb Solar", "Youssef Ben Ali", "Entrepreneur", "CleanTech", "Seed", "Casablanca, Morocco"},
            {"Pacific Dawn Ventures", "Jessica Taylor", "Investor", "Healthcare", "Series A", "San Diego, CA"},
            {"OmniRetail POS", "Noah Wright", "Entrepreneur", "Retail Tech", "Seed", "Nashville, TN"},
            {"UrbanFarm Systems", "Meera Nair", "Entrepreneur", "AgriTech", "Pre-seed", "Kochi, India"},
            {"Red Square Capital", "Dmitri Ivanov", "Investor", "Technology", "Series A", "Tallinn, Estonia"},
            {"RoboChef Kitchens", "Kaito Yamamoto", "Entrepreneur", "Food & Beverage", "Seed", "Osaka, Japan"},
            {"CleanWave Water", "Chloe Bennett", "Entrepreneur", "CleanTech", "Pre-seed", "Sydney, Australia"},
            {"Heritage Seed Partners", "Arthur Pendelton", "Investor", "Consumer Goods", "Seed", "Edinburgh, UK"}
        };

        for (String[] row : rawData) {
            Map<String, String> entry = new HashMap<>();
            entry.put("businessName", row[0]);
            entry.put("founderName", row[1]);
            entry.put("role", row[2]);
            entry.put("category", row[3]);
            entry.put("stage", row[4]);
            entry.put("location", row[5]);
            businesses.add(entry);
        }
    }

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8080), 0
        );

        server.createContext("/api/status", exchange -> {
            sendResponse(exchange, 200,
                    "{\"status\":\"online\",\"app\":\"GrowFund\"}");
        });

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
                    .append("\",")
                    .append("\"role\":\"")
                    .append(escapeJson(business.getOrDefault("role", "Entrepreneur")))
                    .append("\",")
                    .append("\"category\":\"")
                    .append(escapeJson(business.getOrDefault("category", "General")))
                    .append("\",")
                    .append("\"stage\":\"")
                    .append(escapeJson(business.getOrDefault("stage", "Seed")))
                    .append("\",")
                    .append("\"location\":\"")
                    .append(escapeJson(business.getOrDefault("location", "Global")))
                    .append("\"}");
            }

            json.append("]");

            sendResponse(exchange, 200, json.toString());
        });

        server.setExecutor(null);
        server.start();

        System.out.println("------------------------------");
        System.out.println("    GROWFUND SERVER ONLINE");
        System.out.println("------------------------------");
        System.out.println("Server: http://localhost:8080");
        System.out.println("API: http://localhost:8080/api/status");
    }

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

    private static String escapeJson(String value) {

        if (value == null) return "";

        return value.replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r");
    }
}
