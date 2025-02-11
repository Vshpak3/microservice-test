# Use the official PHP image with Apache
FROM php:8.3-apache

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set the correct DocumentRoot for Lumen
RUN sed -i 's|/var/www/html|/var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Enable Apache rewrite module
RUN a2enmod rewrite

# Set correct permissions for storage and bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage

# Enable CORS in Apache
RUN echo '<IfModule mod_headers.c>\n\
Header set Access-Control-Allow-Origin "*"\n\
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"\n\
Header set Access-Control-Allow-Headers "Origin, Content-Type, Accept, Authorization"\n\
</IfModule>' > /etc/apache2/conf-available/cors.conf \
&& a2enconf cors

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
