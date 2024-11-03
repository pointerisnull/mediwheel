from serial import Serial
import time

class serial_bus:
    def __init__(self):
        self.port = '/dev/ttyACM0'
        self.baudrate = 9600  # Make sure this matches the Arduino baud rate           
        self.ser = Serial(self.port, self.baudrate)

    def send_data(self, i):
        # Allow some time for the connection to establish
        time.sleep(2)
        self.ser.write(f"{i}\n".encode())
        # Read the response from Arduino (optional)
        if self.ser.in_waiting > 0:
          response = self.ser.readline().decode().strip()
          print(f"Received from Arduino: {response}")

    def close(self):
        self.ser.close()  # Close the serial connection
