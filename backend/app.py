from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import json
import os
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    
    if not data or 'phone_number' not in data or 'message' not in data:
        return jsonify({"success": False, "error": "Missing required fields"}), 422
        
    phone_number = str(data['phone_number']).strip()
    message = str(data['message']).strip()
    
    if not message:
        return jsonify({"success": False, "error": "Message cannot be empty"}), 400
        
    # Validate Indian mobile number: exactly 10 digits, starting with 6, 7, 8, or 9
    if not re.match(r'^[6-9]\d{9}$', phone_number):
        return jsonify({"success": False, "error": "Invalid phone number. Must be a 10-digit Indian mobile number."}), 400
        
    # Store record in local JSON file
    db_file = 'messages.json'
    record = {
        "timestamp": datetime.datetime.now().isoformat(),
        "phone_number": phone_number,
        "message": message
    }
    
    try:
        if os.path.exists(db_file):
            with open(db_file, 'r') as f:
                try:
                    records = json.load(f)
                except json.JSONDecodeError:
                    records = []
        else:
            records = []
            
        records.append(record)
        
        with open(db_file, 'w') as f:
            json.dump(records, f, indent=4)
    except Exception as e:
        print(f"Error saving to JSON: {e}")
        
    return jsonify({
        "success": True, 
        "message": "Message sent successfully", 
        "phone_number": phone_number
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
