# Laravel Store

Laravel Store with Angular JS.

## Requirements

```
Node v8
PHP >= 7.2.5
Composer
Git SCM
SOAP PHP Extension
BCMath PHP Extension
Ctype PHP Extension
Fileinfo PHP extension
JSON PHP Extension
Mbstring PHP Extension
OpenSSL PHP Extension
PDO PHP Extension
Tokenizer PHP Extension
XML PHP Extension
```

## Installation

Clone the repository.

```
git clone https://github.com/jabg97/store-v2.git
```

Go into the project folder and type the following command.

```
npm install
ng serve --port 4200

```

Angular SPA
```
http://localhost:4200/

```

Go into /api folder and type the following command.
```
cd api
composer install
cp .env.local .env
```
if you are using Windows CMD, you must use "copy" command insteand "cp" command
```
copy .env.local .env
```
Configure .env file with your database credentials and then create the database and later type the following command to execute migrations and seeders.

*NOTE: be careful, this will drop all the tables in the database*
```
php artisan migrate:fresh 
```
## Run server

```
php artisan serve
```

Laravel Api
```
http://localhost:8000/

```