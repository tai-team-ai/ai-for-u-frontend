make-venv:
    @echo "Creating virtual environment..."
    @python3 -m venv venv
    @echo "Installing dependencies..."
    @venv/bin/pip install -r requirements.txt