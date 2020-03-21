#!/bin/bash

update_docker=1
refresh_ssl_certificate=0 # TO BE DONE PROPERLY

if [ $update_docker = "1" ]; then
    # install docker
    echo "--------------------------------------------------------"
    echo "Installing docker-ce..."
    sudo apt-get update
    sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
    stable"
    sudo apt-get update
    sudo apt-get install docker-ce -y

    # install docker compose
    echo "--------------------------------------------------------"
    echo "Installing docker-compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
    sudo chmod +x /usr/bin/docker-compose
fi


if [ $refresh_ssl_certificate = "1" ]; then
    sudo docker-compose -f $compose_dir/$compose_file build

    if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
        echo "### Downloading recommended TLS parameters ..."
        mkdir -p "$data_path/conf"
        curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
        curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
        echo
    fi

    echo "### Creating dummy certificate for $domains ..."
    path="/etc/letsencrypt/live/$domains"
    sudo mkdir -p "$data_path/conf/live/$domains"
    sudo docker-compose -f $compose_dir/$compose_file run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:1024 -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" sonah-customer-certbot
    echo


    echo "### Starting nginx ..."
    sudo docker-compose -f $compose_dir/$compose_file up --force-recreate -d sonah-customer-fe
    echo

    echo "### Deleting dummy certificate for $domains ..."
    sudo docker-compose -f $compose_dir/$compose_file run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
    rm -Rf /etc/letsencrypt/renewal/$domains.conf" sonah-customer-certbot
    echo


    echo "### Requesting Let's Encrypt certificate for $domains ..."
    #Join $domains to -d args
    domain_args=""
    for domain in "${domains[@]}"; do
        domain_args="$domain_args -d $domain"
    done

    # Select appropriate email arg
    case "$email" in
        "") email_arg="--register-unsafely-without-email" ;;
        *) email_arg="--email $email" ;;
    esac

    #Enable staging mode if needed
    if [ $staging = "1" ]; then staging_arg="--staging"; fi

    sudo docker-compose -f $compose_dir/$compose_file run --rm --entrypoint "\
  certbot certonly --webroot -n -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" sonah-customer-certbot
    echo
fi
