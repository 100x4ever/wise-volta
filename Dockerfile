FROM python:3.11-slim

WORKDIR /app

# Copy all application files
COPY . .

# Expose production port
EXPOSE 8000

ENV PORT=8000
ENV DATA_DIR=/data

# Create persistent volume directory
RUN mkdir -p /data

CMD ["python", "server.py"]
