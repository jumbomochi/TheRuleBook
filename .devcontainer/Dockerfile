# Use official Flutter image as base
FROM ghcr.io/cirruslabs/flutter:stable

# Install additional dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    clang \
    cmake \
    ninja-build \
    pkg-config \
    libgtk-3-dev \
    liblzma-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up Flutter
ENV PATH="/sdks/flutter/bin:${PATH}"
ENV FLUTTER_ROOT="/sdks/flutter"

# Pre-download Flutter artifacts
RUN flutter precache --no-android --no-ios

# Configure Flutter
RUN flutter config --no-analytics
RUN flutter config --enable-web

# Set working directory
WORKDIR /workspace

# Keep container running
CMD ["sleep", "infinity"]
