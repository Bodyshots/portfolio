#!/bin/bash
python3 -m virtualenv -p "$(which python3.10)" venv
source ./venv/bin/activate
pip install -r requirements.txt
cd personal_web || (echo "Error in script - Missing reactapp folder" && exit)
npm i
cd ..