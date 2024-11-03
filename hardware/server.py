import http.server
import socketserver
import json
from sbus import serial_bus
from urllib.parse import urlparse

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests."""
        parsed_path = urlparse(self.path)
        print(f"Received GET request: {self.command} {parsed_path.path}")
        
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(b"Hello, you have reached the server!")

    def do_POST(self):
        self.bus = serial_bus();
        """Handle POST requests containing JSON data."""
        print(f"Received POST request: {self.command} {self.path}")
        
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            json_data = json.loads(post_data)
            integer_value = json_data.get("value")
            if isinstance(integer_value, int):
                print(f"Received integer value: {integer_value}")
            else:
                print("No valid integer value found in the JSON.")
        
            print(f"Recieved Index: {json_data}"
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"status": "success"}')
            
            self.bus.send_data(integer_value)

        except json.JSONDecodeError:
            print("Failed to decode JSON.")
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'{"status": "error", "message": "Invalid JSON"}')
        self.bus.close();

class SimpleHTTPServer:
    def __init__(self, port=8080):
        self.port = port
        self.handler = SimpleHTTPRequestHandler
        self.httpd = None

    def start(self):
        """Start the HTTP server."""
        try:
            print(f"Starting HTTP server on port {self.port}...")
            self.httpd = socketserver.TCPServer(("", self.port), self.handler)
            print("Server started. Listening for requests.")
            self.httpd.serve_forever()
        except Exception as e:
            print(f"Error starting server: {e}")

    def stop(self):
        """Stop the HTTP server."""
        if self.httpd:
            self.httpd.shutdown()
            print("Server stopped.")
# Example usage:
if __name__ == "__main__":
    server = SimpleHTTPServer(port=8080)
    #bus = serial_bus()
    #bus.send_data(4)
    try:
      server.start()
    except KeyboardInterrupt:
      server.stop()
