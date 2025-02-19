#!/bin/bash
exec > /var/log/user-data.log 2>&1
set -x

# Update and install required packages
sudo yum update -y || sudo apt update -y
sudo yum install -y nginx git || sudo apt install -y nginx git

# Install Node.js and Yarn
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -  # Amazon Linux / RHEL
sudo yum install -y nodejs || sudo apt install -y nodejs
sudo npm install -g yarn

# Clone the Vue.js repository
cd /home/ec2-user || cd /home/ubuntu
git clone https://github.com/ShayanBits/vue-training-hour.git
cd vue-training-hour

# Install dependencies and build the Vue project
yarn install
yarn build

# Move the built files to Nginx's serving directory
sudo mkdir -p /var/www/vue-training-hour
sudo cp -r dist/* /var/www/vue-training-hour/

# Configure Nginx to serve the Vue app
sudo tee /etc/nginx/conf.d/vue-training-hour.conf > /dev/null <<EOL
server {
    listen 80;
    server_name _;

    location / {
        root /var/www/vue-training-hour;
        index index.html;
        try_files \$uri /index.html;
    }
}
EOL

# Remove default Nginx configuration (optional)
sudo rm -f /etc/nginx/sites-enabled/default

# Restart Nginx to apply changes
sudo systemctl enable nginx
sudo systemctl restart nginx

# Make sure the instance allows HTTP traffic (only if using Amazon Linux)
sudo amazon-linux-extras enable nginx1
sudo systemctl start nginx

echo "Vue.js app deployed successfully!"