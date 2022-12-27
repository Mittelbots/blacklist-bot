FROM python:latest
WORKDIR /app
COPY . .
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r requirements.txt
CMD [ "python", "main.py"]