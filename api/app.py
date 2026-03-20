from flask import Flask, jsonify
import time

app = Flask(__name__)

locations = [
    {"id": 1,  "name": "Dr. G.W. Williams Secondary School", "lat": 44.0013, "lng": -79.4561},
    {"id": 2,  "name": "Newmarket High School",               "lat": 44.0534, "lng": -79.4620},
    {"id": 3,  "name": "Huron Heights Secondary School",      "lat": 44.0445, "lng": -79.4962},
    {"id": 4,  "name": "Unionville High School",              "lat": 43.8617, "lng": -79.3207},
    {"id": 5,  "name": "Bill Crothers Secondary School",      "lat": 43.8620, "lng": -79.3167},
    {"id": 6,  "name": "Markham District High School",        "lat": 43.8764, "lng": -79.2625},
    {"id": 7,  "name": "Richmond Hill High School",           "lat": 43.8735, "lng": -79.4390},
    {"id": 8,  "name": "Thornhill Secondary School",          "lat": 43.8186, "lng": -79.4259},
    {"id": 9,  "name": "Maple High School",                   "lat": 43.8492, "lng": -79.5156},
    {"id": 10, "name": "Stouffville District Secondary School","lat": 43.9711, "lng": -79.2498},
    {"id": 11, "name": "King City Secondary School",          "lat": 43.9278, "lng": -79.5284},
    {"id": 12, "name": "Vaughan Secondary School",            "lat": 43.8422, "lng": -79.5263},
]

@app.route('/api/locations')
def get_locations():
    return jsonify(locations)

@app.route('/api/time')
def get_time():
    return jsonify({"time": time.time()})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
