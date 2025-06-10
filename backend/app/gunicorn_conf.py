import multiprocessing

# Listen on all network interfaces
bind = '0.0.0.0:50150'

# Optimal worker count formula for CPU-bound applications
workers = (2 * multiprocessing.cpu_count()) + 1

# Use Uvicorn workers for ASGI applications (FastAPI/Starlette)
worker_class = 'uvicorn.workers.UvicornWorker'

# Preload app to save memory (good for production)
preload_app = True  # Tradeoff: faster worker startup but no live code reload

# Run in foreground (use True for production with process manager)
daemon = False

# Timeout & Keepalive
timeout = 60  # Worker silent for more than 60 sec = killed and restarted
keepalive = 5  # Seconds to wait for requests on keep-alive connections

# Request Handling
max_requests = (
    1000  # Restart worker after 1000 requests (prevent memory leaks)
)
max_requests_jitter = 100  # Randomize max_requests to avoid all workers restarting simultaneously

# Logging Configuration
accesslog = '-'  # Log to stdout (use file path for production)
errorlog = '-'  # Log errors to stdout
loglevel = 'info'  # Changed from '-' to specific level (debug/info/warning/error/critical)

# Security headers (prevent clickjacking)
forwarded_allow_ips = (
    '*'  # Trust all forwarding headers (adjust for production)
)

# Limit request size (security)
limit_request_line = 4094  # Max HTTP request line size
limit_request_fields = 100  # Max number of headers
limit_request_field_size = 8190  # Max header size
