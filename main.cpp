#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <emscripten/emscripten.h>

using namespace std;

struct BusinessRecord {
    string name;
    string category;
    double goal;
};


extern "C" {

    EMSCRIPTEN_KEEPALIVE
    const char* processBusinessSearch(const char* query) {
     
        static string result = "C++ DSA Filtered Results for: ";
        result += query;
        return result.c_str();
    }
}
