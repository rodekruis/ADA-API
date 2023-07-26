## python-examples

Python scripts to create / edit / delete events through ADA-API

### Usage

Add necessary keys into .env
```
ADA_API_KEY=...
SQL_PASSWORD=...
SQL_USERNAME=...
```

Run scripts in this order
```
python prepare_event_layers.py --data turkey-earthquake --country TUR ...
python create_new_event.py --event "Turkey Earthquake" --data turkey-earthquake ...
```
