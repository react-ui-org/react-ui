FROM            fedora:latest

RUN             (curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -) \
                && dnf update -y \
                && dnf install -y autoconf automake bzip2 git libpng-devel libtool make nasm nodejs tar \
                && mkdir /workspace \
                && useradd -d /home/docker-container-user -s /bin/bash docker-container-user

COPY            ./init-container.sh /root/init-container.sh
WORKDIR         /workspace
