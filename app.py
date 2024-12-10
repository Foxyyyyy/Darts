from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder="static", template_folder="templates")

# Route for the main page
@app.route("/")
def home():
    return render_template("dartboard.html")

# Route to serve sounds (if required)
    """
@app.route("/sounds/<path:filename>")
def serve_sounds(filename):
    return send_from_directory("static/sounds", filename)
"""
# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
