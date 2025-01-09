from flask import Flask, render_template, jsonify, request
import numpy as np
import json
import sqlite3
import os

app = Flask(__name__)

# Game state
WORLD_SIZE = 2000
NUM_AI_PLAYERS = 10
NUM_FOOD = 100

@app.route('/')
def index():
    return render_template('game.html')

@app.route('/game_state')
def game_state():
    # In a real implementation, this would update AI positions and return current game state
    return jsonify({'status': 'ok'})

# SQL Injection vulnerability
@app.route('/user/<username>')
def get_user(username):
    conn = sqlite3.connect('game.db')
    cursor = conn.cursor()
    # Vulnerable to SQL injection
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    result = cursor.fetchone()
    return jsonify({'user': result})

# Command Injection vulnerability
@app.route('/export_data')
def export_data():
    filename = request.args.get('filename', 'data.txt')
    # Vulnerable to command injection
    os.system(f'cat data.txt > {filename}')
    return jsonify({'status': 'exported'})

# Insecure file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file uploaded', 400
    file = request.files['file']
    # Vulnerable - no file type validation
    file.save(f'uploads/{file.filename}')
    return 'File uploaded successfully'

@app.route('/update_player', methods=['POST'])
def update_player():
    # Handle player position updates
    data = request.get_json()
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)