### Builder Stage
FROM alpine:latest AS builder

# settings
ARG PYTHON_VERSION=3.13
ENV PATH="/root/.local/bin:$PATH" \
    PYTHONPATH="/app" \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_INSTALL_DIR=/python \
    UV_PYTHON_PREFERENCE=only-managed \
    UV_USE_SYSTEM_PYTHON=0 \
    UV_LOG_LEVEL=debug

# packages
RUN apk add --no-cache \
    build-base \
    curl \
    git \
    openssl-dev \
    libffi-dev \
    zlib-dev \
    bzip2-dev \
    ca-certificates && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    uv python install ${PYTHON_VERSION}

# copy
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project
COPY . .
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen


### Development Stage
FROM alpine:latest AS development

# settings
ARG PYTHON_VERSION=3.13
ENV PATH="/root/.local/bin:$PATH" \
    PYTHONPATH="/app" \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_INSTALL_DIR=/python \
    UV_PYTHON_PREFERENCE=only-managed \
    UV_USE_SYSTEM_PYTHON=0 \
    UV_LOG_LEVEL=debug

# packages
RUN apk add --no-cache \
    build-base \
    curl \
    git \
    openssl-dev \
    libffi-dev \
    zlib-dev \
    bzip2-dev \
    ca-certificates && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    uv python install ${PYTHON_VERSION}

# copy
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project
COPY . .
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen

# run dev
CMD ["uv", "run", "src/main.py"]


### Production Stage
FROM alpine:latest AS production

# settings
ENV PATH="/python/bin:/usr/local/bin:/app/.venv/bin:${PATH}" \
    PYTHONPATH="/app" \
    HOME="/app"

# packages
RUN apk add --no-cache \
    libgcc \
    openssl \
    libffi \
    zlib

# copy
WORKDIR /app
COPY --from=builder /python /python
COPY --from=builder /root/.local/bin/uv /usr/local/bin/uv
COPY --from=builder /app /app

# run prod
CMD ["uv", "run", "src/main.py"]
