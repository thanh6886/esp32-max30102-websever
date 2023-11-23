
#include <Wire.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <Arduino_JSON.h>

// const char* ssid = "béthu";
// const char* password = "88888888";


const char* ssid = "TP-LINK_E481B4";
const char* password = "94902518";

const char* mqtt_server = "cfdc549178f54de381adaf8a1f088efc.s2.eu.hivemq.cloud";
const char* mqtt_username = "mikehung611";
const char* mqtt_password = "Nguyenvanhung2002";
const int mqtt_port = 8883;

int heartbeat = 0;
int body_temperature = 0;
int Sp02 = 0;
int Environment_temp = 0;
int  heartbeat_2, body_temperature_2, Sp02_2, Environment_temp_2; 
WiFiClientSecure esp_client;
PubSubClient client(esp_client);
JSONVar node_1 ,node_2;
static const char* root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----
)EOF";




void mqtt(){
    while(!client.connected()){
    Serial.println("Attempting MQTT connection...");
    String clientId = "ESP32Client";
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("Connected.");
    } else {
      Serial.println("Try again.");
    }
    }
}

void sensor(){
      heartbeat = random(70, 80);
      Sp02 = random(95, 97);
      Environment_temp = random(20,29);
      body_temperature = random(36, 37);
      delay(1000);
      // Serial.print("node 1");
      // Serial.print("nhịp tim: ");
      // Serial.print(heartbeat);
      // Serial.print(" BMP ");
      // Serial.print("nồng độ SPO2: ");
      // Serial.print(Sp02);
      // Serial.print(" % ");
      // Serial.print("nhiệt độ cơ thể: ");
      // Serial.print( body_temperature);
      // Serial.print(" *C ");
      // Serial.print("nhiệt độ môi trường: ");
      // Serial.print( Environment_temp);
      // Serial.print(" *C ");
      // Serial.println();
      // delay(100);
}
void sensor_2(){
      heartbeat_2 = random(70, 80);
      Sp02_2 = random(95, 97);
      Environment_temp_2 = random(20,29);
      body_temperature_2 = random(36, 37);
      delay(500);
      Serial.print("node 2");
      Serial.print("nhịp tim: ");
      Serial.print(heartbeat_2);
      Serial.print(" BMP ");
      Serial.print("nồng độ SPO2: ");
      Serial.print(Sp02_2);
      Serial.print(" % ");
      Serial.print("nhiệt độ cơ thể: ");
      Serial.print( body_temperature_2);
      Serial.print(" *C ");
      Serial.print("nhiệt độ môi trường: ");
      Serial.print( Environment_temp_2);
      Serial.print(" *C ");
      Serial.println();
      delay(200);
}

void sendMQTT(){
      node_1["heartbeat"] = heartbeat;
      node_1["Spo2"] = Sp02;
      node_1["body_temperature"] = body_temperature;
      node_1["Environment_temp"] = Environment_temp;
      String jsonString_1 = JSON.stringify(node_1);
      Serial.println(jsonString_1);
     client.publish("node_1", jsonString_1.c_str());


    //   node_2["heartbeat"] = heartbeat_2;
    //   node_2["Spo2"] = Sp02_2;
    //   node_2["body_temperature"] = body_temperature_2;
    //   node_2["Environment_temp"] = Environment_temp_2;
    //   String jsonString_2 = JSON.stringify(node_2);
    //  client.publish("esp32/node_2", jsonString_2.c_str());
}




void setup(){
  Serial.begin(115200);
  Serial.println("Initializing...");
  WiFi.begin(ssid, password);


  while (WiFi.status()!= WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Kết nối với mạng Wi-Fi...");
  }
  Serial.println("Đã kết nối với mạng Wi-Fi.");

  esp_client.setCACert(root_ca);
  client.setServer(mqtt_server, mqtt_port);
  mqtt();

 
}
void loop(){
    client.loop();
    sensor();
    // sensor_2();
    sendMQTT();
    delay(2000);
} 