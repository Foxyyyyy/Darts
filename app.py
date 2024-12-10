from flask import Flask, render_template

app = Flask(__name__, static_folder="static", template_folder="templates")

# Route for the main page
@app.route("/")
def home():
    return render_template("dartboard.html")

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
