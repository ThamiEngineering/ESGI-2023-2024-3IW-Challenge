FROM php:8.2-apache

RUN apt-get update

# Modifier l'UID de l'utilisateur www-data (si nécessaire)
RUN usermod -u 1000 www-data

# Activer le module de réécriture Apache
RUN a2enmod rewrite

# Exposer le port 80
EXPOSE 80
