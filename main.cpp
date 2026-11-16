#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <sstream>
#include <emscripten/emscripten.h>

using namespace std;

struct BusinessRecord {
    string name;
    string category;
    double goal;
};

static vector<BusinessRecord> businessDatabase = {
    {"TechCorp Solutions", "Technology", 50000.0},
    {"GreenLeaf Café", "Food & Beverage", 15000.0},
    {"InnoSoft Labs", "Technology", 85000.0},
    {"Urban Threads", "Retail", 30000.0},
    {"Alpha Fitness", "Health & Wellness", 45000.0}
};

string toLower(string s) {
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    return s;
}

extern "C" {

    EMSCRIPTEN_KEEPALIVE
    void addBusinessRecord(const char* name, const char* category, double goal) {
        businessDatabase.push_back({name, category, goal});
    }

    EMSCRIPTEN_KEEPALIVE
    const char* processBusinessSearch(const char* query) {
        string q = toLower(query);
        vector<BusinessRecord> filteredResults;

        copy_if(businessDatabase.begin(), businessDatabase.end(), back_inserter(filteredResults), [q](const BusinessRecord& b) {
            if (q.empty()) return true;
            return toLower(b.name).find(q) != string::npos || 
                   toLower(b.category).find(q) != string::npos;
        });

        sort(filteredResults.begin(), filteredResults.end(), [](const BusinessRecord& a, const BusinessRecord& b) {
            return a.goal > b.goal;
        });

        ostringstream jsonStream;
        jsonStream << "[";
        for (size_t i = 0; i < filteredResults.size(); ++i) {
            jsonStream << "{\"name\":\"" << filteredResults[i].name 
                       << "\",\"category\":\"" << filteredResults[i].category 
                       << "\",\"goal\":" << filteredResults[i].goal << "}";
            if (i + 1 < filteredResults.size()) {
                jsonStream << ",";
            }
        }
        jsonStream << "]";

        static string resultJson;
        resultJson = jsonStream.str();
        return resultJson.c_str();
    }
}
