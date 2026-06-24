@echo off
setlocal
cd /d "%~dp0"
mvn spring-boot:run -Dspring-boot.run.profiles=local
