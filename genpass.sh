#!/bin/bash

read -s -p "Enter Password: " pass;
echo "";
node genpass.js $pass;
