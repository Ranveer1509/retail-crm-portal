@echo off
setlocal
cd /d "%~dp0"
if "%DB_USERNAME%"=="" set DB_USERNAME=root
if "%DB_PASSWORD%"=="" (
  echo DB_PASSWORD is not set. Set it first:
  echo set DB_PASSWORD=your_mysql_password
  exit /b 1
)
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
