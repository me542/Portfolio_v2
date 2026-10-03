// ─────────────────────────────────────────────────────────────
// ENGINEERING LAB CONTENT
// These builds are EXAMPLES. Replace them with your real projects
// (or build these first) before you publish the site.
// ─────────────────────────────────────────────────────────────
import { Build, C, ToolGroup } from "./types";

export const labBuilds: Build[] = [
  {
    id: "rover", no: "BUILD 001", name: "Autonomous Rover", status: "OPERATIONAL", statusColor: C.green,
    specs: [["CONTROL", "ESP32"], ["LANGUAGE", "C++"], ["SENSORS", "Ultrasonic"], ["ACTUATORS", "DC ×2"]],
    visual: "rover",
    overview: "A two-wheel rover that measures the distance ahead and steers around obstacles on its own, streaming telemetry to a web dashboard over Wi-Fi.",
    facts: [["CONTROL", "ESP32"], ["LANGUAGE", "C++"], ["BUILD TIME", "6 weeks"]],
    items: [
      { k: "CONTROLLER", v: "ESP32 DevKit V1" }, { k: "SENSOR", v: "HC-SR04 ultrasonic" }, { k: "DRIVER", v: "L298N H-bridge" },
      { k: "MOTORS", v: "2 × DC gear motor" }, { k: "POWER", v: "2S Li-ion, 7.4 V" }, { k: "CHASSIS", v: "Laser-cut acrylic" },
    ],
    layers: [
      { k: "FIRMWARE", v: "C++ / Arduino", d: "Obstacle avoidance loop and motor control" },
      { k: "MESSAGING", v: "MQTT", d: "Publishes distance and state every 25 ms" },
      { k: "BACKEND", v: "Go", d: "Ingests telemetry and stores runs" },
      { k: "DASHBOARD", v: "Next.js", d: "Live distance chart and run history" },
    ],
    arch: ["SENSOR", "ESP32", "AVOIDANCE", "DC MOTORS", "MQTT", "DASHBOARD"],
    archNote: "The sensor feeds the ESP32 at 40 Hz. Avoidance logic decides the motor command locally, so the rover never waits on the network; telemetry goes out in parallel.",
    file: "rover.ino", codeLang: "C++",
    code: [
      "void loop() {",
      "  long cm = sonar.ping_cm();",
      "  // obstacle closer than 25 cm: turn away",
      "  if (cm > 0 && cm < 25) {",
      "    motors.stop();",
      "    motors.turn(RIGHT, 300);",
      "  } else {",
      "    motors.forward(SPEED);",
      "  }",
      '  mqtt.publish("rover/dist", String(cm));',
      "}",
    ],
    dataLabel: "DISTANCE AHEAD", unit: "cm", xStart: "t−24",
    series: [62, 58, 55, 49, 44, 38, 31, 26, 22, 30, 41, 52, 60, 64, 61, 55, 47, 40, 33, 27, 24, 35, 46, 54],
    result: "Drives a full room loop without touching a wall, and logs every run for tuning.",
  },
  {
    id: "greenhouse", no: "BUILD 002", name: "IoT Greenhouse Monitor", status: "TESTING", statusColor: C.amber,
    specs: [["CONTROL", "ESP32"], ["LANGUAGE", "C++ / Go"], ["SENSORS", "DHT22 · Soil"], ["ACTUATORS", "Relay pump"]],
    visual: "greenhouse",
    overview: "A solar-powered monitor that tracks temperature, humidity and soil moisture, and waters the plants automatically when the soil gets dry.",
    facts: [["CONTROL", "ESP32-C3"], ["LANGUAGE", "C++ / Go"], ["BUILD TIME", "4 weeks"]],
    items: [
      { k: "CONTROLLER", v: "ESP32-C3" }, { k: "CLIMATE", v: "DHT22 sensor" }, { k: "SOIL", v: "Capacitive moisture probe" },
      { k: "ACTUATOR", v: "5 V relay + pump" }, { k: "POWER", v: "6 V solar + 18650" }, { k: "ENCLOSURE", v: "IP65 junction box" },
    ],
    layers: [
      { k: "FIRMWARE", v: "C++", d: "Reads sensors, then deep-sleeps for 60 s" },
      { k: "MESSAGING", v: "MQTT", d: "One JSON packet per wake cycle" },
      { k: "BACKEND", v: "Go + PostgreSQL", d: "Stores readings, triggers alerts" },
      { k: "DASHBOARD", v: "Next.js", d: "Charts and watering history" },
    ],
    arch: ["DHT22 + SOIL", "ESP32-C3", "THRESHOLD", "RELAY PUMP", "MQTT", "DASHBOARD"],
    archNote: "Deep sleep between readings keeps the board alive on solar power. Watering is decided on-device so plants still get water if Wi-Fi drops.",
    file: "greenhouse.ino", codeLang: "C++",
    code: [
      "void loop() {",
      "  float t = dht.readTemperature();",
      "  float h = dht.readHumidity();",
      "  int soil = analogRead(SOIL_PIN);",
      "  // dry soil: run pump for 4 s",
      "  if (soil > DRY_LEVEL) relay.pulse(PUMP, 4000);",
      '  mqtt.publish("gh/climate", toJson(t, h, soil));',
      "  esp_deep_sleep(60e6);",
      "}",
    ],
    dataLabel: "SOIL MOISTURE", unit: "%", xStart: "t−24",
    series: [71, 70, 68, 67, 65, 63, 61, 59, 57, 55, 53, 51, 49, 72, 71, 70, 68, 66, 64, 63, 61, 60, 58, 64],
    result: "Kept a small greenhouse watered for two weeks unattended. Still tuning the dry threshold.",
  },
  {
    id: "arm", no: "BUILD 003", name: "Pan-Tilt Tracking Arm", status: "BUILDING", statusColor: C.blue,
    specs: [["CONTROL", "Arduino UNO"], ["LANGUAGE", "C++ / Python"], ["SENSORS", "Camera · PIR"], ["ACTUATORS", "Servo ×2"]],
    visual: "arm",
    overview: "A two-axis servo arm that follows movement: a Python vision script finds the target and streams angles to an Arduino over serial.",
    facts: [["CONTROL", "Arduino UNO"], ["LANGUAGE", "C++ / Python"], ["BUILD TIME", "In progress"]],
    items: [
      { k: "CONTROLLER", v: "Arduino UNO R3" }, { k: "VISION", v: "USB webcam" }, { k: "TRIGGER", v: "PIR motion sensor" },
      { k: "ACTUATORS", v: "2 × MG90S servo" }, { k: "LINK", v: "USB serial, 115200" }, { k: "MOUNT", v: "3D-printed bracket" },
    ],
    layers: [
      { k: "FIRMWARE", v: "C++", d: "Parses angle pairs, smooths servo motion" },
      { k: "VISION", v: "Python + OpenCV", d: "Finds the target centre every frame" },
      { k: "LINK", v: "Serial protocol", d: 'Plain-text "pan,tilt" lines' },
      { k: "TOOLS", v: "TypeScript", d: "Web control panel for manual mode" },
    ],
    arch: ["PIR + CAMERA", "PYTHON", "TRACKING", "SERIAL", "ARDUINO", "SERVOS"],
    archNote: "Heavy vision work runs on the computer; the Arduino only handles timing-critical servo control, which keeps motion smooth.",
    file: "track.py", codeLang: "Python",
    code: [
      "# follow the target, send servo angles",
      "while True:",
      "    x, y = tracker.center()",
      "    pan  = clamp(90 + (x - W/2) * K, 0, 180)",
      "    tilt = clamp(90 - (y - H/2) * K, 0, 180)",
      '    port.write(f"{pan:.0f},{tilt:.0f}\\n".encode())',
    ],
    dataLabel: "PAN ANGLE", unit: "°", xStart: "t−24",
    series: [90, 92, 97, 104, 112, 118, 121, 119, 113, 104, 95, 86, 78, 72, 69, 71, 77, 85, 93, 100, 105, 107, 104, 99],
    result: "Tracks a person walking across a room. Next step: reduce jitter at the edges of the frame.",
  },
];

export const labTools: ToolGroup[] = [
  { title: "MICROCONTROLLERS", items: [
    { id: "uno", name: "Arduino UNO", desc: "The dependable 5 V workhorse for timing-critical control like servos and simple sensors.", spec: "ATmega328P · 16 MHz" },
    { id: "esp32", name: "ESP32", desc: "Dual-core microcontroller with built-in Wi-Fi and Bluetooth; the brain of most of my connected builds.", spec: "Xtensa LX6 · 240 MHz" },
    { id: "rpi", name: "Raspberry Pi", desc: "A full Linux computer for vision, heavier processing and running local services.", spec: "Quad-core ARM · Linux" },
  ]},
  { title: "SENSORS", items: [
    { id: "ultra", name: "Ultrasonic", desc: "Measures distance with sound pulses; used for obstacle detection.", spec: "HC-SR04 · 2–400 cm" },
    { id: "temp", name: "Temperature", desc: "Tracks ambient heat for climate monitoring.", spec: "DHT22 · ±0.5 °C" },
    { id: "hum", name: "Humidity", desc: "Reads relative humidity alongside temperature.", spec: "DHT22 · 0–100% RH" },
    { id: "pir", name: "Motion", desc: "Passive infrared sensor that wakes a system when something moves.", spec: "HC-SR501 · 7 m" },
  ]},
  { title: "ACTUATORS", items: [
    { id: "servo", name: "Servo", desc: "Precise angle control for arms, pan-tilt mounts and steering.", spec: "MG90S · 0–180°" },
    { id: "dc", name: "DC Motor", desc: "Continuous rotation for wheels and pumps, driven through an H-bridge.", spec: "Gear motor · 6 V" },
    { id: "relay", name: "Relay", desc: "Lets a small board switch real loads like pumps and lights safely.", spec: "5 V coil · 10 A" },
    { id: "led", name: "LED", desc: "The simplest status indicator; every build starts with a blink.", spec: "PWM dimmable" },
  ]},
  { title: "COMMUNICATION", items: [
    { id: "wifi", name: "Wi-Fi", desc: "Sends data from devices to backends and dashboards.", spec: "802.11 b/g/n" },
    { id: "bt", name: "Bluetooth", desc: "Short-range control from a phone without a network.", spec: "BLE 4.2" },
    { id: "mqtt", name: "MQTT", desc: "Lightweight publish/subscribe messaging for IoT telemetry.", spec: "QoS 0–2" },
    { id: "serial", name: "Serial", desc: "Direct wired link between a computer and a board.", spec: "UART · 115200 baud" },
  ]},
];

export const labExperiments = [
  { id: "EXP-001", name: "Ultrasonic sensor test", status: "COMPLETE", color: C.green },
  { id: "EXP-002", name: "Servo control", status: "COMPLETE", color: C.green },
  { id: "EXP-003", name: "ESP32 web server", status: "COMPLETE", color: C.green },
  { id: "EXP-004", name: "Bluetooth communication", status: "TESTING", color: C.amber },
  { id: "EXP-005", name: "IoT temperature monitor", status: "BUILDING", color: C.blue },
];

export const labTimeline: [string, string][] = [
  ["IDEA", "Sketch the problem and the system"],
  ["PROTOTYPE", "Breadboard and first firmware"],
  ["FIRST TEST", "Does it move? Does it read?"],
  ["DEBUG", "Serial monitor, multimeter, patience"],
  ["ITERATION", "Refine the hardware and the code"],
  ["FINAL BUILD", "Enclosure, dashboard, documentation"],
];

export const labStack: [string, string[]][] = [
  ["EMBEDDED", ["C / C++", "Arduino", "ESP32"]],
  ["SOFTWARE", ["TypeScript", "React", "Next.js", "Flutter", "Python"]],
  ["BACKEND", ["Go", "Node.js", "REST API", "PostgreSQL"]],
  ["INFRASTRUCTURE", ["Docker", "Linux", "Nginx", "AWS"]],
  ["ENGINEERING", ["Robotics", "IoT", "Automation", "Electronics"]],
];
