FROM php:8.2-cli

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    zip unzip curl git libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório do projeto
WORKDIR /var/www

# Copia os arquivos do projeto
COPY . .

# Instala as dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Garante que o storage e cache têm as permissões corretas
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Copia o entrypoint
COPY entrypoint.sh /entrypoint.sh

# Dá permissão de execução
RUN chmod +x /entrypoint.sh

# Usa o entrypoint como comando de inicialização
ENTRYPOINT ["/entrypoint.sh"]

# Expõe a porta que o php artisan serve usa
EXPOSE 8000