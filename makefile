
dev: venv-cdk
	npm install

venv-cdk:   
	cd cdk && \
	python3 -m venv venv && \
	source venv/bin/activate && \
	pip install -r requirements.txt